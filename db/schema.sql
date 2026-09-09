-- ═══════════════════════════════════════════════════════════════
--  SAANCHA — Phase 1 database schema
--  Supabase → SQL Editor me yeh poora paste karke "Run" karo.
--  RLS (Row Level Security) ON hai — har customer sirf apna data dekhta hai.
-- ═══════════════════════════════════════════════════════════════

-- 1) PROFILES — har signup pe auto-ban-ta hai (auth.users se juda)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  brand text,
  phone text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- customer sirf apna profile dekhe/badle
create policy "own profile read"   on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);

-- signup pe profile auto-create karne ka trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) ORDERS — abhi admin manually daalega; Phase 2 me auto banenge
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  order_no text,                    -- jaise "SA-1042"
  item text,                        -- "Ribbed Pillar candle mold"
  material text,                    -- candles / soap / concrete / resin
  quantity int default 1,
  amount numeric,                   -- INR
  status text default 'pending',    -- pending / in-production / shipped / delivered
  notes text,
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

-- customer sirf apne orders dekhe (insert/update abhi admin server-side karega)
create policy "own orders read" on public.orders for select using (auth.uid() = user_id);
