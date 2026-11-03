import { pathToFileURL } from 'node:url'; import fs from 'node:fs'; import path from 'node:path';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const BASE='https://nextgenius.com.au/';
const seed=['/','/service','/use-cases','/opc','/community','/about','/contact','/workshop','/events','/blog','/faq','/ai-meetup-sydney','/ai-events-sydney','/learn-ai-sydney',
 '/blog/ai-events-sydney','/blog/ai-meetup-sydney','/blog/best-ai-networking-events-in-sydney','/blog/how-to-learn-ai-in-sydney-2026-guide','/blog/learn-ai-sydney','/blog/top-ai-meetups-in-sydney','/this-route-does-not-exist'];
const browser=await chromium.launch();
const ctx=await browser.newContext({viewport:{width:1440,height:900}});
const page=await ctx.newPage();
const netImgs=new Set(); page.on('response',r=>{const ct=r.headers()['content-type']||''; if(ct.startsWith('image/')||ct.startsWith('video/')||ct.includes('font'))netImgs.add(r.url());});
fs.mkdirSync('out/pages',{recursive:true});
const extract=()=>{
  const clean=s=>(s||'').replace(/\s+/g,' ').trim(); const abs=u=>{try{return new URL(u,location.href).href}catch(e){return u}};
  const root=document.querySelector('#root'); const blocks=[];
  const where=el=>el.closest('header')?'header':el.closest('footer')?'footer':el.closest('main')?'main':'other';
  root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,button,a,img,figcaption,blockquote,summary,label,dt,dd,td,th,div,span').forEach(el=>{
    const tag=el.tagName.toLowerCase();
    if(tag==='img'){blocks.push({t:'img',src:abs(el.currentSrc||el.src),alt:el.alt||'',w:el.naturalWidth,h:el.naturalHeight,in:where(el)});return;}
    if(tag==='div'||tag==='span'){ // only leaf text holders not covered by semantic parents
      if(el.children.length&&[...el.children].some(c=>clean(c.textContent)))return;
      if(el.closest('h1,h2,h3,h4,h5,h6,p,li,button,a,figcaption,blockquote,summary,label,dt,dd,td,th'))return;
      const t=clean(el.textContent); if(t)blocks.push({t:'text',text:t,cls:String(el.className).slice(0,50),in:where(el)});return;}
    const txt=clean(el.textContent); if(!txt)return;
    if(tag==='a'||tag==='button'){blocks.push({t:tag,text:txt,href:tag==='a'?el.getAttribute('href'):undefined,in:where(el)});return;}
    if(['li','td','th'].includes(tag)&&el.querySelector('p,h1,h2,h3,h4,h5,h6,li'))return;
    blocks.push({t:tag,text:txt,in:where(el)});
  });
  const bgs=[]; root.querySelectorAll('*').forEach(el=>{const b=getComputedStyle(el).backgroundImage; if(b&&b!=='none')[...b.matchAll(/url\("?([^")]+)"?\)/g)].forEach(m=>bgs.push(abs(m[1])));});
  const metas={}; document.querySelectorAll('meta[name],meta[property]').forEach(m=>metas[m.getAttribute('name')||m.getAttribute('property')]=m.content);
  return {title:document.title,metas,ld:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent),
    innerText:document.body.innerText,blocks,bgs,
    links:[...new Set([...root.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')))],
    expandables:[...root.querySelectorAll('details,[aria-expanded]')].length};
};
const done=new Set(), queue=[...seed], results=[];
while(queue.length){
  const r=queue.shift(); if(done.has(r))continue; done.add(r);
  await page.goto(BASE+'#'+r,{waitUntil:'networkidle'}); await page.waitForTimeout(1200);
  // expand accordions, scroll for lazy content
  for(const el of await page.$$('[aria-expanded="false"]')){try{await el.click({timeout:500});}catch{}}
  await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);});
  await page.waitForTimeout(600);
  const d=await page.evaluate(extract); d.route=r; d.url=page.url();
  const slug=r==='/'?'home':r.replace(/^\//,'').replace(/\//g,'__');
  fs.writeFileSync(`out/pages/${slug}.json`,JSON.stringify(d,null,1));
  await page.screenshot({path:`out/pages/${slug}.png`,fullPage:true});
  results.push({route:r,title:d.title,blocks:d.blocks.length,imgs:d.blocks.filter(b=>b.t==='img').length+d.bgs.length,chars:d.innerText.length});
  for(const l of d.links){ if(l.startsWith('#/')){const n=l.slice(1).split('?')[0]; if(n!=='/'&&!done.has(n)&&!queue.includes(n))queue.push(n);} }
  console.log(r,results.at(-1).blocks,'blocks',results.at(-1).chars,'chars');
}
fs.writeFileSync('out/crawl-summary.json',JSON.stringify({results,netImgs:[...netImgs]},null,1));
await browser.close(); console.log('DONE',results.length,'pages;',netImgs.size,'media urls');
