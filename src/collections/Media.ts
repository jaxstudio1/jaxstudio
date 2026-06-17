import type { CollectionConfig } from 'payload'

import { convertMediaToWebp } from '../hooks/convertMediaToWebp'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Admin' },
  access: { read: () => true },
  upload: true,
  hooks: {
    // Transcode uploads to WebP + cap dimensions after they land in Blob.
    // (Server-side processing can't run during the upload itself because
    // clientUploads sends the file straight to Blob — see the hook's docs.)
    afterChange: [convertMediaToWebp],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
