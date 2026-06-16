import type { GlobalConfig } from 'payload'

import { revalidateHomeGlobal } from '@/hooks/revalidate'

export const Contact: GlobalConfig = {
  slug: 'contact',
  admin: { group: 'Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeGlobal] },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Get in touch' },
    { name: 'heading', type: 'text', defaultValue: "Let's make something good." },
    { name: 'blurb', type: 'textarea' },
    {
      name: 'projectTypeOptions',
      type: 'array',
      labels: { singular: 'Option', plural: 'Options' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'text', defaultValue: 'hello@jaxstudio.ink', admin: { width: '50%' } },
        { name: 'responseTime', type: 'text', defaultValue: 'I reply within 24 hours.', admin: { width: '50%' } },
      ],
    },
    {
      name: 'successMessage',
      type: 'textarea',
      defaultValue: "Thanks — I'll get back to you within 24 hours. A copy is on its way to your inbox.",
    },
  ],
}
