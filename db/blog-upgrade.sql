-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Blog upgrade: category + read time
--  Supabase → SQL Editor → Run (safe if already added)
-- ═══════════════════════════════════════════════════════════════
alter table public.blog_posts add column if not exists category text default 'Guides';
alter table public.blog_posts add column if not exists read_min int;
