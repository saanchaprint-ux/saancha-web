// Supabase client — browser aur server dono ke liye.
import { createClient } from '@supabase/supabase-js';

const url  = import.meta.env.PUBLIC_SUPABASE_URL;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Server-side client that reads/writes the auth cookie (for SSR pages).
export function supabaseServer(cookies) {
  return createClient(url, anon, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        // pass the user's access token if present
        Authorization: cookies.get('sb-access-token')?.value
          ? `Bearer ${cookies.get('sb-access-token').value}` : '',
      },
    },
  });
}

// Get the logged-in user on the server (or null).
export async function getUser(cookies) {
  const token = cookies.get('sb-access-token')?.value;
  if (!token) return null;
  const sb = createClient(url, anon);
  const { data, error } = await sb.auth.getUser(token);
  if (error) return null;
  return data.user;
}

export { url as SUPABASE_URL, anon as SUPABASE_ANON };
