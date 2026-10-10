-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Phase D: editable site content (CMS in own admin)
--  Supabase → SQL Editor → paste → Run
-- ═══════════════════════════════════════════════════════════════

-- 1) CONTENT — key/value, admin-editable text + image URLs
create table if not exists public.content (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

alter table public.content enable row level security;
drop policy if exists "content public read" on public.content;
create policy "content public read" on public.content for select using (true);
-- writes sirf service_role (admin)

-- default content (abhi site pe jo text hai, wahi — admin baad me badlega)
insert into public.content (key, value) values
  ('home_kicker', 'Saancha · Casting Molds · Delhi'),
  ('home_hero_title_1', 'Turning concepts'),
  ('home_hero_title_2', 'into <span class="serif-it">reality.</span>'),
  ('home_hero_lede', 'We design and manufacture casting molds — candles, soap, resin, concrete. Order one, not five hundred. Made in Delhi, around your product, in a week.'),
  ('home_stat_customers', '250'),
  ('home_statement', 'Anyone can print plastic. We design the negative space — the exact hollow your product is born from — and cut it so precisely that every single casting comes out identical.'),
  ('home_materials_lede', 'Tell us what you''re pouring — we pick the material. Each range has its own ready-made molds, or we build custom around your product.'),
  ('home_hero_image', ''),
  ('contact_response', 'Usually the same day'),
  ('candles_hero', 'Candle molds, cast to your shape.'),
  ('candles_lede', 'Ready-made silicone candle molds at fixed prices, or a custom mold built around your own design. Wax releases clean, every rib intact — pull after pull.'),
  ('soap_hero', 'Soap molds with crisp edges.'),
  ('soap_lede', 'Ready-made soap and bath molds at fixed prices, or custom molds built around your bar. Sharp facets that stay defined through curing and clean release.'),
  ('concrete_hero', 'Concrete molds, built for depth.'),
  ('concrete_lede', 'Ready-made concrete molds at fixed prices, or custom on request. Two-part silicone that survives rough mixes and releases a clean, smooth face.'),
  ('resin_hero', 'Resin molds, detail you see through.'),
  ('resin_lede', 'Ready-made resin molds at fixed prices, or a custom mold around your piece. Glass-smooth surfaces and razor facets that read perfectly through clear resin.')
on conflict (key) do nothing;

-- 2) STORAGE bucket for admin-uploaded images
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- public read for the bucket
drop policy if exists "site-images public read" on storage.objects;
create policy "site-images public read" on storage.objects
  for select using (bucket_id = 'site-images');
-- uploads sirf service_role (admin) karega — koi aur insert policy nahi
