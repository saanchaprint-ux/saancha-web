// Keep-alive: Supabase ko ek light query bhejta hai taaki free-tier project pause na ho.
// GitHub Actions cron isse roz hit karta hai.
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export async function GET() {
  try {
    const sb = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      { auth:{ persistSession:false }, realtime:{ params:{ eventsPerSecond:0 } } }
    );
    // light query — settings table ko touch karo (chhota, fast)
    await sb.from('settings').select('key').limit(1);
    return new Response(JSON.stringify({ ok:true, t:Date.now() }), {
      status:200, headers:{'Content-Type':'application/json'}
    });
  } catch(e) {
    return new Response(JSON.stringify({ ok:false }), { status:200 });
  }
}
