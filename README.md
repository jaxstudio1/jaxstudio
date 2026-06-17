# Jax Studio — jaxstudio.ink

The portfolio of **Wade "Jax" Jackson** — graphic & web designer (Kentucky). A fast,
motion-rich, fully CMS-driven site: full-stack apps & websites, branding, flyers,
posters, apparel, and print.

## Stack
- **Next.js 15.4.11** (App Router, TypeScript, ESM)
- **Payload 3** CMS + **MongoDB Atlas** (document-first — all copy lives in the CMS)
- **Tailwind v4** · **Framer Motion** · **lucide-react**
- **Vercel Blob** for media · **SendGrid** for contact email
- Deploy: **Vercel** (auto-deploy on push). DNS/email stay on cPanel until cutover.

## Local development
```bash
npm install
cp .env.example .env   # then fill DATABASE_URI + PAYLOAD_SECRET
npm run dev            # http://localhost:3000  ·  admin at /admin
```

### Seed content
```bash
npm run seed        # globals, services, sample projects
npm run seed:legal  # Terms + Privacy pages
```
> On Windows, seeding uses `node --env-file=.env --import tsx` (the `payload run` CLI no-ops here).

### Payload codegen (after schema changes)
```bash
npm run generate:types
npm run generate:importmap   # required after adding a plugin or the first richText field
```

## Environment variables
| Var | Required | Notes |
|---|---|---|
| `DATABASE_URI` | ✓ | MongoDB Atlas connection string (path `/jaxstudio`) |
| `PAYLOAD_SECRET` | ✓ | 32+ char random string |
| `SENDER_EMAIL` / `SENDER_NAME` / `OWNER_EMAIL` | ✓ | contact-form email identity |
| `SENDGRID_API_KEY` | — | enables contact emails (no-ops when unset) |
| `BLOB_READ_WRITE_TOKEN` | — | enables Vercel Blob media (local disk when unset) |

## Architecture
- `src/payload.config.ts` — Payload config (collections + globals)
- `src/globals/` — SiteSettings, **Brand** (colors/fonts/motion → CSS vars), Hero, Marquee, About, Contact, Terms/Privacy
- `src/collections/` — Users, Media, Services, **Projects** (category-filterable), **Leads** (contact form + SendGrid hook)
- `src/app/(frontend)/` — public site: home, `/work`, `/work/[slug]`, legal
- `src/app/(payload)/` — Payload admin
- `src/components/` — `sections/`, `motion/` (reveal/stagger, reduced-motion aware), `ui/`

The **Brand** global is injected as `:root` CSS variables in `(frontend)/layout.tsx`, so
editing colors/fonts/motion in `/admin` re-themes the whole site. Content edits trigger
on-demand revalidation.
