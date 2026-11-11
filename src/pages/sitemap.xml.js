// Dynamic sitemap — static pages + all published products + blog posts (from DB).
import { supabaseAuth } from '../lib/supabase.js';
import { site } from '../data/site.js';

export const prerender = false;

const SITE = 'https://www.saancha.in';

export async function GET() {
  const urls = [
    { loc: `${SITE}/`, pri: '1.0', freq: 'weekly' },
    { loc: `${SITE}/shop`, pri: '0.9', freq: 'weekly' },
    { loc: `${SITE}/custom-moulds`, pri: '0.9', freq: 'monthly' },
    { loc: `${SITE}/blog`, pri: '0.7', freq: 'weekly' },
    { loc: `${SITE}/candles`, pri: '0.8', freq: 'monthly' },
    { loc: `${SITE}/soap`, pri: '0.8', freq: 'monthly' },
    { loc: `${SITE}/concrete`, pri: '0.8', freq: 'monthly' },
    { loc: `${SITE}/resin`, pri: '0.8', freq: 'monthly' },
  ];

  try {
    const sb = supabaseAuth();
    // products
    const { data: products } = await sb.from('cms_products')
      .select('slug,updated_at').eq('status','published');
    (products||[]).forEach(p => urls.push({
      loc: `${SITE}/product/${p.slug}`, pri: '0.7', freq: 'weekly',
      lastmod: p.updated_at ? new Date(p.updated_at).toISOString().slice(0,10) : undefined
    }));
    // blog posts
    const { data: posts } = await sb.from('blog_posts')
      .select('slug,published_at').eq('published', true);
    (posts||[]).forEach(b => urls.push({
      loc: `${SITE}/blog/${b.slug}`, pri: '0.6', freq: 'monthly',
      lastmod: b.published_at ? new Date(b.published_at).toISOString().slice(0,10) : undefined
    }));
  } catch(e) { console.error('[sitemap] DB load failed:', e?.message || e); }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url><loc>${u.loc}</loc>${u.lastmod?`<lastmod>${u.lastmod}</lastmod>`:''}<changefreq>${u.freq}</changefreq><priority>${u.pri}</priority></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'no-cache, no-store, must-revalidate' }
  });
}
