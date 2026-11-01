-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Product upgrade: dimensions, bulk pricing, 4 images
--  Supabase → SQL Editor → Run (safe if already added)
-- ═══════════════════════════════════════════════════════════════
alter table public.cms_products add column if not exists dimensions text;
alter table public.cms_products add column if not exists bulk_tiers jsonb default '[]'::jsonb;
alter table public.cms_products add column if not exists images jsonb default '[]'::jsonb;
-- bulk_tiers example: [{"qty":10,"price":850},{"qty":20,"price":800},{"qty":50,"price":720}]
-- images example: ["url1","url2","url3","url4"]
