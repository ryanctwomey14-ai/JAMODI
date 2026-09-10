# JAMODI Partners — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

```bash
npm install
npm run dev     # http://localhost:4321
npm run build
npm run start
```

> **Before this goes live, work through [FACTS-TO-VERIFY.md](./FACTS-TO-VERIFY.md).**
> Every number and claim currently on the page is an unverified placeholder.

---

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, mandate, how the asset class works, portfolio preview |
| `/why-multifamily` | The asset class, the three pillars, structure comparison |
| `/portfolio` | Every community, with business plan and target terms |
| `/process` | The four stages, plus the FAQ |
| `/leadership` | Founder narrative, pull quote, milestones, investor voices |
| `/faq` | Common questions (emits FAQPage structured data once answered) |
| `/disclosures` `/privacy` `/terms` | Legal. Disclosures carry draft Reg D language; privacy and terms await counsel. |

Every page ends with the same closing invitation, and the request dialog is
shared across all of them from `app/providers.tsx`.

## Where things are

```
app/
  layout.tsx        fonts, metadata, JSON-LD, header + footer, providers
  providers.tsx     the shared request-dialog provider
  <route>/page.tsx  one file per page; each composes shared sections
  globals.css       design tokens + component primitives
components/
  site/             Header, Footer, PageHero, LegalPage
  sections/         MandateBand, Pillars, Comparison, PortfolioGrid,
                    Process, FounderBio, Voices, FaqList, Closing
  home/Hero.tsx     the home hero
  ui/               Kit (buttons, eyebrow, shell), Reveal, Elevation,
                    RequestAccess (dialog + provider)
content/
  fund.ts           ⚠ ALL copy and data
tools/
  generate-media.py regenerates the placeholder property imagery
```

**Almost every content change is a change to `content/fund.ts` and nothing else.**

## shadcn/ui

The project is shadcn-ready: `components.json`, `@/lib/utils` with `cn`, and
`components/ui/` as the component path. `npx shadcn@latest add <component>`
works out of the box.

Semantic tokens (`--primary`, `--muted-foreground`, `--border`, `--destructive`,
`--ring`, …) are declared in `app/globals.css` and **mapped onto the JAMODI
palette**, not shadcn's slate defaults — so anything added arrives in brand
colours rather than stock grey. `--destructive` is a desaturated brick chosen to
sit with the rose gold, since the palette had no red.

One naming note: shadcn claims `--muted` for a *surface*, but this codebase
already used `muted` for body *text*. The original was renamed to `--muted-text`
(`text-muted-text`) to avoid the collision.

## Placeholders

There is **no invented data on this site.** Every fact specific to JAMODI —
figures, names, places, dates, terms, partners, track record, quotes — is the
literal string `[placeholder]`, exported from `content/fund.ts` as `P`. Each one
carries a comment above it saying what belongs there.

Placeholders render as a small gold chip so the design can be reviewed while it
stays obvious that nothing is real yet. Replace the value in `content/fund.ts`
and the chip disappears automatically — no component changes needed.

What is deliberately *not* a placeholder, because none of it is invented:
statements of securities law (Rule 501 thresholds, 506(c) verification),
descriptions of how private multifamily works in general, and the standard
Reg D language in `disclosures` — which still needs counsel's review.

Two places guard against placeholders leaking into machine-readable output:
the JSON-LD in `app/layout.tsx` omits placeholder-valued fields entirely, and
`/faq` only publishes FAQPage entries whose answers are real.

## Design system

Direction: **light institutional, private-capital register.** Warm white ground,
navy as the structural colour, rose gold — taken from the mark — as the single
accent. Headlines are set in a high-contrast serif; Inter does all the reading.
Restraint is the luxury cue rather than ornament: one accent colour, one dark
block per page at most, quiet hairlines, and a great deal of air.

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#fcfbf9` | warm white page ground |
| `paper` | `#ffffff` | cards |
| `sand` | `#f4f0e9` | alternating band |
| `navy` | `#0f1d33` | structure, primary button, the matrix column |
| `gold` / `gold-2` | `#bd8360` / `#9c6543` | the mark's rose gold — the only accent |
| `ink` | `#10182a` | body text (16.1:1 on canvas) |
| `muted` | `#55637a` | secondary text (6.6:1) |
| `faint` | `#7a889c` | fine print (4.7:1) |

### Typography — one face, taken from the logo

The JAMODI lockup is set in a heavy geometric sans: narrow oval bowls, a pointed
`A` apex, a full-depth `M` vertex, a hooked `J`, with "PARTNERS" beneath it in
the same family at Light and very wide tracking. **Montserrat** is the closest
widely-available match and now carries the entire site — there is no second
typeface anywhere.

| Role | Weight | Treatment |
| --- | --- | --- |
| `h1` | 800 | tracking `-0.038em` — the wordmark register |
| `h2` `h3` | 700 | tracking `-0.032em` |
| Body | 400 | 1rem / 1.75, tracking `-0.003em` |
| Eyebrows, tags | 500 | uppercase, tracking `0.26–0.3em` — echoes the "PARTNERS" line |
| Figures | 700 | `font-variant-numeric: tabular-nums` so money aligns in columns |

`--font-display`, `--font-sans` and `--font-mono` all resolve to Montserrat.
They remain separate tokens so a future brand change can split them again
without touching a single component.

> If the brand guide names the exact face used in the logo, swapping it is a
> one-line change in `app/layout.tsx` plus the three tokens in `globals.css`.
> Montserrat is a close match, not a confirmed identification.

All three faces are self-hosted at build time by `next/font`: no render-blocking
request to Google, no FOIT, ~0 CLS from the swap.

## Motion

Every animation is `transform`/`opacity` only, on the `cubic-bezier(0.23,1,0.32,1)`
curve, and every one has a reduced-motion variant.

| What | Tool | Notes |
| --- | --- | --- |
| Hero entrance | Framer Motion | 70ms stagger, 750ms, on mount |
| Scroll reveals | Framer Motion `useInView` | fires **once**, 60ms stagger |
| FAQ accordion | Framer Motion height | 240ms — the sanctioned `height` exception |
| Request dialog | Framer Motion + `AnimatePresence` | 250ms, scales from centre |
| Mandate rail | CSS animation | runs off the main thread; pauses on hover |
| Hover / press | CSS transitions | gated behind `(hover: hover) and (pointer: fine)` |

Verified with `prefers-reduced-motion: reduce`: nothing is left at `opacity: 0`.

---

## Accessibility

- Skip link; visible focus rings on `champagne`
- Request dialog: `role="dialog"`, `aria-modal`, labelled, focus trapped, focus
  restored to the trigger on close, `Esc` closes, background scroll locked
  without a layout jump
- Form: visible labels, `aria-invalid`, errors below the field in `role="alert"`,
  focus moves to the first invalid field on submit
- The comparison matrix is a real `<table>` with `scope` on every header, and a
  `<caption>` for screen readers; it becomes stacked cards under `lg`
- All touch targets ≥ 44px; no horizontal scroll at 390 / 834 / 1440

---

## Hero video

The home hero runs `public/video/hero.mp4` — aerial footage of a community,
encoded from the supplied `Jamodi Hero.mp4`:

| | Source | Shipped |
| --- | --- | --- |
| Size | 9.3 MB | **1.9 MB** |
| Dimensions | 1920×1080 | 1440×810 |
| Frame rate | 30 fps | 24 fps |
| Duration | 8s | 16s (ping-pong loop) |

The shipped file is a **ping-pong loop** — the clip forward, then reversed — so
the loop point is invisible instead of cutting back to frame one. It carries no
audio track, `+faststart` so playback begins before the file finishes
downloading, and `yuv420p` for Safari.

Re-encode after replacing the source:

```bash
ffmpeg -i "Jamodi Hero.mp4"   -filter_complex "[0:v]scale=1440:-2,fps=24,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[out]"   -map "[out]" -an -c:v libx264 -preset slower -crf 30 -pix_fmt yuv420p   -movflags +faststart web/public/video/hero.mp4
```

`hero-poster.jpg` is the first frame. It paints immediately so the band is never
empty, and it is what renders in place of the video under
`prefers-reduced-motion: reduce` — the `<video>` element is not mounted at all.

> A VP9 WebM was encoded and discarded: at matched quality it came out *larger*
> than the H.264, so serving it would have cost bytes rather than saved them.

## Card photography

`public/media/cards/` holds the five backgrounds for the "investors we work
with" grid, wired in `CARD_IMAGES` in `components/sections/InvestorProfiles.tsx`.

These came in with very different exposures (mean luminance 96–157), which
would have made three of five cards unreadable under one shared scrim. They are
normalised to a common ~160 mean, contrast nudged back after the lift, and
desaturated slightly so five separate scenes read as one set. Source PNGs were
1.4–2.1 MB each; the shipped JPEGs total 636 KB.

To swap one out, drop the replacement in and re-run the normalisation — the
paths and crop anchors do not change. Set an entry to `null` and that card
falls back to its gradient wash rather than breaking.

## Replacing the placeholder imagery

`public/media/*.jpg` are **procedurally generated placeholders** — sunlit
multifamily exteriors produced by `tools/generate-media.py`. They read as clean
architectural renders, not photographs, and that is their limit: real property
photography is the single biggest visual upgrade available to this design. The
`.plate-grade` class grades them so they sit deliberately rather than awkwardly;
drop that class once real photography is in.

Drop real photography in at the same paths and aspect ratios and no code changes
are needed:

| File | Aspect | Used by |
| --- | --- | --- |
| `hero-community.jpg` | 16:9, wide | Hero plate |
| `cta-community.jpg` | ~2:1, wide | Final CTA panel |
| `asset-*.jpg` | 4:3 | Portfolio cards |
| `og.jpg` | 1200×630 | Social preview |

To regenerate the placeholders: `python tools/generate-media.py` (needs Pillow).

---

## The dialog, and where leads go

Every "Request private deal flow" button on the page opens the same dialog, so
the funnel has one measurable entry point. Each submission is tagged with a
`source` field naming the button that opened it (`hero`, `header`, `faq`,
`final-cta`, `mobile-menu`).

Set `NEXT_PUBLIC_FORM_ENDPOINT` to your CRM or form endpoint. If it is unset, the
dialog falls back to opening the visitor's mail client with the fields
pre-filled — functional, but it loses tracking, so wire the endpoint before
launch.

---

## Not built yet

The homepage links to three legal pages that do not exist: `/disclosures`,
`/privacy`, `/terms`. They need counsel's text before they can be written.
