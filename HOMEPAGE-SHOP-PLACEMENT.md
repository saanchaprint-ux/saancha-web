# Homepage placement fix

- The *existing* four-card section at `/#materials` now shows the four newest published CMS products in precisely the same `.mats > .mat` design as the original cards.
- The separate `Latest moulds` section that was introduced below has been removed.
- Full product catalog remains at `/shop` (Shop Moulds), with all published products.
- If no published products are available, the original category cards are retained as a fallback; if product retrieval fails, a notice appears.
- Product cards display their image, name, description, SKU and price. They link to the corresponding Shop Moulds category.
- No schema change required.

Run `npm install && npm run build` after extraction, and test using a published product in your staging Supabase configuration.
