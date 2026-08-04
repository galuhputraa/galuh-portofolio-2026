# Deploy

The repo is already initialised and committed on `main`. Nothing has been
pushed anywhere yet — that's the part below.

Run everything from `C:\Galuh\Personal\portfolio-web`.

---

## 1 — Create the GitHub repo and push

### Option A: GitHub CLI (fewer steps)

```bash
gh auth login          # skip if already authenticated
gh repo create galuh-portfolio --private --source=. --remote=origin --push
```

`gh repo create` sets the remote and pushes in one go. Use `--public` instead of
`--private` if you want the source visible.

### Option B: web UI

1. Go to <https://github.com/new>.
2. Name it `galuh-portfolio`. **Leave every "Initialize this repository with"
   checkbox unticked** — the repo already has a commit, and a README or license
   created on GitHub's side will collide with it.
3. Create, then:

```bash
git remote add origin https://github.com/<your-username>/galuh-portfolio.git
git push -u origin main
```

### Verify

```bash
git remote -v
git log --oneline -1
```

---

## 2 — Deploy on Vercel

1. <https://vercel.com/new> → **Import Git Repository** → pick `galuh-portfolio`.
   Authorise Vercel for the repo if prompted.
2. Leave every build setting at its default. Vercel detects Next.js on its own:

   | Setting | Value |
   |---|---|
   | Framework Preset | Next.js |
   | Root Directory | `./` |
   | Build Command | `next build` (default) |
   | Install Command | `npm install` (default) |
   | Output Directory | (leave empty) |

   Do **not** set a Root Directory — the repo root *is* the app.
3. Click **Deploy**. First build takes roughly 2–4 minutes.

You get a URL like `galuh-portfolio.vercel.app`. The site works at this point,
but social previews are still wrong — fix that next.

---

## 3 — Set the site URL (required)

Without this, OpenGraph and Twitter card images resolve against
`http://localhost:3000` and every link preview breaks on WhatsApp, LinkedIn,
Slack and X.

**Vercel → your project → Settings → Environment Variables**

| Key | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://galuh-portfolio.vercel.app` | Production |

No trailing slash. Then **Deployments → ⋯ on the latest → Redeploy** — env vars
are baked in at build time, so the running deployment won't pick it up on its
own.

Leave preview deployments without the variable: `lib/site.ts` falls back to
Vercel's per-deployment URL there, which is what you want.

---

## 4 — Custom domain (optional)

1. **Settings → Domains → Add**, enter the domain.
2. Point DNS at Vercel as instructed — usually an `A` record to `76.76.21.21`
   for the apex, and a `CNAME` to `cname.vercel-dns.com` for `www`.
3. Once it verifies, update `NEXT_PUBLIC_SITE_URL` to the custom domain and
   redeploy.

---

## Verify the deployment

Open these on the live URL:

- `/` — the site itself
- `/robots.txt` — should list your real domain in the `Sitemap:` line
- `/sitemap.xml` — one entry, your real domain
- `/opengraph-image` — 1200×630 PNG
- `/icon` — the `gw` favicon

Then paste the URL into <https://www.opengraph.xyz/> to confirm the social card
renders with the right title, description and image.

Also worth a pass:

- Toggle light ↔ dark
- Chrome DevTools → Rendering → **Emulate `prefers-reduced-motion: reduce`**,
  reload: no intro curtain, no custom cursor, no parallax, everything readable
- Lighthouse on mobile
- Tab through with the keyboard — the focus ring should be visible everywhere

---

## Ongoing

Every push to `main` triggers a production deploy. Pushes to any other branch
get a preview URL.

```bash
git add -A
git commit -m "Update experience section"
git push
```

Content changes almost always mean editing `lib/data.ts` only.

After adding or replacing a certificate PDF in `public/certificates/`:

```bash
npm run thumbs   # regenerate the preview images
git add -A && git commit -m "Add certificate" && git push
```

---

## Notes

- `npm audit` reports 3 high-severity advisories, all in the `pdfjs-dist`
  dependency chain used by the thumbnail script. That script only ever runs
  locally against your own PDFs and is not part of the build or runtime, so
  nothing reaches production. Worth revisiting when `pdfjs-dist` publishes a fix.
- `.env.example` is committed on purpose — it documents the one variable and
  holds no values. Real `.env*` files stay ignored.
- The repo is scoped to `portfolio-web/` only. The CV source PDFs, certificate
  archive and personal photos sitting in `C:\Galuh\Personal\` are outside it and
  cannot be committed by accident.
