import type { CollectionAfterChangeHook } from 'payload'
import sharp from 'sharp'
import { del, put } from '@vercel/blob'

/**
 * Post-upload image optimization for the Media collection.
 *
 * We use `clientUploads: true` so large files upload straight from the browser
 * to Vercel Blob, bypassing Vercel's 4.5MB serverless body limit. The trade-off
 * is that Sharp (Node-only) never sees the file, so Payload's built-in
 * `formatOptions`/`resizeOptions` can't run. This hook closes that gap: after a
 * file lands in Blob it pulls the bytes back server-side (egress has no size
 * cap), transcodes to WebP + caps the longest edge, re-uploads, rewrites the
 * doc, and deletes the original to reclaim the space.
 *
 * Tunables: bump WEBP_QUALITY toward 90+ if flat-color graphics show artifacts,
 * or raise MAX_EDGE for full-bleed 4K imagery.
 */
const MAX_EDGE = 2560
const WEBP_QUALITY = 82

// Raster formats Sharp can safely transcode. SVG (vector) and GIF (animation)
// are deliberately left untouched, as is anything already WebP.
const CONVERTIBLE = new Set([
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/avif',
  'image/heic',
  'image/heif',
])

export const convertMediaToWebp: CollectionAfterChangeHook = async ({ doc, req }) => {
  // Re-entrancy guard — the payload.update() below re-fires afterChange.
  if (req.context?.skipWebpConversion) return doc

  const token = process.env.BLOB_READ_WRITE_TOKEN
  // No token → local dev (files on disk, clientUploads off). Nothing to do.
  if (!token) return doc

  const { filename, mimeType, url } = doc as {
    filename?: string
    mimeType?: string
    url?: string
  }
  if (!filename || !mimeType || !url) return doc
  if (!CONVERTIBLE.has(mimeType)) return doc

  try {
    // 1. Pull the original back from Blob (server→Blob egress is uncapped).
    const res = await fetch(url)
    if (!res.ok) throw new Error(`could not fetch original (HTTP ${res.status})`)
    const input = Buffer.from(await res.arrayBuffer())

    // 2. Auto-rotate from EXIF, cap the longest edge (never enlarge), → WebP.
    const { data, info } = await sharp(input)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer({ resolveWithObject: true })

    const webpFilename = `${filename.replace(/\.[^./\\]+$/, '')}.webp`

    // 3. Upload the WebP under the new key. Matches the plugin's scheme
    //    (public, no random suffix) so generateURL resolves it correctly.
    const { url: newUrl } = await put(webpFilename, data, {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'image/webp',
      token,
    })

    // 4. Persist new metadata. Mirror the cloud-storage plugin's re-entrancy
    //    pattern: flag req.context and clear req.file so no hook re-uploads.
    if (!req.context) req.context = {}
    req.context.skipWebpConversion = true
    req.file = undefined
    try {
      await req.payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          filename: webpFilename,
          mimeType: 'image/webp',
          filesize: info.size,
          width: info.width,
          height: info.height,
        },
        depth: 0,
        req,
        overrideAccess: true,
      })
    } finally {
      delete req.context.skipWebpConversion
    }

    // 5. Drop the now-orphaned original to actually reclaim space.
    if (webpFilename !== filename) {
      await del(url, { token })
    }

    req.payload.logger.info(
      `Optimized media ${doc.id}: ${filename} (${mimeType}) → ${webpFilename} ` +
        `(${info.width}×${info.height}, ${(info.size / 1024).toFixed(0)}KB)`,
    )

    return { ...doc, filename: webpFilename, mimeType: 'image/webp', filesize: info.size, width: info.width, height: info.height, url: newUrl }
  } catch (err) {
    // Never break the upload over an optimization failure — keep the original.
    req.payload.logger.error({ err, msg: `WebP conversion failed for media ${doc.id}; original kept.` })
    return doc
  }
}
