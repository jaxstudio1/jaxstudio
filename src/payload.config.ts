import path from 'path'
import { fileURLToPath } from 'url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Leads } from './collections/Leads'
import { SiteSettings } from './globals/SiteSettings'
import { Brand } from './globals/Brand'
import { Hero } from './globals/Hero'
import { Marquee } from './globals/Marquee'
import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { TermsPage } from './globals/TermsPage'
import { PrivacyPage } from './globals/PrivacyPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Jax Studio',
    },
  },
  collections: [Users, Media, Services, Projects, Leads],
  globals: [SiteSettings, Brand, Hero, Marquee, About, Contact, TermsPage, PrivacyPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      // Active only when the token exists (production). Locally falls back to disk.
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // NOTE: clientUploads is deliberately OFF. With it on, the browser uploads
      // straight to Blob, then Payload's create immediately re-fetches the
      // file's public URL to read its dimensions — but that URL hasn't
      // propagated yet (404), so image-size gets an empty buffer and every
      // upload fails with a 400. Server-side uploads keep the buffer in memory
      // (no race) and let Payload's native formatOptions/resizeOptions run.
      // Trade-off: Vercel caps the request body at 4.5MB — fine for web images.
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
