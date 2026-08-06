# Galuh Putra Warman — Personal Website

Bento-grid personal site for an AI/ML engineer. Slate surfaces and typography
carried over from the previous portfolio HTML, accented with Bank Mandiri blue,
rebuilt as a bento layout with cinematic scroll motion via framer-motion. Light
is the default theme.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · framer-motion 12 · next-themes

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npx eslint app components lib
```

## Where things live

| Path | What |
|---|---|
| [`lib/data.ts`](lib/data.ts) | **All site content** — profile, experience, projects, certifications, skills, links. Edit copy here, nowhere else. |
| [`lib/motion.ts`](lib/motion.ts) | Shared easing/spring/variant tokens. Every animation pulls from here. |
| [`app/globals.css`](app/globals.css) | Colour tokens (light + dark), type stack, dot-grid, focus ring. **Authoritative palette.** |
| `components/ui/` | Primitives — `BentoCard`, `SplitText`, `AnimatedCounter`, `MagneticCursor`, `ScrollProgress`, `GridBackground`, `IntroOverlay`, `LogoChip`, `ThemeToggle`. |
| `components/sections/` | Page sections — `Nav`, `Hero`, `About`, `Experience`, `Work`, `Credentials`, `Contact`, `Footer`. |
| `design-system/galuh-portfolio/MASTER.md` | ui-ux-pro-max output. Note the palette-override banner at the top. |

## Palette & type

Inherited from the previous portfolio HTML. Light is the default theme.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#EEF1F6` | `#080B12` |
| `--surface` | `#FFFFFF` | `#0F1420` |
| `--surface-hover` | `#F5F7FA` | `#161D2C` |
| `--fg` | `#1E2A44` (11.9:1) | `#E8ECF4` (16.3:1) |
| `--fg-muted` | `#4E5C73` (5.9:1) | `#98A3B8` (7.7:1) |
| `--fg-faint` | `#5F6D82` (4.6:1) | `#7D8899` (5.3:1) |
| `--accent` | `#003D79` (11.6:1) | `#4C9AE8` (6.5:1) |
| `--pill` | `#2B374D` | `#E8ECF4` |

`--accent` is Bank Mandiri blue, sampled from the dominant wordmark colour in
`public/logos/mandiri.png`. It replaces the original HTML's teal `#0F6F6A`.
Dark mode uses a brightened tint of the same hue — `#003D79` scores 1.6:1 on
`#080B12` and would be invisible.

Fonts are the same three families: **Plus Jakarta Sans** (display + body),
**IBM Plex Mono** (uppercase labels, dates, metrics), **Great Vibes** (footer
monogram) — self-hosted through `next/font` rather than fetched from
fonts.googleapis.com.

**Three neutrals also deviate from the original, all for WCAG AA** (documented
inline in `globals.css`): `--fg-muted` and `--fg-faint` sat at 4.2:1 and 2.2:1
in light mode, and `--fg-faint` at 4.2:1 in dark. Since faint carries dates and
role periods — content, not decoration — it has to clear 4.5:1.

## Certificate thumbnails

```bash
npm run thumbs   # node scripts/certificate-thumbnails.mjs
```

Renders page 1 of every PDF in `public/certificates/` to a trimmed WebP in
`public/certificates/thumbs/`, keyed by filename. Cards show the thumbnail
(14–37 KB) and still link to the PDF, so nobody downloads 360 KB just to see
what a certificate looks like. Re-run after adding or replacing a PDF.

Requires the `mupdf` and `sharp` devDependencies — build and runtime do not.

Rendering uses MuPDF rather than pdf.js: pdf.js dropped the entire body text of
the Coursera certificates (recipient name, course title, description), leaving a
thumbnail that was just the sidebar on a blank page.

## Motion

Enter 300–600ms, exit ~65% of enter, `transform`/`opacity` only — nothing animates
width, height, top or left.

`useReducedMotion()` is honoured everywhere: the intro curtain and magnetic cursor
never mount, parallax and the timeline spine freeze, counters render their final
value immediately, and reveals collapse to a plain opacity swap. The CSS in
`globals.css` also clamps every transition under `prefers-reduced-motion: reduce`.

framer-motion is loaded through `LazyMotion` + `domAnimation` and every component
uses `<m.*>` rather than `<motion.*>`, which keeps the animation bundle at roughly
18kb instead of 34kb.

## Assets

- `public/galuh.jpeg` — profile photo
- `public/logos/` — `mandiri.png` (Wikimedia), `bangkit.png` (Wikimedia), `ilmuone.png` (official mark, whitespace auto-cropped)
- `public/cv/CV-Galuh-Putra-Warman.pdf`
- `public/certificates/` — 9 certificate PDFs, linked from the Credentials section

Brand logos sit on a white chip (`.logo-chip`) in both themes. They are never
inverted or recoloured — official marks keep their own colours.

## Content boundary

Bank Mandiri appears **only** as an employment entry in the Experience timeline:
title, period, location. No project names, internal system names, client data or
metrics from that role appear anywhere on the site. `lib/data.ts` documents this,
and `Experience` renders the description/highlights blocks conditionally so an
entry without them stays clean.

## Deploying

See **[DEPLOY.md](DEPLOY.md)** for the full GitHub → Vercel walkthrough.

Short version: Vercel auto-detects Next.js and needs no build configuration. The
one thing you must set is `NEXT_PUBLIC_SITE_URL` (see `.env.example`), otherwise
OpenGraph and Twitter image URLs resolve against `localhost` and link previews
break. `lib/site.ts` falls back to Vercel's per-deployment URL on previews.

Every route prerenders as static content, so any static host works too.
