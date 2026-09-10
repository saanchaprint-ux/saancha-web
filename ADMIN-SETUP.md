# Saancha — Admin Panel setup

Admin ka apna alag secret login hai (customer login se poori tarah alag).

## URLs
- `/admin/login`  — admin login (secret password)
- `/admin`        — dashboard: orders add karo, status update karo

## Do env variables chahiye (secret — GitHub pe NAHI jaate)

### 1. ADMIN_PASSWORD
Ek strong secret password. Yehi admin login pe daalna hoga.
Jaise: `Saancha@Admin2026` (isko badal ke apna strong rakho)

### 2. SUPABASE_SERVICE_ROLE
Yeh powerful key hai (RLS bypass karti hai — saare customers ke orders
manage karne ke liye zaroori). Kahan se:
- Supabase → Settings → API → **service_role** key (secret wali)
- ⚠️ Yeh key KABHI browser/GitHub/kisi ko mat do. Sirf server env me.

## Vercel me daalo (zaroori)
Vercel → saancha-web → Settings → Environment Variables → add:
- `ADMIN_PASSWORD` = tumhara secret password
- `SUPABASE_SERVICE_ROLE` = service_role key
Phir Deployments → Redeploy.

## Local me (.env file)
`.env` me already placeholder hain — real values daal do:
```
ADMIN_PASSWORD=...
SUPABASE_SERVICE_ROLE=...
```

## Use kaise karo
1. `/admin/login` → password daalo
2. Dashboard pe "Add an order":
   - Customer dropdown se chuno (jo signup kar chuke)
   - Order no, item, material, qty, amount, status bharo → Add
3. Customer login karke apne /account pe woh order dekhega
4. Order ka status badalna? "Recent orders" me dropdown se change → auto save

## Security notes
- Admin password strong rakho, kisi ke saath share mat karo
- service_role key sirf Vercel env me (browser me kabhi nahi)
- Session 8 ghante baad expire (dobara login)
