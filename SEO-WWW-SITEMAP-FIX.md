# Saancha Search Console sitemap + canonical fix

## Changes
- Canonical website domain set to `https://www.saancha.in` in `src/data/site.js` and `astro.config.mjs`.
- `robots.txt` points to `https://www.saancha.in/sitemap.xml`.
- `/sitemap.xml` is statically generated at build time to avoid SSR dependency on Googlebot requests. XML includes only known public routes: home, shop, custom moulds, and materials categories.
- Existing frontend and admin were not redesigned.

## Deploy and verify
1. Back up the currently deployed code; redeploy this project to production after successful `npm ci && npm run build`.
2. Open `https://www.saancha.in/sitemap.xml` and check for `<?xml`, `<urlset`, and URLs with `www.saancha.in`.
3. Open `https://www.saancha.in/robots.txt` and check the `Sitemap:` line.
4. Inspect the HTML of `/shop` and verify `<link rel="canonical" href="https://www.saancha.in/shop">`.
5. Search Console: resubmit `https://www.saancha.in/sitemap.xml`. Existing sitemap "couldn't fetch" reports may take time to update.
6. URL inspect `https://www.saancha.in/shop` and use Test Live URL. Indexing is not guaranteed.

## Important
- XML sitemap lists current publicly routable pages. No per-product detail URLs exist in this version; do not invent product URLs.
- Static XML requires a site rebuild when adding *new routable pages*, but product records displayed on `/shop` do not require a sitemap change.
- If Search Console still reports `Could not fetch`, check its response status, CDN/firewall/bot restrictions, and XML response headers as seen by Googlebot.
