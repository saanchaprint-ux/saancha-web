// Admin auth — ek secret password (env var), customer login se poori tarah alag.
import { createClient } from '@supabase/supabase-js';

// Admin session cookie ka naam (customer ke 'sb-auth' se alag)
const ADMIN_COOKIE = 'saancha-admin';

// Simple signed token: hash of the password + a fixed salt. Cookie me yeh store hota hai.
function tokenFor(pwd) {
  // lightweight hash (not for passwords in DB — sirf cookie match ke liye)
  let h = 0; const s = pwd + '::saancha-admin-v1';
  for (let i=0;i<s.length;i++){ h = (h*31 + s.charCodeAt(i)) | 0; }
  return 'a' + (h >>> 0).toString(36);
}

export function adminPassword() {
  return import.meta.env.ADMIN_PASSWORD || '';
}

export function isAdmin(cookies) {
  const pwd = adminPassword();
  if (!pwd) return false;
  return cookies.get(ADMIN_COOKIE)?.value === tokenFor(pwd);
}

export function setAdminCookie(cookies) {
  cookies.set(ADMIN_COOKIE, tokenFor(adminPassword()), {
    path:'/', httpOnly:true, sameSite:'lax', secure:true, maxAge:60*60*8, // 8 hours
  });
}
export function clearAdminCookie(cookies) {
  cookies.delete(ADMIN_COOKIE, { path:'/' });
}

// Service-role client — RLS bypass, SIRF server pe. Never expose this key to browser.
export function supabaseAdmin() {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE,   // server-only env var
    { auth:{ persistSession:false, autoRefreshToken:false }, realtime:{ params:{ eventsPerSecond:0 } } }
  );
}
