# CEST Website: Community Engagements for Sustainable Transformation

> “Building a Better Community”: official website MVP for CEST, Masingbi, Sierra Leone.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Zod · lucide-react**.
Content comes from the CEST Constitution (adopted 14 January 2022) and CEST’s own documents and photos.
Anything not confirmed is marked with a yellow dashed `[PLACEHOLDER]` chip so it cannot be missed.

---

## 1. Run it locally

You need **Node.js 20.9 or newer** (check with `node -v`) and npm.

```bash
cd cest-website
npm install
cp .env.example .env.local     # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. Edits reload automatically.

In development, forms succeed and print the submission to the terminal (nothing is emailed until you configure delivery, see §4).

## 2. Commands

| Task | Command |
| --- | --- |
| Development server | `npm run dev` |
| Lint | `npm run lint` |
| Type-check | `npx tsc --noEmit` |
| Production build | `npm run build` |
| Run the production build | `npm run start` (after `npm run build`) |

## 3. Project structure

```
cest-website/
├─ public/
│  ├─ images/cest/          Real CEST photos (renamed, kebab-case)
│  ├─ logo/cest-logo.jpg    Official logo
│  └─ opengraph-image.jpg   Social-sharing image (1200×630)
├─ src/
│  ├─ app/                  Routes (one folder per page)
│  │  ├─ page.tsx           Home (sections in the order of the brief)
│  │  ├─ about/ programs/ projects/ impact/ leadership/ gallery/
│  │  ├─ get-involved/ volunteer/ partner/ membership/ donate/
│  │  ├─ news/ (+ [slug], category/[category])  contact/
│  │  ├─ (legal)/[slug]/    privacy, terms, safeguarding, code-of-conduct
│  │  ├─ admin/             Placeholder dashboard (closed unless credentials set)
│  │  └─ sitemap.ts robots.ts not-found.tsx error.tsx layout.tsx globals.css
│  ├─ components/
│  │  ├─ layout/            Header, MobileNav, Footer, WhatsAppButton
│  │  ├─ sections/          Homepage / reusable page sections
│  │  ├─ cards/             Program, Project, Post, Person, Stat cards
│  │  ├─ forms/             FormShell, Fields, Forms (contact, volunteer, partner, membership, newsletter)
│  │  ├─ ui/                Button, Section, PageHero, Placeholder, Icon, ImagePlaceholder…
│  │  └─ seo/JsonLd.tsx
│  ├─ data/                 ALL CONTENT lives here, separate from the UI
│  │  ├─ site.ts            Name, address, phones, email, legal status, env-driven links
│  │  ├─ programs.ts  projects.ts  news.ts  leadership.ts
│  │  ├─ impact.ts  gallery.ts  objectives.ts  navigation.ts  legal.ts
│  ├─ lib/
│  │  ├─ content.ts         The ONE place pages read content from (CMS swap point)
│  │  ├─ actions.ts         Server actions for forms
│  │  ├─ schemas.ts         Zod validation
│  │  ├─ sanitize.ts rate-limit.ts notify.ts seo.ts utils.ts
│  ├─ proxy.ts              Guards /admin (Next 16’s replacement for middleware)
│  └─ types/index.ts        Shared content types
├─ .env.example
└─ next.config.ts           Security headers, image formats
```

## 4. Environment variables

All are optional locally. See [.env.example](.env.example).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, e.g. `https://www.yourdomain.org`. Used for canonical URLs, sitemap, Open Graph and structured data. **Set this in production.** |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional override of the WhatsApp number (digits only). Defaults to CEST's confirmed `+232 78865887` in `src/data/site.ts`. |
| `NEXT_PUBLIC_FACEBOOK_URL`, `_X_URL`, `_INSTAGRAM_URL`, `_YOUTUBE_URL`, `_LINKEDIN_URL` | Social links. The footer shows icons only for those that are set. |
| `NEXT_PUBLIC_MAP_EMBED_URL` | Google Maps embed URL for the Contact page. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Email delivery of form submissions via [Resend](https://resend.com). |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Optional: also store submissions in a Supabase table. **Server-side only.** |
| `FORMS_LOG_ONLY` | Testing only: accept forms without delivering them. Never use in production. |
| `ADMIN_USER`, `ADMIN_PASSWORD` | Enable the `/admin` placeholder (HTTP Basic auth). Without both, `/admin` is a 404. |

Only variables starting with `NEXT_PUBLIC_` reach the browser. API keys never do.

### How forms are delivered

Forms never contact a provider directly; they go through `src/lib/notify.ts`.

* **Resend configured** → each submission is emailed to `CONTACT_TO_EMAIL` (reply-to is the sender).
* **Supabase configured** → also inserted into `form_submissions`.
* **Nothing configured, development** → printed to the terminal, user sees success.
* **Nothing configured, production** → the user is told the form is not connected and shown CEST’s email address, so **no submission is silently lost**.

Supabase table (optional):

```sql
create table form_submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);
alter table form_submissions enable row level security; -- no policies: only the service role can write/read
```

Spam and abuse protection on every form: server-side Zod validation, input sanitisation, a hidden honeypot field, a minimum-fill-time check, and a per-IP rate limit (5 submissions per 10 minutes per form). The rate limiter is in-memory (per server instance); on Vercel/serverless swap `src/lib/rate-limit.ts` for a shared store such as Upstash Redis.

## 5. Deploying

**Vercel (recommended, free tier is enough)**

1. Put the `cest-website` folder in a GitHub repository (the supplied Word/PDF documents and certificates are **not** inside it and should stay private).
2. On vercel.com choose **Add New → Project**, import the repo; the framework (Next.js) is detected automatically.
3. Add the environment variables from §4 (at least `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`).
4. Deploy. Then add your domain under **Settings → Domains**.

**Any Node server / VPS**: `npm ci && npm run build && npm run start` (port 3000; put Nginx/Caddy with HTTPS in front).

After deploying, submit each form once, and check `/sitemap.xml` and `/robots.txt`.

## 6. How to update content (no code in the components)

| To change… | Edit |
| --- | --- |
| Address, phones, email, registration status | `src/data/site.ts` |
| Add/edit a project | `src/data/projects.ts` (set `isPlaceholder: false`, add `image` in `public/images/cest/`) |
| Add a news story | `src/data/news.ts` (set `isSample: false`; samples are hidden from search engines) |
| Leadership names and photos | `src/data/leadership.ts` (set `name` and `photo`) |
| Impact numbers | `src/data/impact.ts` (set `value`; the “coming soon” text disappears automatically) |
| Programs, objectives, values | `src/data/programs.ts`, `src/data/objectives.ts` |
| Gallery | `src/data/gallery.ts` |
| Legal pages | `src/data/legal.ts` |

To connect a CMS later (Sanity, Strapi, Supabase…), re-implement the functions in `src/lib/content.ts` to fetch from it, returning the same types from `src/types`. Pages and components do not change.

## 7. Placeholders you must replace before launch

Search the site for yellow `[ … ]` chips, or search the code for `[ADD`. The full list:

1. **Leadership**: names and photos for every role (`[PHOTO] [NAME]`), only once the people have approved publication.
2. **Social media links**, **Google Maps embed**. (WhatsApp is set to +232 78865887, confirmed by CEST.)
3. **Donation payment information** (bank/mobile-money/Stripe/PayPal details). Nothing is invented.
4. **Impact figures**: only verified numbers.
5. **Project details**: dates, participating schools/pupils, farmers, results, and real status for the *Quiz & Spelling Bee* and *Food Security & Farming* entries.
6. **Gallery captions**: dates and details (the quiz photos have conflicting year labels; see §8).
7. **Partners/supporters** logos.
8. **Membership** fees and registration process.
9. **Policies**: Privacy Policy, Terms, Safeguarding, Code of Conduct (all marked as draft placeholders; only CEST can approve these).
10. **News**: replace the three clearly-labelled sample posts with real stories.
11. **Program details**: locations, dates, results on each program page (`[ADD VERIFIED PROGRAM DETAILS]`).
12. **Photo consent**: confirm CEST has consent (parents/schools) to publish photos showing children (see `safeguarding`).
13. **Domain name** and `NEXT_PUBLIC_SITE_URL`.

## 8. Things to confirm with CEST (found while reading the documents)

* **Phone number**: the brief said `+232 88554536`; the constitution and letterhead say `+232 88554636`. The site uses **88554636**. Edit `src/data/site.ts` if that is wrong.
* **Constitution adoption date**: the text says **14 January 2022** (used); the file name says 22 January 2022.
* **Quiz & Spelling Bee dates**: photo file names say 2018/2024, the trophy board reads “2017 Quiz winners (KADA)”, and the sample certificate is labelled 2025. The site shows **no year** for the quiz until confirmed.
* **Registration renewals**: the District Council certificate expired 31 Dec 2025 and certificates are “renewed annually”. Confirm current renewals before the registration strip is shown publicly.
* **Address**: the District Council certificate lists “No. 8 Hospital Road, Masingbi Konike”; the site uses the constitution’s **38A Kono Road, Masingbi**.
* The Corporate Affairs Commission certificate spells the name “Community Engagement for Sustainable Trasformation”. The site uses the correct name from the constitution. Consider correcting the certificate.
* **Registration/serial numbers** are deliberately **not** published.
* **Founder names** appear in the constitution but are not published; add them in `src/data/leadership.ts` once approved.

## 9. Accessibility, SEO and performance

* Semantic landmarks, skip link, one `<h1>` per page, visible focus rings, ≥44 px touch targets, labelled forms with `aria-invalid`, `aria-describedby` and live regions, keyboard-operable menus (Escape closes the mobile menu and returns focus), `prefers-reduced-motion` respected.
* Colour pairs were chosen for WCAG AA contrast; zero known horizontal overflow from 320 px to 1920 px.
* Per-page title, description, canonical, Open Graph and Twitter/X metadata; `sitemap.xml`; `robots.txt`; Organization (NGO) JSON-LD; sample/template pages are `noindex`.
* `next/image` (AVIF/WebP, responsive sizes, lazy loading), one font (Inter, self-hosted by Next), minimal client JavaScript (accordions are native `<details>`; only the forms and mobile menu are client components).
* Security headers (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`). A strict Content-Security-Policy is a recommended hardening step.

Run Lighthouse in Chrome DevTools against the **production** build (`npm run build && npm run start`) to measure the 90+ target on your own network and hosting.

## 10. Recommended next features

**V2**: CMS (e.g. Sanity or Supabase) + admin login · real projects and impact numbers · gallery albums · events calendar · volunteer & message management · newsletter provider (Mailchimp/Brevo) · Krio/French language toggle · analytics (privacy-friendly).
**V3**: online donations (Stripe/PayPal + Orange Money/Afrimoney) · membership registration & payments · member and donor portals · impact dashboard.
**V4**: project, grant and beneficiary management · monitoring & evaluation · financial and donor reporting.
