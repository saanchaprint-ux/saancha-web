// Site content loader — reads editable content from Supabase with fallbacks.
import { supabaseAuth } from './supabase.js';

export async function loadContent() {
  try {
    const sb = supabaseAuth();
    const { data } = await sb.from('content').select('key,value');
    return Object.fromEntries((data||[]).map(r => [r.key, r.value]));
  } catch (e) { return {}; }
}

// get with fallback: c(content, 'key', 'default text')
export function c(content, key, fallback='') {
  const v = content?.[key];
  return (v === undefined || v === null || v === '') ? fallback : v;
}
