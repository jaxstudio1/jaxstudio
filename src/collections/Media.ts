import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Admin' },
  access: { read: () => true },
  upload: {
    mimeTypes: ['image/*'],
    // Transcode raster uploads to WebP + cap the longest edge at 2560px.
    // Runs server-side via sharp during the upload itself (clientUploads is
    // off — see payload.config.ts). Bump quality toward 90 if flat-color
    // graphics show artifacts; raise the cap for full-bleed 4K imagery.
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true },
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
