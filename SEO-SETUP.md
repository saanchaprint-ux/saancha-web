# Saancha Search SEO Setup

This change preserves the storefront design and does not change CMS data or product publishing.

## Implemented

- Correct robots.txt and a dynamically-served public sitemap.xml, including Home, Shop Moulds, Custom Moulds and all four material category pages.
- Page-specific titles and descriptions, canonical URLs, Open Graph and Twitter sharing tags.
- Noindex meta tags for admin, account and authentication pages; excluded from sitemap.
- Google Search Console verification tag, configured using `GOOGLE_SITE_VERIFICATION` in Vercel environment variables.
- Optional Google Analytics 4 tag, configured using `PUBLIC_GA_MEASUREMENT_ID` in Vercel environment variables.
- Existing homepage LocalBusiness and category breadcrumb structured data retained.

## Set up Google

1. Deploy the new project with your production domain `https://saancha.in` (if this is not your live domain, change `site.domain` in `src/data/site.js`, the `site` field in `astro.config.mjs`, and the Sitemap line in `public/robots.txt`).
2. Open Google Search Console (https://search.google.com/search-console) and add a URL-prefix property for your live domain. Choose **HTML tag** verification and copy only the value of its `content` attribute into the Vercel environment variable `GOOGLE_SITE_VERIFICATION`. Redeploy and click Verify. A DNS-based domain property is another good option and does not use this environment variable.
3. In Search Console > Sitemaps, submit `https://saancha.in/sitemap.xml`.
4. In Google Analytics (https://analytics.google.com), create/select a GA4 web data stream and copy the measurement ID beginning `G-` to `PUBLIC_GA_MEASUREMENT_ID` in Vercel. Redeploy. If the site serves visitors where consent is legally required before analytics cookies, implement a proper consent manager before enabling the GA4 ID.
5. Check your domain has no broad `noindex` directives and that the production sitemap and robots are accessible. Request indexing for key pages through URL Inspection.
6. Add accurate, useful product descriptions and descriptive image alt text in the CMS. Product detail URLs are **not implemented** here, so products share indexed category/shop landing pages rather than individual product results.

## What is not guaranteed

Search placement depends on competitiveness, content quality, Google discovery, backlinks, site performance and other signals. Search Console verification and a sitemap help discovery but do not guarantee ranking. Do not submit admin, account or draft content for indexing.

## Local checks

- `npm ci` then `npm run build`
- Inspect `/robots.txt` and `/sitemap.xml` on a staging deployment.
- View page source for titles, description, canonical, robots, social tags and Google verification meta after configuration.
