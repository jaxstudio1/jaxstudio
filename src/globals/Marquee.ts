import type { GlobalConfig } from 'payload'

import { revalidateHomeGlobal } from '@/hooks/revalidate'

export const Marquee: GlobalConfig = {
  slug: 'marquee',
  admin: { group: 'Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeGlobal] },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
