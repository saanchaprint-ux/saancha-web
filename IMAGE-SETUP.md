# Saancha — Images: local + compressed (WebP)

Images ab project me local hain aur WebP (chhoti, tez) me serve hoti hain.
Nayi uploads (blog/product/sections) admin se **apne aap compress** ho jaati hain.

## Ek baar ka setup (existing images ke liye)

1. Pehle CDN se images download karo (agar nahi ki):
   - Windows: `powershell -ExecutionPolicy Bypass -File download-cdn-assets.ps1`
   Yeh `public/images/` me .png daalega.

2. **Compress** karo (PNG → WebP):
   ```
   npm install          (ek baar, sharp aa jayega)
   node compress-images.mjs
   ```
   Yeh har .png ka .webp bana dega (60-80% chhoti). Code .webp use karta hai.

3. Push karo.

## Nayi images (aage)
- Admin se jo bhi image upload karoge (blog cover, product, section, editor)
  woh **apne aap WebP + resized** ho jaayegi. Kuch nahi karna.

## Note
- Purani .png files `public/images/` me rehne do (fallback). Chaaho to hata do — code .webp maangta hai.
- Videos (.mp4) compress nahi hote (woh pehle se theek hain).
