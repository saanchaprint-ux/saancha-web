-- Optional: add MRP (original price) to products for "Save X%" badges on shop.
-- Supabase → SQL Editor → Run. Safe if already added.
alter table public.cms_products add column if not exists mrp numeric;
