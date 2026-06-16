import type { CollectionConfig } from 'payload'

import { revalidateHomeAfterChange, revalidateHomeAfterDelete } from '@/hooks/revalidate'
import { PROJECT_CATEGORIES } from '@/lib/categories'

/** kebab-case a title for use as a URL slug. */
const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'featured', 'order'],
    group: 'Content',
  },
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateHomeAfterChange],
    afterDelete: [revalidateHomeAfterDelete],
  },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', required: true, admin: { width: '60%' } },
        {
          name: 'slug',
          type: 'text',
          unique: true,
          index: true,
          admin: {
            width: '40%',
            description: 'URL path under /work. Auto-filled from the title if left blank.',
          },
          hooks: {
            beforeValidate: [
              ({ value, data }) =>
                value || (data?.title ? formatSlug(String(data.title)) : value),
            ],
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          defaultValue: 'web-app',
          options: [...PROJECT_CATEGORIES],
          admin: { width: '40%' },
        },
        { name: 'year', type: 'number', admin: { width: '30%', description: 'e.g. 2026' } },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: { width: '30%', description: 'Sort (ascending).' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'client', type: 'text', admin: { width: '50%' } },
        { name: 'role', type: 'text', admin: { width: '50%', description: 'e.g. "Design + Build".' } },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One-line teaser shown on the work grid card.' },
    },
    { name: 'description', type: 'richText', admin: { description: 'Full case-study body.' } },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Image', plural: 'Gallery' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: { description: 'Live link (for web/app projects), optional.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show in the homepage "Featured Work" section.' },
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
