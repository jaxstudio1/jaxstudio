import { getPayload } from 'payload'

import config from './payload.config'
import type { ProjectCategory } from './lib/categories'

type SeedProject = {
  title: string
  slug: string
  category: ProjectCategory
  year: number
  order: number
  featured: boolean
  client: string
  role: string
  summary: string
  tags: { label: string }[]
}

const services = [
  { order: 1, number: '01', icon: 'pen-tool', title: 'Brand Identity', description: 'Logos, visual systems, and brand guidelines that give your business a memorable, professional identity across every touchpoint.' },
  { order: 2, number: '02', icon: 'monitor', title: 'Web & App Design', description: 'Full-stack websites and web apps — designed and built. Clean code, fast performance, and motion that earns attention.' },
  { order: 3, number: '03', icon: 'image', title: 'Flyers & Posters', description: 'Eye-catching event flyers, promo posters, and social graphics that stop the scroll and get people through the door.' },
  { order: 4, number: '04', icon: 'shirt', title: 'Apparel & Merch', description: 'T-shirt graphics, hats, and merch designs — print-ready artwork built to look sharp on fabric and in feeds.' },
  { order: 5, number: '05', icon: 'file-text', title: 'Brochures & Print', description: 'Tri-folds, menus, booklets, and editorial layouts with typography that reads beautifully on paper.' },
  { order: 6, number: '06', icon: 'code', title: 'Full-Stack Development', description: 'From idea to deployed product — Next.js apps, CMS integrations, dashboards, and the infrastructure behind them.' },
]

const projects: SeedProject[] = [
  {
    title: 'Aurora Coffee — Brand & Site', slug: 'aurora-coffee', category: 'web-app', year: 2026, order: 1, featured: true,
    client: 'Aurora Coffee Co.', role: 'Design + Build',
    summary: 'A full brand identity and headless-CMS website for a Lexington specialty roaster.',
    tags: [{ label: 'Next.js' }, { label: 'Branding' }, { label: 'CMS' }],
  },
  {
    title: 'Nightshade Festival Poster Series', slug: 'nightshade-festival', category: 'print', year: 2025, order: 2, featured: true,
    client: 'Nightshade Fest', role: 'Art Direction + Design',
    summary: 'A bold, type-driven poster and flyer series for a three-night music festival.',
    tags: [{ label: 'Poster' }, { label: 'Typography' }],
  },
  {
    title: 'Iron & Oak Apparel', slug: 'iron-and-oak-apparel', category: 'apparel', year: 2025, order: 3, featured: true,
    client: 'Iron & Oak', role: 'Graphic Design',
    summary: 'A capsule of screen-print-ready t-shirt graphics for a Kentucky barbershop brand.',
    tags: [{ label: 'Apparel' }, { label: 'Illustration' }],
  },
  {
    title: 'Bluegrass Realty Identity', slug: 'bluegrass-realty', category: 'branding', year: 2024, order: 4, featured: false,
    client: 'Bluegrass Realty', role: 'Brand Identity',
    summary: 'Logo system, color palette, and stationery for a boutique real-estate firm.',
    tags: [{ label: 'Logo' }, { label: 'Identity' }],
  },
  {
    title: 'Harvest Table Tri-Fold Menu', slug: 'harvest-table-menu', category: 'brochure', year: 2024, order: 5, featured: false,
    client: 'Harvest Table', role: 'Layout + Print',
    summary: 'An editorial tri-fold menu and brochure system for a farm-to-table restaurant.',
    tags: [{ label: 'Print' }, { label: 'Editorial' }],
  },
  {
    title: 'Ledger — Budgeting App UI', slug: 'ledger-budgeting-app', category: 'web-app', year: 2026, order: 6, featured: true,
    client: 'Personal', role: 'Design + Full-Stack',
    summary: 'A motion-rich budgeting dashboard with a custom design system and live charts.',
    tags: [{ label: 'Product Design' }, { label: 'React' }, { label: 'UI/UX' }],
  },
]

const run = async () => {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding Jax Studio content...')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Jax Studio',
      tagline: 'Graphic & web design by Wade “Jax” Jackson — Kentucky.',
      navLinks: [
        { label: 'Work', href: '/work' },
        { label: 'Services', href: '/#services' },
        { label: 'About', href: '/#about' },
        { label: 'Contact', href: '/#contact' },
      ],
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/jaxstudio.ink' },
        { platform: 'dribbble', url: 'https://dribbble.com/jaxstudio' },
        { platform: 'email', url: 'hello@jaxstudio.ink' },
      ],
      footerNote: '© 2026 Jax Studio. Designed & built in Kentucky.',
    },
  })

  await payload.updateGlobal({
    slug: 'brand',
    data: {
      primary: '#ff5722',
      secondary: '#e31fc8',
      background: '#0a0a0a',
      foreground: '#ededed',
      displayFont: 'boldonse',
      bodyFont: 'archivo',
      animationIntensity: 'balanced',
    },
  })

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      eyebrow: 'Graphic & Web Designer · Kentucky',
      headingParts: [
        { text: 'I design ', emphasized: false },
        { text: '& build', emphasized: true },
        { text: ' brands that move.', emphasized: false },
      ],
      tagline:
        'I\'m Wade — “Jax.” I help businesses look unforgettable across every surface: full-stack apps and websites, brand identities, flyers, posters, apparel, and print.',
      primaryCtaLabel: 'View work',
      primaryCtaLink: '/work',
      secondaryCtaLabel: 'Start a project',
      secondaryCtaLink: '#contact',
      stats: [
        { value: '9+', label: 'Years designing' },
        { value: '120+', label: 'Projects shipped' },
        { value: '6', label: 'Disciplines' },
        { value: '100%', label: 'Custom work' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'marquee',
    data: {
      items: [
        { text: 'Brand Identity' },
        { text: 'Web & Apps' },
        { text: 'Flyers & Posters' },
        { text: 'Apparel' },
        { text: 'Brochures' },
        { text: 'Full-Stack' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'about',
    data: {
      eyebrow: 'About me',
      headingPre: 'Designing at the',
      headingEmphasis: 'intersection of art & function',
      paragraphs: [
        { text: 'I\'m Wade Jackson — a Kentucky-based designer and developer who goes by “Jax.” For nearly a decade I\'ve helped brands show up boldly, whether that\'s a logo, a poster, a t-shirt, or a full-stack web app.' },
        { text: 'I care about the details most people feel but never name: the kerning on a headline, the easing on a hover, the weight of a fold. Good design should work as hard as it looks.' },
      ],
      personName: 'Wade Jackson',
      role: 'Graphic & Web Designer',
      location: 'Kentucky, USA',
      yearsExperience: 9,
      skills: [
        { name: 'Brand Identity', pct: 95 },
        { name: 'Web Design (UI/UX)', pct: 90 },
        { name: 'Typography', pct: 92 },
        { name: 'Full-Stack Development', pct: 85 },
        { name: 'Print & Layout', pct: 93 },
        { name: 'Motion Design', pct: 80 },
      ],
      tools: [
        { label: 'Figma' }, { label: 'Illustrator' }, { label: 'Photoshop' },
        { label: 'InDesign' }, { label: 'Next.js' }, { label: 'Framer Motion' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      eyebrow: 'Get in touch',
      heading: "Let's make something good.",
      blurb: 'Have a project in mind — a brand, a site, a flyer, a tee? Tell me a little about it and I\'ll get back to you within 24 hours.',
      projectTypeOptions: [
        { label: 'Brand Identity' },
        { label: 'Website / Web App' },
        { label: 'Flyer / Poster' },
        { label: 'Apparel / Merch' },
        { label: 'Brochure / Print' },
        { label: 'Something else' },
      ],
      email: 'hello@jaxstudio.ink',
      responseTime: 'I reply within 24 hours.',
      successMessage: "Thanks — I'll get back to you within 24 hours. A copy is on its way to your inbox.",
    },
  })

  // Services — clear + reseed (idempotent)
  const existingServices = await payload.find({ collection: 'services', limit: 200 })
  for (const doc of existingServices.docs) await payload.delete({ collection: 'services', id: doc.id })
  for (const service of services) await payload.create({ collection: 'services', data: service })

  // Projects — clear + reseed (idempotent)
  const existingProjects = await payload.find({ collection: 'projects', limit: 500 })
  for (const doc of existingProjects.docs) await payload.delete({ collection: 'projects', id: doc.id })
  for (const project of projects) await payload.create({ collection: 'projects', data: project })

  const svc = await payload.count({ collection: 'services' })
  const prj = await payload.count({ collection: 'projects' })
  payload.logger.info(`Seed complete. services=${svc.totalDocs} projects=${prj.totalDocs}`)
}

run()
  .then(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
