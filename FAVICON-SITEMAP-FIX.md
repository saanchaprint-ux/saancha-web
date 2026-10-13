# Saancha favicon and sitemap fix

- The `/sitemap.xml` file is now directly served from `public/sitemap.xml`. It does not depend on Supabase, a serverless function, or the Astro sitemap route.
- All seven known public pages use the `https://www.saancha.in` canonical origin. Dynamic products should only be added to the sitemap once actual indexable product-detail URLs exist.
- The site's canonical-domain code and robots.txt already use the www version.
- Logo-derived favicon files are in `public/`. A dark favicon background improves contrast of the Saancha orange emblem; the full original uploaded logo is kept as `public/saancha-logo-original.png`.

## Deploy and verify
1. Upload/deploy the entire project to Vercel. Check `https://www.saancha.in/sitemap.xml` in an incognito window.
2. Check that the response is HTTP 200 (not only visible XML) and `Content-Type` contains XML. Use `curl -I https://www.saancha.in/sitemap.xml` locally; confirm no redirects/challenges for the final www URL.
3. Verify `https://www.saancha.in/favicon.ico`, `/favicon-48.png`, and `/robots.txt` are HTTP 200.
4. In Search Console, keep the `www` sitemap submission. After deployment, retry or resubmit if it remains unreadable. If it still fails, obtain HTTP status and response headers for Googlebot and check Vercel Firewall/Bot Protection logs. A browser opening XML doesn't prove Googlebot can fetch it.
5. Inspect the indexed `https://www.saancha.in/` home page and allow Google time to recrawl the favicon. Search-result icon appearance is at Google's discretion.

## Verification caveat
Archive, XML, and source checks passed locally. This environment has not performed a full Astro build or independently verified Google's crawl request.
