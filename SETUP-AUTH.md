# Saancha — Phase 1: Login + Account (setup)

Yeh Astro site ab **hybrid** hai: marketing pages static, aur login/account SSR.
Auth + database = **Supabase**. Payment abhi nahi (Phase 2).

## Ek baar ka setup

### 1. Database banao
Supabase dashboard → **SQL Editor** → New query → `db/schema.sql` ka
poora content paste karo → **Run**.
Isse banega: `profiles` + `orders` tables, aur Row Level Security
(har customer sirf apna data dekhega).

### 2. Email confirmation (optional)
Supabase → **Authentication → Providers → Email**.
- Testing aasaan chahiye: "Confirm email" **OFF** → signup ke turant baad login.
- Zyada secure: ON rakho → customer ko email verify karna hoga.

### 3. Keys
`.env` file me keys already hain (yeh file GitHub pe NAHI jaati).
`.env.example` reference ke liye hai.

## Chalana (local)
```
npm install
npm run dev      # http://localhost:4321
```
Test: /signup → account bana → /account pe order history dikhega (abhi khaali).

## Deploy (Vercel)
Vercel ab SSR chalayega (adapter laga hai). GitHub push karo, Vercel auto-build.
**ZAROORI:** Vercel → Project → Settings → Environment Variables me yeh do daalo
(warna live site pe auth fail hoga):
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
(values `.env` se copy karo)

## Orders kaise aayenge (abhi)
Phase 1 me admin manually order daalega. Test ke liye Supabase → Table Editor
→ orders → Insert row:
- user_id  = customer ki id (Authentication → Users me milegi)
- order_no = SA-1001
- item, material, quantity, amount, status (pending/in-production/shipped/delivered)

Customer login karke apne orders /account pe dekhega.

## Phase 2 (baad me)
Online order + Razorpay payment. Yeh isi ke upar add hoga.

## Pages
- /login  /signup  /logout  /account   ← naye (SSR)
- baaki sab static (home, candles, soap, concrete, resin)
