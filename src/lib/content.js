// Site content loader — reads editable content from Supabase with fallbacks.
import { supabaseAuth } from './supabase.js';

let _cache = null;
export async function loadContent() {
  if (_cache) return _cache;
  try {
    const sb = supabaseAuth();
    const { data } = await sb.from('content').select('key,value');
    _cache = Object.fromEntries((data||[]).map(r => [r.key, r.value]));
  } catch (e) { _cache = {}; }
  return _cache;
}

// get with fallback: c(content, 'key', 'default text')
export function c(content, key, fallback='') {
  const v = content?.[key];
  return (v === undefined || v === null || v === '') ? fallback : v;
}
