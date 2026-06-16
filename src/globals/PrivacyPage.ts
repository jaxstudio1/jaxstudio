import type { GlobalConfig } from 'payload'

import { revalidatePrivacyGlobal } from '@/hooks/revalidate'

export const PrivacyPage: GlobalConfig = {
  slug: 'privacy-page',
  label: 'Privacy Policy',
  admin: { group: 'Legal' },
  access: { read: () => true },
  hooks: { afterChange: [revalidatePrivacyGlobal] },
  fields: [
    {
      name: 'lastUpdated',
      type: 'text',
      label: 'Last Updated',
      required: true,
      defaultValue: 'June 16, 2026',
      admin: { description: 'Display date shown under the page title.' },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: { description: 'Each section renders as a heading + body block. Drag to reorder.' },
      fields: [
        { name: 'heading', type: 'text', required: true, label: 'Section Heading' },
        { name: 'body', type: 'richText', required: true, label: 'Body' },
      ],
    },
  ],
}
