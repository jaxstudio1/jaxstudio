import type { CollectionConfig } from 'payload'

import { revalidateHomeAfterChange, revalidateHomeAfterDelete } from '@/hooks/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'icon'],
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
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: { description: 'Display order (ascending).' },
    },
    {
      name: 'number',
      type: 'text',
      admin: { description: 'Display number, e.g. "01".' },
    },
    {
      name: 'icon',
      type: 'text',
      admin: { description: 'Lucide icon name, e.g. "monitor", "pen-tool", "shirt", "printer".' },
    },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
}
