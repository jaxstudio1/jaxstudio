import type { CollectionConfig } from 'payload'

import { sendLeadEmails } from '@/hooks/sendLeadEmails'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'projectType', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    // Created by the public contact form via the Local API (Server Action).
    create: () => true,
    // Only authenticated admins can read/delete submissions.
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    // Fires SendGrid owner-notify + auto-reply on new submissions. No-ops when
    // SENDGRID_API_KEY is unset, so seed/CLI runs are safe.
    afterChange: [sendLeadEmails],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'lastName', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'email', type: 'email', required: true },
    { name: 'projectType', type: 'text', admin: { description: 'Selected on the contact form.' } },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}
