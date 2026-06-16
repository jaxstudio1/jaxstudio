import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type {
  About,
  Brand,
  Contact,
  Hero,
  Marquee,
  PrivacyPage,
  Project,
  Service,
  SiteSetting,
  TermsPage,
} from '@/payload-types'

/**
 * Single cached Payload client per request (React.cache dedupes within a render).
 * Payload also memoizes its own instance across requests.
 */
const getClient = cache(async () => getPayload({ config }))

export const getBrand = cache(async (): Promise<Brand> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'brand', depth: 1 })) as Brand
})

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'site-settings', depth: 1 })) as SiteSetting
})

export const getHero = cache(async (): Promise<Hero> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'hero', depth: 1 })) as Hero
})

export const getMarquee = cache(async (): Promise<Marquee> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'marquee', depth: 0 })) as Marquee
})

export const getAbout = cache(async (): Promise<About> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'about', depth: 1 })) as About
})

export const getContact = cache(async (): Promise<Contact> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'contact', depth: 0 })) as Contact
})

export const getTermsPage = cache(async (): Promise<TermsPage> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'terms-page', depth: 0 })) as TermsPage
})

export const getPrivacyPage = cache(async (): Promise<PrivacyPage> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'privacy-page', depth: 0 })) as PrivacyPage
})

export const getServices = cache(async (): Promise<Service[]> => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'services', sort: 'order', limit: 50, depth: 0 })
  return res.docs as Service[]
})

export const getProjects = cache(
  async (opts?: { featured?: boolean; limit?: number }): Promise<Project[]> => {
    const payload = await getClient()
    const res = await payload.find({
      collection: 'projects',
      where: opts?.featured ? { featured: { equals: true } } : {},
      sort: 'order',
      limit: opts?.limit ?? 200,
      depth: 1,
    })
    return res.docs as Project[]
  },
)

export const getProject = cache(async (slug: string): Promise<Project | null> => {
  const payload = await getClient()
  const res = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as Project) ?? null
})

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  const payload = await getClient()
  const res = await payload.find({ collection: 'projects', limit: 500, depth: 0 })
  return (res.docs as Project[]).map((p) => p.slug).filter(Boolean) as string[]
})
