import { supabaseAdmin } from '../lib/admin.js';
import { site } from '../data/site.js';

export const prerender = false;

const SITE = site.domain.replace(/\/+$/, '');
const PAGE_SIZE = 1000;
const escapeXml = (value) => String(value).replace(/[<>&'"]/g, (char) => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
})[char]);
const lastmod = (value) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString().slice(0, 10);
};

async function fetchAllPages(queryForPage, label) {
  const rows = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await queryForPage().range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`${label} query failed: ${error.message}`);
    rows.push(...(data || []));
    if (!data || data.length < PAGE_SIZE) return rows;
  }
}

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
    const sb = supabaseAdmin();
    const [products, posts] = await Promise.all([
      fetchAllPages(
        () => sb.from('cms_products').select('slug,updated_at').eq('status', 'published'),
        'Published products',
      ),
      fetchAllPages(
        () => sb.from('blog_posts').select('slug,published_at').eq('published', true),
        'Published blog posts',
      ),
    ]);

    products.forEach((product) => {
      if (!product.slug) return;
      urls.push({
        loc: `${SITE}/product/${encodeURIComponent(product.slug)}`,
        pri: '0.7',
        freq: 'weekly',
        lastmod: lastmod(product.updated_at),
      });
    });
    posts.forEach((post) => {
      if (!post.slug) return;
      urls.push({
        loc: `${SITE}/blog/${encodeURIComponent(post.slug)}`,
        pri: '0.6',
        freq: 'monthly',
        lastmod: lastmod(post.published_at),
      });
    });
  } catch (error) {
    console.error('[sitemap] Failed to load published content:', error);
    return new Response('Sitemap temporarily unavailable', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${escapeXml(url.loc)}</loc>${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}<changefreq>${url.freq}</changefreq><priority>${url.pri}</priority></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'no-cache, no-store, must-revalidate' }
  });
}
