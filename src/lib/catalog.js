import { supabaseAdmin } from './admin.js';

// All storefront product collections use the same published-only, server-side source.
// Newest = publication timestamp when available, otherwise the original creation date.
export async function publishedProducts(limit) {
  try {
    let query = supabaseAdmin().from('cms_products')
      .select('id,name,slug,description,image_url,category,base_sku,price,stock,created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .order('id', { ascending: false });
    if (Number.isInteger(limit) && limit > 0) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return { products: data || [], error: false };
  } catch (error) {
    console.error('[catalog] Unable to load published products:', error);
    return { products: [], error: true };
  }
}
