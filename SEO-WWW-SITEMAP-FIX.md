# Saancha Search Console sitemap + canonical fix

## Changes
- Canonical website domain set to `https://www.saancha.in` in `src/data/site.js` and `astro.config.mjs`.
- `robots.txt` points to `https://www.saancha.in/sitemap.xml`.
- `/sitemap.xml` is served by the Astro server route so it can include all published product and blog URLs from Supabase as well as the public landing pages.
- Do not add a `public/sitemap.xml` file: static files take precedence over the Astro sitemap route on Vercel and would hide the dynamic sitemap.
- Existing frontend and admin were not redesigned.

## Deploy and verify
1. Back up the currently deployed code; redeploy this project to production after successful `npm ci && npm run build`.
2. Open `https://www.saancha.in/sitemap.xml` and check for `<?xml`, `<urlset`, and URLs with `www.saancha.in`.
3. Open `https://www.saancha.in/robots.txt` and check the `Sitemap:` line.
4. Inspect the HTML of `/shop` and verify `<link rel="canonical" href="https://www.saancha.in/shop">`.
5. Search Console: resubmit `https://www.saancha.in/sitemap.xml`. Existing sitemap "couldn't fetch" reports may take time to update.
6. URL inspect `https://www.saancha.in/shop` and use Test Live URL. Indexing is not guaranteed.

## Important
- XML sitemap lists the current public landing pages and all published product and blog detail URLs. Admin, account and authentication routes are intentionally excluded.
- Update the public landing-page list in `src/pages/sitemap.xml.js` when adding a new public page route.
- If Search Console still reports `Could not fetch`, check its response status, CDN/firewall/bot restrictions, and XML response headers as seen by Googlebot.
