// Server-side image compression (sharp). Har upload isse guzre → WebP + resized.
import sharp from 'sharp';

// returns { buffer, contentType, ext } — compressed WebP (ya original agar sharp fail/SVG)
export async function compressImage(file, { maxWidth = 1600, quality = 78, square = false } = {}) {
  const orig = new Uint8Array(await file.arrayBuffer());
  const type = file.type || '';
  // SVG / gif / already-small: skip (webp animation handled poorly, svg is vector)
  if (type.includes('svg') || type.includes('gif')) {
    return { buffer: orig, contentType: type || 'application/octet-stream', ext: (file.name.split('.').pop()||'bin').toLowerCase() };
  }
  try {
    let pipe = sharp(orig).rotate();            // honor EXIF orientation
    if (square) {
      // 1:1 center-crop to a clean square (product images)
      const side = Math.min(maxWidth, 1200);
      pipe = pipe.resize(side, side, { fit: 'cover', position: 'center' });
    } else {
      pipe = pipe.resize({ width: maxWidth, withoutEnlargement: true });
    }
    const out = await pipe.webp({ quality }).toBuffer();
    // agar compressed badi nikle (rare), original rakho
    if (out.length < orig.length) {
      return { buffer: new Uint8Array(out), contentType: 'image/webp', ext: 'webp' };
    }
  } catch (e) { /* fall through to original */ }
  return { buffer: orig, contentType: type || 'image/jpeg', ext: (file.name.split('.').pop()||'jpg').toLowerCase() };
}
