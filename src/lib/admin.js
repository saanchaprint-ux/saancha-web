// Admin auth — ek secret password (env var), customer login se poori tarah alag.
import { createClient } from '@supabase/supabase-js';

// Admin session cookie ka naam (customer ke 'sb-auth' se alag)
const ADMIN_COOKIE = 'saancha-admin';

// HMAC-SHA256 signed, time-limited administrator cookie. Requires Node runtime.
import { createHmac, createHash, timingSafeEqual, randomBytes } from 'node:crypto';
const SESSION_SECONDS = 60 * 60 * 8;
export function adminPassword() { return import.meta.env.ADMIN_PASSWORD || ''; }
// Backwards compatible with deployments that only configured ADMIN_PASSWORD.
// Prefer ADMIN_SESSION_SECRET; use a server-only service key when available.
// The password-based fallback is for migration only: configure a strong, separate
// ADMIN_SESSION_SECRET on the server as soon as possible.
function secret() {
  const configured = import.meta.env.ADMIN_SESSION_SECRET;
  if (configured) return configured;
  const base = import.meta.env.SUPABASE_SERVICE_ROLE || adminPassword();
  return base ? createHash('sha256').update('saancha-admin-session-v2:' + base).digest('hex') : '';
}
function signature(payload) { return createHmac('sha256', secret()).update(payload).digest('hex'); }
export function isAdmin(cookies) {
  if (!adminPassword() || !secret()) return false;
  const token = cookies.get(ADMIN_COOKIE)?.value || '';
  const [expiry, nonce, mac, extra] = token.split('.');
  if (extra !== undefined || !/^\d+$/.test(expiry || '') || !/^[a-f0-9]{32}$/.test(nonce || '') || !/^[a-f0-9]{64}$/.test(mac || '') || Number(expiry) <= Date.now()) return false;
  const expected = signature(`${expiry}.${nonce}`);
  return timingSafeEqual(Buffer.from(mac,'hex'), Buffer.from(expected,'hex'));
}
export function setAdminCookie(cookies) {
  if (!secret() || !adminPassword()) throw new Error('Configure ADMIN_PASSWORD and ADMIN_SESSION_SECRET');
  const expiry = String(Date.now() + SESSION_SECONDS * 1000);
  const nonce = randomBytes(16).toString('hex');
  cookies.set(ADMIN_COOKIE, `${expiry}.${nonce}.${signature(`${expiry}.${nonce}`)}`, {
    path:'/', httpOnly:true, sameSite:'strict', secure: import.meta.env.PROD, maxAge:SESSION_SECONDS,
  });
}
export function clearAdminCookie(cookies) { cookies.delete(ADMIN_COOKIE, {path:'/'}); }

// Service-role client — RLS bypass, SIRF server pe. Never expose this key to browser.
export function supabaseAdmin() {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE,   // server-only env var
    { auth:{ persistSession:false, autoRefreshToken:false }, realtime:{ params:{ eventsPerSecond:0 } } }
  );
}
