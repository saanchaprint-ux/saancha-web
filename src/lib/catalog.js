import { supabaseAdmin } from './admin.js';

// Storefront products — published only, newest first.
// mrp is optional: if the column doesn't exist yet, we retry without it so the shop never breaks.
const BASE = 'id,name,slug,description,image_url,category,base_sku,price,stock,created_at';

export async function publishedProducts(limit) {
  const run = async (fields) => {
    let q = supabaseAdmin().from('cms_products')
      .select(fields)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .order('id', { ascending: false });
    if (Number.isInteger(limit) && limit > 0) q = q.limit(limit);
    return q;
  };
  try {
    // try with mrp first
    let { data, error } = await run(BASE + ',mrp');
    if (error) {
      // likely mrp column missing — retry without it
      ({ data, error } = await run(BASE));
      if (error) throw error;
    }
    return { products: data || [], error: false };
  } catch (error) {
    console.error('[catalog] Unable to load published products:', error);
    return { products: [], error: true };
  }
}
