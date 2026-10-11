-- Run once AFTER cms-upgrade.sql in Supabase SQL editor.
create table if not exists public.cms_visual_edits (
 page text not null, selector text not null, property text not null check(property in ('text','src','href')),
 draft_value text, published_value text, updated_at timestamptz not null default now(),
 primary key(page,selector,property)
);
create index if not exists cms_visual_edits_page_idx on public.cms_visual_edits(page);
alter table public.cms_visual_edits enable row level security;
-- No anonymous read policy; website reads from server-side service role only.
