-- SAANCHA CMS upgrade: execute once in Supabase SQL editor, after original schema migrations.
create table if not exists public.cms_products (
 id uuid primary key default gen_random_uuid(), slug text not null unique, name text not null,
 category text not null check(category in ('candles','soap','concrete','resin')),
 description text not null default '', image_url text not null default '',
 base_sku text not null unique, price numeric(12,2) not null default 0 check(price>=0),
 compare_at_price numeric(12,2), stock integer not null default 0 check(stock>=0),
 status text not null default 'draft' check(status in ('draft','published','archived')),
 sort integer not null default 100, created_at timestamptz not null default now(),
 updated_at timestamptz not null default now());
create table if not exists public.cms_product_variants (
 id uuid primary key default gen_random_uuid(), product_id uuid not null references public.cms_products(id) on delete cascade,
 sku text not null unique, label text not null, price numeric(12,2) not null check(price>=0),
 stock integer not null default 0 check(stock>=0), options jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now());
create table if not exists public.cms_media (
 id uuid primary key default gen_random_uuid(), path text not null unique,
 url text not null, alt_text text not null default '', created_at timestamptz not null default now());
create table if not exists public.cms_settings (
 key text primary key, value jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now());
create table if not exists public.cms_revisions (
 id uuid primary key default gen_random_uuid(), entity text not null, entity_id text not null,
 snapshot jsonb not null, created_at timestamptz not null default now());
create index if not exists cms_products_category on public.cms_products(category,sort);
create index if not exists cms_variants_product on public.cms_product_variants(product_id);
create index if not exists cms_revisions_entity on public.cms_revisions(entity,entity_id,created_at desc);
alter table public.cms_products enable row level security;
alter table public.cms_product_variants enable row level security;
alter table public.cms_media enable row level security;
alter table public.cms_settings enable row level security;
alter table public.cms_revisions enable row level security;
drop policy if exists "published products read" on public.cms_products;
create policy "published products read" on public.cms_products for select using(status='published');
drop policy if exists "published variants read" on public.cms_product_variants;
create policy "published variants read" on public.cms_product_variants for select using(exists(select 1 from public.cms_products p where p.id=product_id and p.status='published'));
drop policy if exists "public settings read" on public.cms_settings;
create policy "public settings read" on public.cms_settings for select using (key in ('navigation','global'));
-- No browser-write policies: only authenticated server-side service_role can mutate CMS records.
-- Existing original blocks/content schema remains unmodified.
