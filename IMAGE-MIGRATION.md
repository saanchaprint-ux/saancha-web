# Saancha — Images ab LOCAL (CDN se hata diya)

Code ab images/videos ko project ke `public/` folder se load karta hai, CDN se nahi.
Par pehle ek baar files **download** karni hain (yeh step tum karoge — CDN se).

## Steps (ek baar)

1. Project root me terminal kholo (jaha package.json hai)

2. Download script chalao:
   - **Mac/Linux:**  `bash download-cdn-assets.sh`
   - **Windows:**    `powershell -ExecutionPolicy Bypass -File download-cdn-assets.ps1`

   Yeh 20 files (images + videos) `public/images/` aur `public/videos/` me daal dega.

3. Confirm: `public/images/` me .png files aur `public/videos/` me .mp4 dikhne chahiye.

4. Push karo (neeche git commands).

## Agar koi image missing/broken dikhe
- Download script dobara chalao (internet zaroori)
- Ya woh ek file CDN se browser me khol ke manually `public/images/` me save karo (same filename)

## Baad me apni asli photos lagani ho
`public/images/` me usi filename se nayi photo replace kar do — code wahi path use karta rahega.

## Note
- Blog aur Shop product images **Supabase storage** se aati hain (CDN nahi) — woh pehle se theek hain, kuch nahi karna.
- Sirf homepage/material/custom/shop ke design images + videos local hui hain.
