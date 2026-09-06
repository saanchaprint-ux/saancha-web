# Saancha — website (Astro)

Casting molds website. Built with **Astro** — ek modern, fast, SEO-friendly framework.
Nav aur footer EK jagah likhe hain, saare pages pe apne aap aate hain.

---

## Jaldi shuru (developer ke liye)

```bash
npm install          # ek baar
npm run dev          # local preview → http://localhost:4321
npm run build        # final site banaye (dist/ folder me)
```

Deploy: `dist/` folder Netlify ya Vercel pe drag-drop karo. Ya repo connect karo,
build command `npm run build`, publish directory `dist`. Free.

---

## Sabse zaroori: kya kahan edit hota hai

### Nav / Footer / Phone / WhatsApp — EK jagah
`src/data/site.js`
- `phone`, `whatsapp`, `city`, `domain` — yahan badlo
- `nav[]` — top menu links
- `materials[]` — dropdown + kaunse material pages banenge

Ek bhi cheez badlo → SAARE pages pe apne aap change ho jaati hai.

### Material pages ka content (Candles / Soap / Concrete / Resin)
`src/data/materials-content.js`
- Har material ka hero text, "why" section, ready-made products, **prices**, FAQ
- Product ka daam badalna? `price: "₹1,200"` edit karo
- Naya ready-made product? `products[]` me ek object add karo
- Naya material page? `site.js` ke `materials[]` me slug add karo + yahan uska content

### Home page
`src/pages/index.astro` — sections yahin hain (hero, materials, tiers, FAQ, contact)

### Design / colours / fonts
`src/styles/global.css` — `:root` me colours (amber accent, dark bg)

### Nav aur Footer ka structure
`src/components/Nav.astro` aur `src/components/Footer.astro`

---

## Images aur videos

Abhi sab **Higgsfield CDN** se aa rahe hain (AI-generated placeholder).
Yeh permanent nahi — asli photos aane pe replace karna.

**Apni files pe switch karna:**
1. Saari images `public/images/` me daalo, videos `public/videos/` me
2. `src/data/site.js` me `USE_LOCAL = true` kar do
3. `src/data/materials-content.js` me har `asset("local-name.png", ...)` ka
   pehla naam apni file ka naam kar do (ya wahi naam se save karo)
4. `npm run build`

**Filenames abhi:** `asset()` aur `video()` ke pehle argument me local naam likha hai
(jaise `"candle.png"`, `"candles-demold.mp4"`) — wahi naam se apni files rakhoge to
kuch aur edit nahi karna, bas `USE_LOCAL = true`.

---

## SEO (already set)

- Har page ka apna `<title>` + meta description (`materials-content.js` me `seoTitle`, `seoDesc`)
- Product + FAQ + Breadcrumb schema (Google rich results ke liye)
- `public/sitemap.xml` aur `public/robots.txt` — domain badlo to yahan bhi URL update karna
- `astro.config.mjs` me `site:` — apna domain daalo (SEO ke liye zaroori)
- Open Graph tags (WhatsApp/social pe link share karne pe preview)

Domain aane pe badlo:
- `astro.config.mjs` → `site`
- `src/data/site.js` → `domain`
- `public/sitemap.xml` + `public/robots.txt` → URLs

---

## Structure

```
src/
  data/site.js              ← settings (nav, phone, materials)
  data/materials-content.js ← material pages ka content + prices
  components/Nav.astro      ← shared nav (ek jagah)
  components/Footer.astro   ← shared footer (ek jagah)
  layouts/Base.astro        ← <head>, SEO, fonts, shared shell
  pages/index.astro         ← home
  pages/[material].astro    ← ek template → 4 material pages
  styles/global.css         ← design system
public/
  site.js                   ← animations (cursor, menu, scroll, video)
  images/  videos/          ← apni files yahan (USE_LOCAL ke saath)
  robots.txt  sitemap.xml
```

Copy commitments on the page: No minimum order, 5–7 day turnaround.
Ready-made = fixed price, Custom = quantity ke hisaab se.
