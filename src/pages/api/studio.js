export const prerender = false;
import {isAdmin, supabaseAdmin} from '../../lib/admin.js';
const ALLOWED_PAGES = new Set(['/','/candles','/soap','/concrete','/resin','/custom-moulds','/shop']);
const allowed = value => typeof value === 'string' && value.length <= 5000;
export async function POST({request,cookies}) {
 if(!isAdmin(cookies)) return new Response(JSON.stringify({error:'Unauthorized'}),{status:401});
 let body;try {body=await request.json()}catch{return new Response(JSON.stringify({error:'Invalid JSON'}),{status:400})}
 const {action,page,selector,property,value}=body||{};
 if(!ALLOWED_PAGES.has(page)) return new Response(JSON.stringify({error:'Unknown page'}),{status:400});
 const db=supabaseAdmin();let error=null;
 if(action==='draft') {
   if(!allowed(selector)||selector.length>500||!['text','src','href'].includes(property)||!allowed(value)) return new Response(JSON.stringify({error:'Invalid edit'}),{status:400});
   if(property==='src' && !/^(https?:\/\/|\/[^\/])/i.test(value)) return new Response(JSON.stringify({error:'Invalid image URL'}),{status:400});
   if(property==='href' && !/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(value)) return new Response(JSON.stringify({error:'Invalid link'}),{status:400});
   const old=await db.from('cms_visual_edits').select('*').eq('page',page).eq('selector',selector).eq('property',property).maybeSingle();
   if(old.error){error=old.error;} else {
    if(old.data) { const res=await db.from('cms_visual_edits').update({draft_value:value,updated_at:new Date().toISOString()}).eq('page',page).eq('selector',selector).eq('property',property);error=res.error; }
    else {const res=await db.from('cms_visual_edits').insert({page,selector,property,draft_value:value});error=res.error;}
   }
 } else if(action==='publish') {
  const res=await db.from('cms_visual_edits').select('*').eq('page',page); error=res.error;
  if(!error) for(const row of res.data||[]) {
   if(row.draft_value===null) continue;
   await db.from('cms_revisions').insert({entity:'visual',entity_id:`${page}:${row.selector}:${row.property}`,snapshot:row});
   const update=await db.from('cms_visual_edits').update({published_value:row.draft_value}).eq('page',page).eq('selector',row.selector).eq('property',row.property);
   if(update.error){error=update.error;break;}
  }
 } else if(action==='discard') {const res=await db.from('cms_visual_edits').select('*').eq('page',page);error=res.error;
   if(!error) for(const row of res.data||[]) {const up=await db.from('cms_visual_edits').update({draft_value:row.published_value}).eq('page',page).eq('selector',row.selector).eq('property',row.property);if(up.error){error=up.error;break;}}
 } else return new Response(JSON.stringify({error:'Unknown action'}),{status:400});
 return new Response(JSON.stringify(error?{error:error.message}:{ok:true}),{status:error?500:200,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
}
