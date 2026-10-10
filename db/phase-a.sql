-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Phase A: site settings + testimonials
--  Supabase → SQL Editor → paste → Run
-- ═══════════════════════════════════════════════════════════════

-- 1) SITE SETTINGS — key/value, admin-editable (promo ticker etc.)
create table if not exists public.settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

alter table public.settings enable row level security;
-- sab padh sakte hain (public site ke liye); likhna sirf service_role (admin) karega
drop policy if exists "settings public read" on public.settings;
create policy "settings public read" on public.settings for select using (true);

-- default promo values
insert into public.settings (key, value) values
  ('promo_enabled', 'true'),
  ('promo_text', 'Custom Moulds Starting at ₹999'),
  ('promo_cta', 'Explore Custom Moulds'),
  ('promo_url', '/custom-moulds')
on conflict (key) do nothing;

-- 2) TESTIMONIALS — admin add/edit/publish
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,                 -- e.g. "Candle brand, Delhi"
  rating int default 5,      -- 1..5
  body text not null,
  image_url text,            -- optional photo
  published boolean default false,
  sort int default 0,
  created_at timestamptz default now()
);

alter table public.testimonials enable row level security;
-- sirf PUBLISHED testimonials sab dekh sakte hain
drop policy if exists "testimonials public read" on public.testimonials;
create policy "testimonials public read" on public.testimonials
  for select using (published = true);
-- add/edit/delete sirf service_role (admin) — koi aur policy nahi, toh RLS block karega
