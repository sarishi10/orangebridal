const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];
qa('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const revealObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');revealObs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6%'});
qa('.reveal').forEach(el=>revealObs.observe(el));

const menu=q('.mobile-menu'), toggle=q('.menu-toggle');
if(toggle){toggle.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);toggle.setAttribute('aria-expanded',open);menu.setAttribute('aria-hidden',!open)});qa('a',menu).forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true')}));}

let ticking=false;
const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=window.scrollY, doc=document.documentElement.scrollHeight-innerHeight;const progress=doc>0?Math.min(1,y/doc):0;q('.progress span').style.width=`${progress*100}%`;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const stage=q('[data-depth]');if(stage){const shift=Math.max(-16,Math.min(20,(innerHeight*.5-stage.getBoundingClientRect().top)*.018));stage.style.transform=`translate3d(0,${shift}px,0)`}}ticking=false})};
addEventListener('scroll',onScroll,{passive:true});onScroll();

qa('.pill,.bento-card,.social-card').forEach(el=>{el.addEventListener('pointerdown',()=>el.style.transform='scale(.985)');['pointerup','pointercancel','pointerleave'].forEach(ev=>el.addEventListener(ev,()=>el.style.transform=''))});
