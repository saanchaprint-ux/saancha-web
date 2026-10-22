// Admin-only image upload for the blog editor. Returns a public URL.
import { isAdmin, supabaseAdmin } from '../../lib/admin.js';
import { compressImage } from '../../lib/imgcompress.js';

export const prerender = false;

export async function POST({ request, cookies }) {
  if (!isAdmin(cookies)) return new Response(JSON.stringify({ error:'unauthorized' }), { status:401 });
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!file || !file.size) return new Response(JSON.stringify({ error:'no file' }), { status:400 });
    const sb = supabaseAdmin();
    const { buffer, contentType, ext } = await compressImage(file, { maxWidth:1600, quality:80 });
    const path = `blog-body-${Date.now()}.${ext}`;
    const { error } = await sb.storage.from('site-images').upload(path, buffer, { contentType, upsert:true });
    if (error) return new Response(JSON.stringify({ error:error.message }), { status:500 });
    const url = sb.storage.from('site-images').getPublicUrl(path).data.publicUrl;
    return new Response(JSON.stringify({ url }), { status:200, headers:{'Content-Type':'application/json'} });
  } catch(e) {
    return new Response(JSON.stringify({ error:String(e) }), { status:500 });
  }
}
