-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Phase C: customer addresses (profile already exists)
--  Supabase → SQL Editor → paste → Run
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  label text,                 -- Home / Work
  line1 text not null,
  line2 text,
  city text,
  state text,
  pincode text,
  phone text,
  is_default boolean default false,
  created_at timestamptz default now()
);

alter table public.addresses enable row level security;
-- customer apne hi addresses manage kare
drop policy if exists "addr own all" on public.addresses;
create policy "addr own all" on public.addresses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
