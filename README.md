# JAMODI Partners — website

Marketing site for JAMODI Partners, a private real estate sponsor acquiring and
operating value-add multifamily communities for accredited investors.

**Live review site:** https://ryanctwomey14-ai.github.io/JAMODI/

---

## ⚠ This is a review build, not a launch

Nothing here has been through securities-counsel review. Before this goes in
front of an investor, work through [`web/FACTS-TO-VERIFY.md`](web/FACTS-TO-VERIFY.md).
Anything not yet confirmed by the client renders on the page as a visible
`[placeholder]` chip rather than as invented data — that is deliberate.

The review deployment sets `robots: noindex, nofollow` so it cannot be indexed
or compete with the production domain.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
lucide-react · shadcn/ui foundation. Every route prerenders as static.

## Running it

```bash
cd web
npm install
npm run dev          # http://localhost:3000
```

```bash
cd web
npm run build && npm start
```

## Where the content lives

**All copy and data is in one file: [`web/content/fund.ts`](web/content/fund.ts).**
Nothing needs to be hunted for in the markup. Edits to headlines, metrics, bios,
FAQs and disclosures all happen there.

The placeholder system:

```ts
export const P = "[placeholder]";
```

Any field set to `P` renders as a gold `[placeholder]` chip in the UI and is
omitted entirely from structured data. Replace the value to fill it in.

## Two build targets

| | command | output |
|---|---|---|
| Production | `npm run build` | Next server build, image optimization on, no path prefix |
| Pages review | `GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/JAMODI npm run build` | static export to `web/out`, unoptimized images, trailing slashes |

GitHub Pages serves this repo from the `/JAMODI` sub-path, so asset URLs need
that prefix. `next/image` does **not** add it in a static export, so images go
through [`web/components/ui/Img.tsx`](web/components/ui/Img.tsx) and raw
`<video>`/metadata paths go through [`web/lib/basePath.ts`](web/lib/basePath.ts).
Locally both collapse to a no-op.

Deployment is automatic: pushing to `main` runs
[`.github/workflows/pages.yml`](.github/workflows/pages.yml).

## Going to the real domain

Point Vercel (or any Next host) at this repo and build with the default
`npm run build` — no env vars. Then set `SITE_URL` in
[`web/app/layout.tsx`](web/app/layout.tsx) to the production domain so canonicals
and Open Graph images resolve, and let the build index normally.

## Repository layout

```
web/                  the Next.js application
  app/                routes
  components/         sections, site chrome, ui primitives
  content/fund.ts     ← all copy and data
  public/             images, video, brand marks
  FACTS-TO-VERIFY.md  ← pre-launch checklist
STRATEGY.md           positioning, ICP and page-by-page rationale
brand/                source brand assets
```
