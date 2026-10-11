(function(){
 if(window.top===window)return;
 const st=document.createElement('style');st.textContent='[data-studio-selected]{outline:2px solid #e9a65e!important;outline-offset:3px!important} body{cursor:default!important}';document.head.append(st);
 const EDITABLE='h1,h2,h3,h4,h5,h6,p,span,b,strong,small,li,blockquote,img,a,button';
 let selected=null;
 function cssPath(el){const parts=[];while(el&&el!==document.body){if(el.id && !/^[0-9]/.test(el.id)){parts.unshift('#'+CSS.escape(el.id));break;}const tag=el.tagName.toLowerCase();const peers=Array.from(el.parentElement?.children||[]).filter(n=>n.tagName===el.tagName);parts.unshift(tag+(peers.length>1?`:nth-of-type(${peers.indexOf(el)+1})`:''));el=el.parentElement;}return parts.join(' > ')}
 function pick(el){if(selected)selected.removeAttribute('data-studio-selected');selected=el;el.setAttribute('data-studio-selected','');const property=el.tagName==='IMG'?'src':el.tagName==='A'?'href':'text';const value=property==='text'?el.textContent.trim():el.getAttribute(property)||'';window.parent.postMessage({studio:'selected',selector:cssPath(el),property,value,tag:el.tagName},location.origin)}
 document.addEventListener('click',e=>{const el=e.target.closest(EDITABLE);if(!el)return;e.preventDefault();e.stopPropagation();pick(el)},true);
 document.addEventListener('submit',e=>e.preventDefault(),true);
 window.addEventListener('message',e=>{if(e.origin!==location.origin||!e.data||e.data.studio!=='update')return;window.__saanchaVisualApply?.(e.data.row);});
 window.parent.postMessage({studio:'ready'},location.origin);
})();