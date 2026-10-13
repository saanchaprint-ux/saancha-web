export const prerender = true;
import { site, materials } from '../data/site.js';
const escapeXml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
export async function GET() {
  // Index only public canonical pages. The products currently live within /shop
  // and category pages; do not invent product detail permalinks that do not exist.
  const paths = ['/', '/shop', '/custom-moulds', ...materials.map(m => `/${m.slug}`)];
  const urls = [...new Set(paths)].map(path => {
    const loc = new URL(path, site.domain).href;
    return `  <url><loc>${escapeXml(loc)}</loc></url>`;
  }).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
