# Saancha Studio Visual Editor - implementation notes

## Changes in this ZIP

- `/admin/studio`: displays the **actual frontend** inside a desktop/tablet/mobile iframe and permits selection of text, images and link destinations.
- Click the element in the preview, edit its value in the left sidebar, and choose **Save draft & preview**.
- **Publish page** makes that page's saved text/image/link updates visible publicly. **Discard drafts** discards unpublished edits.
- `/shop`: automatically queries all products whose `status` is `published`, with category filters and SKU, price, stock and WhatsApp inquiry details.
- Published products also appear in existing `/candles`, `/soap`, `/concrete`, and `/resin` categories through the previously implemented CMS integration.
- Shop links added to the existing navigation. The pre-existing public design components and CSS were retained.

## Required setup

1. Back up Supabase and existing website and deploy to a staging domain before live deployment.
2. Run `db/cms-upgrade.sql` (if not run previously), then **`db/visual-studio.sql`** in the Supabase SQL editor.
3. Keep existing `.env` configuration including `ADMIN_PASSWORD`, `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE`; strongly recommend a separate `ADMIN_SESSION_SECRET`.
4. Deploy to Vercel with Node 22.19+ and dependencies installed via `npm ci`.
5. Login at `/admin/login`, navigate to `/admin/studio`, select Home or Shop, click an element, save a draft, preview, and publish.
6. Add a product using `/admin/products`, set `status` to **published**, and verify `/shop` and the product's material category.

## Scope and limitations

This iteration provides real-website in-frame click-to-edit for **text, image URLs, and link destinations**. It is NOT a feature-complete Elementor/WordPress page builder. It does not yet support inline rich text, drag-and-drop layout editing, image-picker integration, styling controls, block templates, page-level component creation, multi-user roles, responsive overrides, or a rich revision/rollback interface. Existing advanced section forms remain available under `/admin/blocks`.

Visual edits are stored by CSS selectors identifying elements in the current DOM. These selectors can become stale if site structure is later changed in source code or if dynamic content reorders. Edits apply client-side; SSR source HTML and OG/SEO metadata are not modified. For production-grade CMS, migrate to stable component IDs and server-rendered structured content rather than selector overrides.

A production build or deployed UI smoke test could not be completed in this environment because project dependencies were not installed and `npm ci` did not complete. JavaScript syntax checks passed. Validate staging before using on a production domain.
