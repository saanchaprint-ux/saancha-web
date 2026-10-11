-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Block/section system (flexible content zones)
--  Supabase → SQL Editor → paste → Run
--  Existing pages/design untouched — blocks ek extra zone me aate hain.
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.blocks (
  id uuid primary key default gen_random_uuid(),
  page text not null,            -- 'home' | 'candles' | 'soap' | 'concrete' | 'resin' | 'custom-moulds'
  type text not null,            -- heading | imagetext | banner | gallery | cta | steps
  sort int default 0,            -- order on the page (low = top)
  data jsonb not null default '{}'::jsonb,  -- block content
  published boolean default true,
  created_at timestamptz default now()
);

alter table public.blocks enable row level security;
drop policy if exists "blocks public read" on public.blocks;
create policy "blocks public read" on public.blocks
  for select using (published = true);
-- add/edit/delete sirf service_role (admin)

create index if not exists blocks_page_sort on public.blocks(page, sort);
