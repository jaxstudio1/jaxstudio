/**
 * Seed script — populates the terms-page and privacy-page globals.
 * Run with: node --env-file=.env --import tsx src/seed-legal.ts
 * Safe to re-run; updateGlobal is idempotent (upserts).
 */
import { getPayload } from 'payload'
import config from './payload.config'

// ─── Lexical JSON builders ───────────────────────────────────────────────────
const t = (text: string, format = 0) => ({
  detail: 0, format, mode: 'normal' as const, style: '', text, type: 'text', version: 1,
})
const bold = (s: string) => t(s, 1)
const p = (...children: object[]) => ({
  children, direction: 'ltr' as const, format: '' as const, indent: 0, textFormat: 0, type: 'paragraph', version: 1,
})
const li = (children: object[], value: number) => ({
  children, direction: 'ltr' as const, format: '' as const, indent: 0, type: 'listitem', value, version: 1,
})
const ul = (...items: object[][]) => ({
  children: items.map((c, i) => li(c, i + 1)),
  direction: 'ltr' as const, format: '' as const, indent: 0, listType: 'bullet', start: 1, tag: 'ul', type: 'list', version: 1,
})
const link = (url: string, text: string) => ({
  children: [t(text)], direction: 'ltr' as const, format: '' as const, indent: 0,
  fields: { linkType: 'custom', newTab: false, url }, type: 'link', version: 1,
})
const rt = (...children: object[]) => ({
  root: { children, direction: 'ltr' as const, format: '' as const, indent: 0, type: 'root', version: 1 },
})

const termsSections = [
  { heading: '1. Acceptance of Terms', body: rt(p(
    t('By accessing or using the website located at '), bold('jaxstudio.ink'),
    t(' ("Site") or any design or development services offered by '), bold('Jax Studio'),
    t(', operated by Wade Jackson ("Studio," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the Site.'),
  )) },
  { heading: '2. About Jax Studio', body: rt(p(
    t('Jax Studio is a Kentucky-based graphic and web design practice. We offer services including brand identity, web and application design and development, print design, and apparel graphics.'),
  )) },
  { heading: '3. Use of the Site', body: rt(
    p(t('You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of others. Prohibited conduct includes, but is not limited to:')),
    ul(
      [t('Transmitting unsolicited or unauthorized advertising or promotional material.')],
      [t('Attempting to gain unauthorized access to any part of the Site or its systems.')],
      [t('Using the Site to transmit harmful, offensive, or illegal content.')],
      [t('Scraping or extracting data from the Site without prior written consent.')],
    ),
  ) },
  { heading: '4. Intellectual Property', body: rt(p(
    t('All content on the Site — including portfolio work, text, graphics, logos, and code — is the property of Jax Studio or its clients and is protected by applicable intellectual property laws. Project work shown is displayed with permission for portfolio purposes. Unauthorized use or reproduction is prohibited.'),
  )) },
  { heading: '5. Project Work & Ownership', body: rt(p(
    t('Ownership of deliverables, usage rights, and licensing terms for any commissioned work are governed by the separate written agreement for that project. Until final payment is received, all work product remains the property of Jax Studio.'),
  )) },
  { heading: '6. Disclaimer of Warranties', body: rt(p(
    t('The Site and its content are provided on an '), bold('"as is"'), t(' and '), bold('"as available"'),
    t(' basis without warranties of any kind. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components.'),
  )) },
  { heading: '7. Limitation of Liability', body: rt(p(
    t('To the fullest extent permitted by law, Jax Studio shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of, or inability to use, the Site.'),
  )) },
  { heading: '8. Privacy', body: rt(p(
    t('Your use of the Site is also governed by our '), link('/privacy', 'Privacy Policy'),
    t(', which is incorporated into these Terms by reference.'),
  )) },
  { heading: '9. Changes to These Terms', body: rt(p(
    t('We may modify these Terms at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use after changes constitutes acceptance.'),
  )) },
  { heading: '10. Governing Law', body: rt(p(
    t('These Terms are governed by the laws of the Commonwealth of '), bold('Kentucky'),
    t(', without regard to its conflict of law provisions.'),
  )) },
  { heading: '11. Contact Us', body: rt(p(
    t('Questions about these Terms? Reach us via the '), link('/#contact', 'contact form'), t(' or at hello@jaxstudio.ink.'),
  )) },
]

const privacySections = [
  { heading: '1. Introduction', body: rt(
    p(bold('Jax Studio'), t(' ("Studio," "we," "us," or "our") is committed to protecting your privacy. This Policy explains how we collect, use, and safeguard your information when you visit '), bold('jaxstudio.ink'), t(' or submit our contact form.')),
    p(t('By using the Site, you consent to the practices described here. If you do not agree, please do not use the Site.')),
  ) },
  { heading: '2. Information We Collect', body: rt(
    p(t('We may collect the following:')),
    ul(
      [bold('Information you provide'), t(' — your name, email address, project type, and message when you submit the contact form.')],
      [bold('Usage data'), t(' — IP address, browser type, pages visited, and time on site, collected automatically.')],
      [bold('Communications'), t(' — records of correspondence you send to us.')],
    ),
    p(t('We do not knowingly collect personal information from children under 13.')),
  ) },
  { heading: '3. How We Use Your Information', body: rt(
    p(t('We use the information we collect to:')),
    ul(
      [t('Respond to your inquiries and provide requested services.')],
      [t('Improve the Site based on usage patterns.')],
      [t('Comply with legal obligations and protect our rights.')],
    ),
  ) },
  { heading: '4. Sharing of Information', body: rt(
    p(t('We do not sell or rent your personal information. We may share it with:')),
    ul(
      [bold('Service providers'), t(' — trusted vendors who help operate the Site (e.g., hosting, email delivery via SendGrid), bound by confidentiality.')],
      [bold('Legal requirements'), t(' — when required by law or to protect our rights.')],
    ),
  ) },
  { heading: '5. Cookies & Analytics', body: rt(p(
    t('The Site may use cookies and similar technologies to enhance your experience and analyze usage. You can configure your browser to refuse cookies, though some features may not function properly without them.'),
  )) },
  { heading: '6. Email', body: rt(p(
    t('When you submit the contact form, we send an acknowledgement to your email and a notification to ourselves so we can reply. We do not add you to any marketing list without your consent.'),
  )) },
  { heading: '7. Data Security', body: rt(p(
    t('We implement reasonable measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.'),
  )) },
  { heading: '8. Data Retention', body: rt(p(
    t('We retain your information for as long as necessary to fulfill the purposes described here, unless a longer period is required by law.'),
  )) },
  { heading: '9. Your Rights', body: rt(
    p(t('Depending on your jurisdiction, you may have the right to access, correct, or delete your personal information. To exercise these rights, contact us via our '), link('/#contact', 'contact form'), t('.')),
  ) },
  { heading: '10. Changes to This Policy', body: rt(p(
    t('We may update this Policy from time to time. Significant changes will be posted on this page with an updated "Last updated" date.'),
  )) },
  { heading: '11. Contact Us', body: rt(p(
    t('Questions about this Policy? Reach us via the '), link('/#contact', 'contact form'), t(' or at hello@jaxstudio.ink.'),
  )) },
]

const run = async () => {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding legal pages...')
  await payload.updateGlobal({ slug: 'terms-page', data: { lastUpdated: 'June 16, 2026', sections: termsSections } })
  payload.logger.info(`✓ terms-page — ${termsSections.length} sections`)
  await payload.updateGlobal({ slug: 'privacy-page', data: { lastUpdated: 'June 16, 2026', sections: privacySections } })
  payload.logger.info(`✓ privacy-page — ${privacySections.length} sections`)
}

run()
  .then(async () => { await new Promise((r) => setTimeout(r, 300)); process.exit(0) })
  .catch((err) => { console.error(err); process.exit(1) })
