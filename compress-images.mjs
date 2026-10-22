// Saancha — public/images aur public/videos compress.
// Chalao:  node compress-images.mjs   (sharp install hona chahiye)
import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join } from 'path';

const DIR = 'public/images';
const Q = 80, MAXW = 1600;

const files = await readdir(DIR).catch(()=>[]);
let saved = 0, done = 0;
for (const f of files) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  const src = join(DIR, f);
  const out = join(DIR, f.replace(/\.(png|jpe?g)$/i, '.webp'));
  try {
    const before = (await stat(src)).size;
    await sharp(src).rotate().resize({ width: MAXW, withoutEnlargement:true }).webp({ quality:Q }).toFile(out);
    const after = (await stat(out)).size;
    saved += (before - after); done++;
    console.log(`✓ ${f} → ${f.replace(/\.(png|jpe?g)$/i,'.webp')}  (${(before/1024|0)}KB → ${(after/1024|0)}KB)`);
  } catch(e) { console.log(`✗ ${f}: ${e.message}`); }
}
console.log(`\n${done} images → WebP. Saved ~${(saved/1024/1024).toFixed(1)} MB.`);
console.log('Purani .png files rakhi hain (fallback). Chaaho to hata do.');
