/* Saancha — shared client JS (all pages). GSAP + Lenis loaded before this. */
(function(){
  const REDUCED=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const TOUCH=matchMedia('(hover:none)').matches||innerWidth<900;
  if(window.gsap&&window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);

  /* smooth scroll */
  let lenis=null;
  if(window.Lenis&&!REDUCED&&!TOUCH){
    lenis=new Lenis({lerp:.09,smoothWheel:true});
    lenis.on('scroll',ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  }
  const goTo=s=>{const el=document.querySelector(s);if(!el)return;
    lenis?lenis.scrollTo(el,{offset:-70}):el.scrollIntoView({behavior:'smooth'});};
  document.querySelectorAll('a[href^="/#"],a[href^="#"]').forEach(a=>{
    const href=a.getAttribute('href');
    const hash=href.includes('#')?'#'+href.split('#')[1]:'';
    // only intercept same-page anchors
    if((href.startsWith('#')||href.startsWith('/#')) && document.querySelector(hash)){
      a.addEventListener('click',e=>{e.preventDefault();closeMenu();goTo(hash);});
    }
  });

  const yr=document.getElementById('yr'); if(yr)yr.textContent=new Date().getFullYear();

  /* reveals */
  function reveal(){
    document.querySelectorAll('.ln').forEach(l=>{const sp=l.querySelector('span');if(sp)gsap.to(sp,{yPercent:0,duration:1.05,ease:'expo.out',scrollTrigger:{trigger:l,start:'top 90%'}});});
    document.querySelectorAll('.rvu').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%'}}));
    document.querySelectorAll('[data-count]').forEach(el=>{
      const end=+el.dataset.count,sfx=el.dataset.suffix||'',o={v:0};
      gsap.to(o,{v:end,duration:1.9,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 94%'},onUpdate:()=>el.textContent=Math.round(o.v)+sfx});});
  }
  if(window.gsap){document.documentElement.classList.add('js-anim');gsap.set('.ln > span',{yPercent:112});gsap.set('.rvu',{opacity:0,y:24});reveal();}

  /* nav solidify + progress */
  const nav=document.getElementById('nav');
  if(window.ScrollTrigger){
    ScrollTrigger.create({start:60,onUpdate:s=>nav&&nav.classList.toggle('solid',s.scroll()>60)});
    const prog=document.getElementById('prog');
    if(prog)ScrollTrigger.create({start:0,end:'max',onUpdate:s=>prog.style.width=(s.progress*100)+'%'});
  }
  if(nav&&scrollY>60)nav.classList.add('solid');

  /* autoplay + SEAMLESS cross-fade loop + light parallax on any .autovid */
  document.querySelectorAll('video.autovid').forEach(v=>{
    v.muted=true; v.loop=false; v.playsInline=true;
    const FADE=0.6; // seconds of overlap at the loop point

    // build a second copy stacked on top for the cross-fade
    const wrap=v.parentElement;
    if(getComputedStyle(wrap).position==='static') wrap.style.position='relative';
    v.style.position='absolute'; v.style.inset='0'; v.style.width='100%'; v.style.height='100%'; v.style.objectFit='cover'; v.style.transition='opacity .6s linear';
    const v2=v.cloneNode(true);
    v2.style.opacity='0';
    v.parentElement.appendChild(v2);
    const pair=[v,v2]; let active=0;

    const play=el=>el.play().catch(()=>{});
    pair.forEach(el=>{el.muted=true;el.addEventListener('canplay',()=>{if(el===pair[active])play(el);},{once:true});});
    play(v);

    function tick(){
      const cur=pair[active];
      if(cur.duration && cur.currentTime >= cur.duration - FADE){
        const next=pair[1-active];
        next.currentTime=0; play(next);
        next.style.opacity='1'; cur.style.opacity='0';
        active=1-active;
      }
    }
    // check ~every frame
    const iv=setInterval(tick,80);

    if(window.ScrollTrigger){
      const sec=v.closest('section,header')||v.parentElement;
      const resume=()=>play(pair[active]);
      const pause=()=>pair.forEach(el=>el.pause());
      ScrollTrigger.create({trigger:sec,start:'top bottom',end:'bottom top',
        onEnter:resume,onEnterBack:resume,onLeave:pause,onLeaveBack:pause});
    }
  });

  /* immersive banner parallax (material pages): video drifts, copy lifts + fades */
  if(window.ScrollTrigger){
    const mh=document.querySelector('.mpage-hero');
    if(mh){
      const mv=mh.querySelector('.mvid'), mw=mh.querySelector('.wrap');
      if(mv)gsap.to(mv,{yPercent:14,scale:1.06,ease:'none',
        scrollTrigger:{trigger:mh,start:'top top',end:'bottom top',scrub:.6}});
      if(mw)gsap.to(mw,{yPercent:-22,opacity:.2,ease:'none',
        scrollTrigger:{trigger:mh,start:'top top',end:'bottom top',scrub:.6}});
    }
  }

  /* menu */
  const menu=document.getElementById('menu');
  window.closeMenu=function(){if(!menu||!menu.classList.contains('open'))return;menu.classList.remove('open');lenis&&lenis.start();
    gsap.to(menu,{clipPath:'inset(0 0 100% 0)',duration:.55,ease:'expo.inOut'});};
  function openMenu(){if(!menu)return;menu.classList.add('open');lenis&&lenis.stop();
    gsap.timeline().to(menu,{clipPath:'inset(0 0 0% 0)',duration:.7,ease:'expo.inOut'})
      .from('#menu li a',{yPercent:110,opacity:0,duration:.6,ease:'expo.out',stagger:.05},'-=.3');}
  const burger=document.getElementById('burger');if(burger)burger.onclick=openMenu;
  const mClose=document.getElementById('mClose');if(mClose)mClose.onclick=closeMenu;
  addEventListener('keydown',e=>e.key==='Escape'&&closeMenu());
  document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',closeMenu));

  /* custom cursor */
  if(!TOUCH){
    const d=document.getElementById('cur'),r=document.getElementById('curR'),lbl=r&&r.querySelector('b');
    if(d&&r){
      let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
      addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;d.style.transform='translate('+mx+'px,'+my+'px)';});
      (function t(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;r.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(t);})();
      const bind=()=>document.querySelectorAll('a,button,summary,[data-cur]').forEach(el=>{
        if(el.dataset.bd)return;el.dataset.bd=1;
        el.addEventListener('mouseenter',()=>{r.classList.add('big');if(lbl)lbl.textContent=el.dataset.cur||'';});
        el.addEventListener('mouseleave',()=>{r.classList.remove('big');if(lbl)lbl.textContent='';});});
      bind();new MutationObserver(bind).observe(document.body,{childList:true,subtree:true});
      document.querySelectorAll('[data-mag]').forEach(el=>{
        el.addEventListener('mousemove',e=>{const b=el.getBoundingClientRect();
          gsap.to(el,{x:(e.clientX-b.left-b.width/2)*.2,y:(e.clientY-b.top-b.height/2)*.3,duration:.5,ease:'power3.out'});});
        el.addEventListener('mouseleave',()=>gsap.to(el,{x:0,y:0,duration:.7,ease:'elastic.out(1,.4)'}));});
    }
  }

  /* WhatsApp form (home) */
  const form=document.getElementById('form');
  if(form){form.addEventListener('submit',e=>{e.preventDefault();
    const v=id=>{const el=document.getElementById(id);return el?el.value.trim():'';};
    const wa=form.dataset.wa;
    const t=`New enquiry — Saancha\n\nName: ${v('f-name')}\nBrand: ${v('f-brand')||'—'}\nCasting: ${v('f-cast')}\nQuantity: ${v('f-qty')}\nDetails: ${v('f-msg')||'—'}`;
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(t)}`,'_blank');});}
})();

/* ── account dropdown: show login/signup vs my-account/orders/logout ── */
(function(){
  const loggedIn = document.cookie.split('; ').some(c => c.trim() === 'sb-auth=1');
  document.querySelectorAll('.acc-in').forEach(el => el.hidden = !loggedIn);
  document.querySelectorAll('.acc-out').forEach(el => el.hidden = loggedIn);
  // mobile menu: swap the account entries too (if present)
  const mAcc = document.querySelector('#menu .m-account');
  if (mAcc) mAcc.innerHTML = loggedIn
    ? '<a href="/account">My account</a><a href="/account#orders">My orders</a><a href="/logout">Log out</a>'
    : '<a href="/login">Log in</a><a href="/signup">Sign up</a>';
})();

/* ── password show/hide ── */
document.querySelectorAll('.pass-eye').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const inp=document.getElementById(btn.dataset.eye);
    if(!inp)return;
    inp.type = inp.type==='password' ? 'text' : 'password';
    btn.style.color = inp.type==='text' ? 'var(--amber)' : '';
  });
});

/* ── auth mascot: eyes follow email, hands cover on password ── */
(function(){
  const mascot = document.getElementById('mascot');
  if (!mascot) return;
  const pupils = mascot.querySelectorAll('.m-pupil');
  const emailInput = document.querySelector('input[type="email"], #email, #name');
  const passInputs = document.querySelectorAll('input[type="password"]');

  // eyes follow: based on caret position in email (approx) + typing
  function lookAt(x, y){
    pupils.forEach(p=>{
      // small range of movement
      const dx = Math.max(-4, Math.min(4, x));
      const dy = Math.max(-3, Math.min(3, y));
      p.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }
  function resetEyes(){ pupils.forEach(p=>p.style.transform='translate(0,0)'); }

  if (emailInput){
    emailInput.addEventListener('focus', ()=> mascot.dataset.state='look');
    emailInput.addEventListener('input', ()=>{
      // move eyes right as they type, loop back
      const len = emailInput.value.length;
      lookAt(((len % 12) - 6) * 0.7, 2);
    });
    emailInput.addEventListener('blur', ()=>{ if(mascot.dataset.state!=='cover'){ mascot.dataset.state='idle'; resetEyes(); }});
  }

  passInputs.forEach(pw=>{
    pw.addEventListener('focus', ()=>{ mascot.dataset.state='cover'; });
    pw.addEventListener('blur', ()=>{ mascot.dataset.state='idle'; resetEyes(); });
    // when show-password eye is toggled to text, mascot peeks
    const wrap = pw.closest('.pass-wrap');
    if (wrap){
      const eye = wrap.querySelector('.pass-eye');
      if (eye){
        eye.addEventListener('click', ()=>{
          if (document.activeElement===pw || pw.value){
            mascot.dataset.state = (pw.type==='text') ? 'peek' : 'cover';
          }
        });
      }
    }
  });
})();

/* ── Custom Mould Pricing Calculator (real-time) ── */
function initCalc(){
  const calc = document.getElementById('calc');
  if (!calc) return;
  if (calc.dataset.ready) return;   // already initialised
  calc.dataset.ready = '1';
  let rules = null;
  try { rules = JSON.parse(document.getElementById('calcRules')?.textContent || 'null'); } catch(e){ rules = null; }

  const sel = { product:null, size:null, complexity:null, quantity:null, logo:false };
  const result = document.getElementById('calcResult');
  const hint = document.getElementById('calcHint');
  const sum = document.getElementById('crSummary');
  const tot = document.getElementById('crTotal');
  const fmt = (n)=> (rules?.currency||'₹') + Math.round(n).toLocaleString('en-IN');

  // option buttons → update + recalc live
  calc.querySelectorAll('.opt-grid').forEach(grid=>{
    const group = grid.dataset.group;
    grid.querySelectorAll('.opt').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        grid.querySelectorAll('.opt').forEach(b=>b.classList.remove('on'));
        btn.classList.add('on');
        sel[group] = btn.dataset.val;
        if (group==='size'){ const cd=document.getElementById('customDims'); if(cd) cd.hidden = (btn.dataset.val!=='custom'); }
        if (group==='quantity'){ const cq=document.getElementById('customQty'); if(cq) cq.hidden = (btn.dataset.val!=='custom'); }
        recalc();
      });
    });
  });
  const logoCheck = document.getElementById('logoCheck');
  if (logoCheck) logoCheck.addEventListener('change', ()=>{ sel.logo = logoCheck.checked; recalc(); });
  const dimsEl = document.getElementById('dims');
  const qtyNumEl = document.getElementById('qtyNum');
  if (dimsEl) dimsEl.addEventListener('input', recalc);
  if (qtyNumEl) qtyNumEl.addEventListener('input', recalc);

  function qtyVal(){
    let q = sel.quantity;
    if (q==='custom') q = parseInt(qtyNumEl?.value||'0');
    else if (q==='10') q = Math.max(10, parseInt(qtyNumEl?.value||'10')||10);
    return Math.max(1, parseInt(q)||1);
  }

  function recalc(){
    // need all four picks
    if (!sel.product || !sel.size || !sel.complexity || !sel.quantity){
      result.hidden = true; if(hint) hint.hidden = false; return;
    }
    if(hint) hint.hidden = true;
    result.hidden = false;

    const qty = qtyVal();
    const dims = dimsEl?.value || '';

    // customer-facing summary (NO internal breakdown)
    const summaryHtml = `
      <div class="cr-row"><span>Product</span><b>${sel.product}</b></div>
      <div class="cr-row"><span>Size</span><b>${sel.size==='custom' ? (dims||'custom') : sel.size+'″'}</b></div>
      <div class="cr-row"><span>Design</span><b>${sel.complexity}${sel.logo?' + logo':''}</b></div>
      <div class="cr-row"><span>Quantity</span><b>${qty}</b></div>`;

    // custom quote cases
    const needsQuote = (sel.complexity==='multipart') || (sel.size==='custom') || !rules;
    if (needsQuote){
      sum.innerHTML = summaryHtml;
      tot.innerHTML = '<span class="cr-quote">Custom Quote Required</span>';
      prefill(qty, dims, 'Custom quote required');
      return;
    }

    // math (hidden from customer)
    const designBase = (rules.designBase && rules.designBase[sel.complexity]) || 0;
    const logo = sel.logo ? (rules.logoCharge||0) : 0;
    const designCharge = designBase + logo;
    const perMould = (rules.base[sel.product]||0) * (rules.sizeMult[sel.size]||1);
    const tier = (rules.qtyTiers||[]).slice().reverse().find(t=> qty>=t.min) || {mult:1};
    const total = designCharge + perMould*qty*(tier.mult||1);

    sum.innerHTML = summaryHtml;   // only selections, no cost breakdown
    tot.innerHTML = `<span class="cr-total-label">Estimated total</span><span class="cr-total-val">${fmt(total)}</span>`;
    prefill(qty, dims, fmt(total)+' (est.)');
  }

  function prefill(qty, dims, estimate){
    const setForce=(id,v)=>{ const el=document.getElementById(id); if(el) el.value=v; };
    setForce('q-product', sel.product||'');
    setForce('q-size', sel.size==='custom'?(dims||'custom'):(sel.size?sel.size+'"':''));
    setForce('q-complexity', (sel.complexity||'')+(sel.logo?' + logo':''));
    setForce('q-qty', qty);
    setForce('q-dims', dims);
    setForce('q-estimate', estimate);
    const ql=document.getElementById('q-logo'); if(ql) ql.checked = sel.logo;
  }

  const resetBtn = document.getElementById('crReset');
  if (resetBtn) resetBtn.addEventListener('click', ()=>{
    result.hidden = true; if(hint) hint.hidden = false;
    calc.querySelectorAll('.opt').forEach(b=>b.classList.remove('on'));
    const cd=document.getElementById('customDims'); if(cd) cd.hidden = true;
    const cq=document.getElementById('customQty'); if(cq) cq.hidden = true;
    if(logoCheck) logoCheck.checked=false;
    Object.keys(sel).forEach(k=> sel[k]= k==='logo'?false:null);
    const calcSec=document.getElementById('calculator'); if(calcSec) calcSec.scrollIntoView({behavior:'smooth'});
  });
}
// run now if DOM ready, else wait for it (fixes buttons not responding)
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCalc);
else initCalc();

/* ── Lead capture: WhatsApp click → save to CRM (fire-and-forget) ── */
(function(){
  function labelFor(a){
    // figure out which button this is
    if (a.closest('#nav')) return 'nav';
    if (a.closest('.fab')) return 'floating-button';
    if (a.closest('.hero, .mpage-hero, .shop-hero2, .cm-hero')) return 'hero';
    if (a.closest('.pcard, .shop-card')) {
      const name = a.closest('.pcard, .shop-card')?.querySelector('h3')?.textContent?.trim();
      return name ? ('product: '+name) : 'product';
    }
    if (a.closest('#contact, form')) return 'contact-form';
    if (a.closest('footer')) return 'footer';
    return 'link';
  }
  document.addEventListener('click', function(e){
    const a = e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    if (!a) return;
    try {
      const payload = JSON.stringify({
        page: location.pathname,
        button: labelFor(a),
        intent: decodeURIComponent((a.href.split('text=')[1]||'')).slice(0,300),
        referrer: document.referrer || 'direct',
        device: (matchMedia('(hover:none)').matches || innerWidth<900) ? 'mobile' : 'desktop',
      });
      // sendBeacon survives the page leaving to WhatsApp
      if (navigator.sendBeacon) navigator.sendBeacon('/api/lead', new Blob([payload], {type:'application/json'}));
      else fetch('/api/lead', {method:'POST', body:payload, headers:{'Content-Type':'application/json'}, keepalive:true});
    } catch(err) { /* never block the click */ }
    // link opens normally (we don't preventDefault)
  }, true);
})();

/* ── email obfuscation: bots ko raw email nahi, user ko normal ── */
(function(){
  document.querySelectorAll('.obf-mail').forEach(a=>{
    const u=a.dataset.u, d=a.dataset.d;
    if(!u||!d) return;
    const email=u+'@'+d;
    a.textContent=email;               // user ko asli email dikhe
    a.addEventListener('click', e=>{   // click pe mailto khule
      e.preventDefault();
      window.location.href='mailto:'+email;
    });
  });
})();
