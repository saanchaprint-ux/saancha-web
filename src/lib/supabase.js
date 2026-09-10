// Supabase — auth-only client (realtime/websocket OFF, kyunki server pe nahi chahiye).
import { createClient } from '@supabase/supabase-js';

const url  = import.meta.env.PUBLIC_SUPABASE_URL;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Common options: no realtime, no session persistence on server.
const opts = {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  realtime: { params: { eventsPerSecond: 0 } },
  global: {},
};

// Plain auth client (login / signup).
export function supabaseAuth() {
  return createClient(url, anon, opts);
}

// Server client that reads the logged-in user's token (for RLS-protected queries).
export function supabaseServer(cookies) {
  const token = cookies.get('sb-access-token')?.value;
  return createClient(url, anon, {
    ...opts,
    global: { headers: token ? { Authorization: `Bearer ${token}` } : {} },
  });
}

// Get the logged-in user on the server (or null).
export async function getUser(cookies) {
  const token = cookies.get('sb-access-token')?.value;
  if (!token) return null;
  const sb = createClient(url, anon, opts);
  const { data, error } = await sb.auth.getUser(token);
  if (error) return null;
  return data.user;
}
