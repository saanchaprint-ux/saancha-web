(function(){
 function apply(row){let el;try{el=document.querySelector(row.selector)}catch{return;}if(!el||typeof row.value!=='string')return;
 if(row.property==='text') el.textContent=row.value;
 if(row.property==='src' && el.tagName==='IMG') el.setAttribute('src',row.value);
 if(row.property==='href' && el.tagName==='A') el.setAttribute('href',row.value);}
 let rows=[];try{rows=JSON.parse(document.getElementById('saancha-visual-data')?.textContent||'[]')}catch{}
 for(const row of rows)apply(row);
 window.__saanchaVisualApply=apply;
})();