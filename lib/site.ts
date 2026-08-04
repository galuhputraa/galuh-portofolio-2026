/**
 * Absolute origin of the deployed site.
 *
 * Prefers the explicit NEXT_PUBLIC_SITE_URL (set this to the custom domain in
 * Vercel), falls back to the per-deployment URL Vercel injects so preview
 * builds still emit correct absolute URLs, then to localhost for `next dev`.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
