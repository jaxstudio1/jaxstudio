import type { GlobalConfig } from 'payload'

import { revalidateHomeGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Design' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeGlobal] },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'Jax Studio' },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Design & code by Wade “Jax” Jackson',
      admin: { description: 'Used for SEO meta description fallback.' },
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      labels: { singular: 'Social Link', plural: 'Social Links' },
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
          admin: { description: 'Lucide icon name, e.g. "instagram", "linkedin", "dribbble", "github".' },
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'footerNote', type: 'text', defaultValue: '© 2026 Jax Studio. All rights reserved.' },
  ],
}
