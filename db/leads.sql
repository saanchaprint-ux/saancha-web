-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Leads (WhatsApp click capture / mini CRM)
--  Supabase → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  page text,          -- kaunse page se (e.g. /shop, /custom-moulds)
  button text,        -- kaunsa button (e.g. "nav", "hero", "product: Ribbed Pillar")
  intent text,        -- WhatsApp message text jo pre-filled tha
  referrer text,      -- kahan se aaya (google, direct, etc)
  device text,        -- mobile / desktop
  created_at timestamptz default now()
);

alter table public.leads enable row level security;
-- koi bhi visitor insert kar sake (anon) — par read sirf admin (service_role)
drop policy if exists "leads insert anyone" on public.leads;
create policy "leads insert anyone" on public.leads for insert with check (true);
-- no select policy = public padh nahi sakta; admin service_role RLS bypass karta hai

create index if not exists leads_time on public.leads(created_at desc);
