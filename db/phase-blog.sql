-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Blog system (SEO)
--  Supabase → SQL Editor → paste → Run
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover_url text,
  body text,                      -- markdown/plain with paragraphs
  author text default 'Saancha',
  published boolean default false,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table public.blog_posts enable row level security;
drop policy if exists "blog public read" on public.blog_posts;
create policy "blog public read" on public.blog_posts
  for select using (published = true);
-- add/edit/delete sirf service_role (admin)

create index if not exists blog_pub_idx on public.blog_posts(published, published_at desc);
