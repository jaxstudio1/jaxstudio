import { list } from '@vercel/blob'
import { NextResponse, type NextRequest } from 'next/server'

// TEMPORARY diagnostic — confirms whether BLOB_READ_WRITE_TOKEN is wired into
// this deployment and whether the token can actually reach the Blob store.
// Returns only booleans + env-var NAMES (never values). Remove after use.
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('k') !== 'jaxblob') {
    return new NextResponse('Not found', { status: 404 })
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  const blobEnvKeys = Object.keys(process.env).filter((k) => k.toUpperCase().includes('BLOB'))

  if (!token) {
    return NextResponse.json({ hasBlobToken: false, blobEnvKeys })
  }

  try {
    const res = await list({ limit: 1, token })
    return NextResponse.json({ hasBlobToken: true, blobEnvKeys, blobWorks: true, blobCount: res.blobs.length })
  } catch (err) {
    return NextResponse.json({
      hasBlobToken: true,
      blobEnvKeys,
      blobWorks: false,
      error: err instanceof Error ? err.message : String(err),
    })
  }
}
