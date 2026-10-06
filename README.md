# Yaqub Naqib — Frontend Developer Portfolio

Live site: **[yaqubnaqib.vercel.app](https://yaqubnaqib.vercel.app/)**

Portfolio of **Yaqub Naqib**, a frontend developer in Erbil, Kurdistan Region, Iraq, building commerce and SaaS frontends with React, TypeScript, Remix / React Router and Next.js. Available for freelance and subcontract projects.

## Case studies

| Project                                                         | Live                                              | Stack                                          |
| --------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| [iZone Iraq](https://yaqubnaqib.vercel.app/projects/izone-iraq) | [izoneiraq.com](https://www.izoneiraq.com/)       | TypeScript, React Router (Remix), Tailwind CSS |
| [Botolon](https://yaqubnaqib.vercel.app/projects/botolon)       | [botolon.com](https://www.botolon.com/)           | TypeScript, Next.js, Meta Graph API            |
| [WAOrders](https://yaqubnaqib.vercel.app/projects/waorders)     | [waordersiraq.com](https://waordersiraq.com/)     | Node.js, React Router, PostgreSQL, Prisma      |
| [ErbilianWay](https://yaqubnaqib.vercel.app/projects/erbilianway) | [erbiliantravel.com](https://erbiliantravel.com/) | Vue.js, Bootstrap, Laravel API                 |

Contact: [yaqub.nq@gmail.com](mailto:yaqub.nq@gmail.com) · [GitHub](https://github.com/Yaqubnaqib) · [LinkedIn](https://www.linkedin.com/in/yaqub-naqib-b9894b238/)

---

## Development

Next.js 15 (App Router, fully static pages) · React 18 · TypeScript (strict) · Tailwind CSS 3. Node.js 20.9+.

```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + typecheck + prettier
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill in what you need. Everything is optional except `NEXT_PUBLIC_SITE_URL` in production.

### Where things live

| What                                   | Where                                                  |
| -------------------------------------- | ------------------------------------------------------ |
| All copy (projects, skills, FAQ, jobs) | `src/data/content.ts`, `src/data/profile.ts`           |
| Production domain                      | `NEXT_PUBLIC_SITE_URL` → `src/lib/site.ts`             |
| JSON-LD (`@graph` per page)            | `src/lib/structured-data.ts`                           |
| Per-page metadata                      | `src/lib/metadata.ts`                                  |
| robots, sitemap, manifest, llms.txt    | `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/llms*.txt/route.ts` |
| Security headers, redirects            | `next.config.ts`                                       |
| Contact API                            | `app/api/contact/route.ts`, `src/lib/contact/*`        |

When you change copy, bump `CONTENT_UPDATED` in `src/lib/site.ts` (and `updated` on any edited project) so the sitemap and JSON-LD dates stay accurate.

### Moving to a custom domain

1. Add the domain in Vercel → Project → Domains.
2. Set `NEXT_PUBLIC_SITE_URL=https://your-domain` for Production and redeploy.
3. `yaqubnaqib.vercel.app` and `yaqwb.vercel.app` now 308-redirect to it automatically (see `LEGACY_HOSTS` in `next.config.ts`).
4. In Google Search Console, add the new property and use **Change of address**.

### Contact form

The form posts to `/api/contact`, which validates with zod, rate-limits per IP, checks a honeypot and (optionally) Cloudflare Turnstile, then sends with the first configured provider:

- **Resend:** `RESEND_API_KEY` (+ `CONTACT_FROM_EMAIL` once you verify a domain).
- **EmailJS (server-side):** `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`. The legacy `NEXT_PUBLIC_EMAILJS_*` and `REACT_APP_EMAILJS_*` names also work, and the private key is optional unless _Use Private Key_ is on. In EmailJS → Account → Security, enable _API access from non-browser environments_. Template variables: `{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, `{{message}}`.

With no provider configured the form shows a pre-filled `mailto:` link instead. Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) and Upstash rate limiting (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) switch on when their variables are present.

### IndexNow

After a production deploy, run `npm run indexnow` to notify Bing and other IndexNow engines of every URL in the live sitemap. The key file is `public/307f19964dededb899a96fc9165a1e5a.txt`.

### Icons

Skill and social icons are inline SVGs generated from [simple-icons](https://simpleicons.org/) (CC0): add a slug to `scripts/generate-brand-icons.mjs` and run `npm run icons`.

### CI

`.github/workflows/ci.yml` runs lint, typecheck, Prettier and build, then Lighthouse CI against `lighthouserc.json` (mobile; 95+ in every category, LCP < 2.0s, CLS < 0.05).
