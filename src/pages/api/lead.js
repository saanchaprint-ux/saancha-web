// Capture a WhatsApp-click lead. Public insert (anon), fire-and-forget.
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export async function POST({ request }) {
  try {
    const body = await request.json().catch(()=> ({}));
    const sb = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      { auth:{ persistSession:false }, realtime:{ params:{ eventsPerSecond:0 } } }
    );
    await sb.from('leads').insert({
      page: (body.page||'').slice(0,200),
      button: (body.button||'').slice(0,120),
      intent: (body.intent||'').slice(0,300),
      referrer: (body.referrer||'').slice(0,200),
      device: (body.device||'').slice(0,20),
    });
    return new Response(JSON.stringify({ ok:true }), { status:200 });
  } catch(e) {
    return new Response(JSON.stringify({ ok:false }), { status:200 }); // never block user
  }
}
