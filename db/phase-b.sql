-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Phase B: pricing rules + custom quote requests
--  Supabase → SQL Editor → paste → Run
-- ═══════════════════════════════════════════════════════════════

-- 1) PRICING RULES — single row of JSON, admin-editable.
--    Calculator yahi se base prices/multipliers leta hai.
create table if not exists public.pricing (
  id int primary key default 1,
  rules jsonb not null,
  updated_at timestamptz default now(),
  constraint one_row check (id = 1)
);

alter table public.pricing enable row level security;
drop policy if exists "pricing public read" on public.pricing;
create policy "pricing public read" on public.pricing for select using (true);
-- writes sirf service_role (admin)

-- default placeholder rules (admin baad me badlega)
insert into public.pricing (id, rules) values (1, '{
  "currency": "₹",
  "designBase":  { "simple": 500, "detailed": 1200 },
  "logoCharge":  400,
  "base":        { "candle": 800, "soap": 700, "resin": 900, "concrete": 1000, "edible": 750 },
  "sizeMult":    { "2": 1.0, "3": 1.3, "4": 1.6, "5": 2.0 },
  "qtyTiers":    [ {"min":1,"mult":1.0}, {"min":5,"mult":0.92}, {"min":10,"mult":0.85} ],
  "note": "Placeholder. designBase+logo = one-time design cost. base*sizeMult = per-mould. qty applies only to mould cost."
}'::jsonb)
on conflict (id) do nothing;

-- 2) CUSTOM QUOTE REQUESTS — form submissions (logged-in ya guest)
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,  -- null if guest
  name text,
  email text,
  phone text,
  product text,          -- candle/soap/...
  size text,
  complexity text,
  logo boolean default false,
  quantity text,
  dimensions text,       -- custom size notes
  details text,
  estimate text,         -- calculator ka estimate snapshot (text)
  status text default 'submitted',  -- submitted/under-review/quote-ready/approved/in-production/completed
  created_at timestamptz default now()
);

alter table public.quote_requests enable row level security;
-- koi bhi (guest bhi) quote bhej sakta hai
drop policy if exists "quote insert anyone" on public.quote_requests;
create policy "quote insert anyone" on public.quote_requests for insert with check (true);
-- logged-in user apne requests dekhe
drop policy if exists "quote own read" on public.quote_requests;
create policy "quote own read" on public.quote_requests for select using (auth.uid() = user_id);
-- admin (service_role) sab dekhe/update kare — RLS bypass
