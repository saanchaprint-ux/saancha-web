# Saancha Studio - CMS Upgrade

## What has been implemented
- Server-side product CRUD with category, SKU, price, stock, publishing status, and variants.
- Public category listings show published CMS products in the original card design when present; otherwise original product cards remain unchanged.
- Admin media library backed by the existing `site-images` Supabase Storage bucket.
- Structured navigation/global settings editor (stored server-side; nav rendering integration remains future work).
- Existing section editor now supports editing text and image URL, while retaining the original rendered style.
- Existing site content keys and hero poster remain editable. Stale process-wide content caching removed.
- Existing weak password-derived admin cookie replaced with HMAC-signed expiring session, with a mandatory session secret.
- Product, setting and block snapshots stored before edits for audit/recovery; revision browsing/revert UI is not yet built.

## Deployment checklist
1. Back up your current Supabase database and storage; keep original deployment for rollback.
2. Run original SQL files if not previously run, then execute `db/cms-upgrade.sql` in your Supabase SQL editor.
3. Ensure existing public bucket `site-images` exists, and configure Supabase URL, anon key and SERVICE ROLE only on the server.
4. Set `ADMIN_PASSWORD` and a long unique random `ADMIN_SESSION_SECRET` in your hosting environment, and locally in `.env`. Old admin sessions automatically stop working.
5. Run `npm ci`, `npm run build`, and preview on staging. Test order, customer account and quotation workflows.
6. Sign in at `/admin/login`, then visit `/admin/products`, `/admin/media`, `/admin/settings`, `/admin/blocks`.
7. Create a **draft** product; add variants after the initial save, then publish it. Category page uses CMS products once at least one published CMS item exists in that category.

## Limitations / not yet complete
This is **not** yet a full WordPress/Elementor-quality drag-and-drop visual CMS. Many hardcoded headings and asset URLs in existing Astro components are still not exposed as individual editor controls. Homepage layout customization, drag/drop, drafts on all blocks, reusable templates, complete revision restore UI, editing navigation rendered on frontend, media crop/focal controls, product checkout and inventory concurrency still require further engineering. Public storefront intentionally falls back to existing hardcoded listings to protect current presentation. Do not consider this migration production-ready without live database tests and full acceptance testing. Admin forms should also have CSRF protections before production use.
