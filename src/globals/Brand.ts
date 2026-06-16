import type { GlobalConfig } from 'payload'

import { revalidateHomeGlobal } from '@/hooks/revalidate'

/** Display faces wired up in (frontend)/layout.tsx via next/font/google. */
export const DISPLAY_FONTS = [
  { label: 'Boldonse — bold brutalist (default)', value: 'boldonse' },
  { label: 'Bricolage Grotesque — modern', value: 'bricolage' },
  { label: 'Space Grotesk — geometric', value: 'space-grotesk' },
  { label: 'Anton — narrow grotesque', value: 'anton' },
] as const

export const BODY_FONTS = [
  { label: 'Archivo (default)', value: 'archivo' },
  { label: 'Space Grotesk', value: 'space-grotesk' },
] as const

export const Brand: GlobalConfig = {
  slug: 'brand',
  label: 'Brand & Design',
  admin: { group: 'Design' },
  access: { read: () => true },
  hooks: { afterChange: [revalidateHomeGlobal] },
  fields: [
    {
      type: 'collapsible',
      label: 'Colors',
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'primary', type: 'text', required: true, defaultValue: '#ff5722', admin: { width: '50%', description: 'Accent / primary (hex).' } },
            { name: 'secondary', type: 'text', required: true, defaultValue: '#e31fc8', admin: { width: '50%', description: 'Secondary accent for gradients (hex).' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'background', type: 'text', required: true, defaultValue: '#0a0a0a', admin: { width: '50%', description: 'Page background (hex).' } },
            { name: 'foreground', type: 'text', required: true, defaultValue: '#ededed', admin: { width: '50%', description: 'Body text (hex).' } },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Typography',
      fields: [
        {
          name: 'displayFont',
          type: 'select',
          defaultValue: 'boldonse',
          options: [...DISPLAY_FONTS],
          admin: { description: 'Headlines & display type.' },
        },
        {
          name: 'bodyFont',
          type: 'select',
          defaultValue: 'archivo',
          options: [...BODY_FONTS],
          admin: { description: 'UI & body text.' },
        },
      ],
    },
    {
      name: 'animationIntensity',
      type: 'select',
      defaultValue: 'balanced',
      options: [
        { label: 'Subtle', value: 'subtle' },
        { label: 'Balanced', value: 'balanced' },
        { label: 'Expressive', value: 'expressive' },
      ],
      admin: { description: 'Global motion intensity for scroll reveals & transitions.' },
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
