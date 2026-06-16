import type { GlobalConfig } from 'payload'

import { revalidateHomeGlobal } from '@/hooks/revalidate'

export const Hero: GlobalConfig = {
  slug: 'hero',
  admin: { group: 'Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeGlobal] },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Graphic & Web Designer · Kentucky' },
    {
      name: 'headingParts',
      type: 'array',
      labels: { singular: 'Part', plural: 'Parts' },
      admin: { description: 'Heading split into parts; mark a part "emphasized" to paint it with the brand gradient.' },
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'emphasized', type: 'checkbox', defaultValue: false },
      ],
    },
    { name: 'tagline', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'primaryCtaLabel', type: 'text', admin: { width: '50%' } },
        { name: 'primaryCtaLink', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'secondaryCtaLabel', type: 'text', admin: { width: '50%' } },
        { name: 'secondaryCtaLink', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "9+"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Years designing"' } },
      ],
    },
  ],
}
