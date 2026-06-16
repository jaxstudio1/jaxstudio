import type { GlobalConfig } from 'payload'

import { revalidateHomeGlobal } from '@/hooks/revalidate'

export const About: GlobalConfig = {
  slug: 'about',
  admin: { group: 'Content' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeGlobal] },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'About me' },
    {
      type: 'row',
      fields: [
        { name: 'headingPre', type: 'text', admin: { width: '50%', description: 'Plain part of the heading.' } },
        { name: 'headingEmphasis', type: 'text', admin: { width: '50%', description: 'Gradient-painted part.' } },
      ],
    },
    {
      name: 'paragraphs',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'personName', type: 'text', defaultValue: 'Wade Jackson', admin: { width: '50%' } },
        { name: 'role', type: 'text', defaultValue: 'Graphic & Web Designer', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'text', defaultValue: 'Kentucky, USA', admin: { width: '50%' } },
        { name: 'yearsExperience', type: 'number', defaultValue: 9, admin: { width: '50%' } },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      labels: { singular: 'Skill', plural: 'Skills' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'pct', type: 'number', required: true, min: 0, max: 100, admin: { description: '0–100' } },
      ],
    },
    {
      name: 'tools',
      type: 'array',
      labels: { singular: 'Tool', plural: 'Tools' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}
