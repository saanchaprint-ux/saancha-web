# Saancha product catalog behaviour

- The existing four material/category cards remain unchanged.
- The homepage has a new **Latest moulds** section, rendering at most four published products, newest `created_at` first.
- `/shop` renders **all** published products in newest-first order, with existing category filters.
- Product cards share the same `ProductGrid.astro` component, preserving the black/amber storefront visual language.
- Products in `draft` or `archived` status never render in these public lists.
- Publish a product in `/admin/products`; refresh the homepage or shop to see it. No rebuild is required when deployed in SSR mode.
- Empty-state and database-error messages are distinct.
- Existing Supabase `cms_products` migration must have been applied, and server-side Supabase environment variables must be configured.

**Important:** "latest" means the newest *created* among currently published products, not the timestamp when an older draft was published. This requires no database migration and is consistent for all existing products.
