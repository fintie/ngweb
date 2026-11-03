// Record a reference site as video (slow scroll + hovers) and detect its motion stack. Study only.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const [name, url, maxSec = '70'] = process.argv.slice(2);
const dir = `out/video/${name}`; fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir, size: { width: 1440, height: 900 } } });
const page = await ctx.newPage();
const scripts = new Set(), media = [];
page.on('request', (r) => { const u = r.url(); if (r.resourceType() === 'script') scripts.add(u.slice(0, 140)); });
page.on('response', (r) => { const ct = r.headers()['content-type'] || ''; if (/video|webm|mp4|model|gltf|glb|lottie/.test(ct) || /\.(mp4|webm|glb|gltf|riv|lottie)(\?|$)/.test(r.url())) media.push(r.url().slice(0, 140) + ' ' + ct); });
const t0 = Date.now();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(6500); // intro animation
for (const [x, y] of [[300, 300], [900, 400], [700, 700], [1100, 250]]) { await page.mouse.move(x, y, { steps: 18 }); await page.waitForTimeout(350); }
const stack = await page.evaluate(() => {
  const g = (k) => typeof window[k] !== 'undefined';
  const all = [...document.querySelectorAll('*')];
  const cs = (e) => getComputedStyle(e);
  return {
    globals: ['gsap', 'ScrollTrigger', 'Lenis', 'lenis', 'THREE', 'LocomotiveScroll', 'barba', 'Swiper', 'anime', 'Webflow', 'jQuery', '__NEXT_DATA__', '__NUXT__', 'Alpine', 'lottie', 'PIXI', 'SplitText', 'Flip'].filter(g),
    canvases: document.querySelectorAll('canvas').length, videos: [...document.querySelectorAll('video')].map((v) => (v.currentSrc || v.src || '').slice(0, 100)),
    svgs: document.querySelectorAll('svg').length, imgs: document.images.length,
    htmlClass: document.documentElement.className.slice(0, 200), scrollBehavior: cs(document.documentElement).scrollBehavior,
    customCursor: all.some((e) => cs(e).cursor === 'none'), blendModes: [...new Set(all.map((e) => cs(e).mixBlendMode).filter((m) => m !== 'normal'))],
    backdrop: all.filter((e) => cs(e).backdropFilter !== 'none').length, willChange: all.filter((e) => cs(e).willChange !== 'auto').length,
    transitions: [...new Set(all.map((e) => cs(e).transitionDuration + ' ' + cs(e).transitionTimingFunction).filter((t) => !t.startsWith('0s 0s') && !t.startsWith('0s ease')))].slice(0, 12),
    animations: [...new Set(all.map((e) => cs(e).animationName).filter((n) => n !== 'none'))].slice(0, 15),
    clipPath: all.filter((e) => cs(e).clipPath !== 'none').length, maskImage: all.filter((e) => cs(e).maskImage !== 'none').length,
    fixedEls: all.filter((e) => cs(e).position === 'fixed').map((e) => e.tagName.toLowerCase() + '.' + String(e.className).slice(0, 40)).slice(0, 10),
    height: document.documentElement.scrollHeight,
  };
});
// choreographed scroll with hovers
let y = 0; const total = stack.height - 900, start = Date.now();
while (y < total && (Date.now() - start) / 1000 < Number(maxSec)) {
  for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 110); await page.waitForTimeout(70); }
  y += 660; await page.waitForTimeout(900);
  const hov = await page.evaluateHandle(() => { const c = [...document.querySelectorAll('a,button,li,[role=button]')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 80 && r.height > 24 && r.top > 120 && r.bottom < 800 && r.left >= 0; }); return c[Math.floor(c.length / 2)] || null; });
  const el = hov.asElement(); if (el) { const b = await el.boundingBox(); if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 14 }); await page.waitForTimeout(700); } }
}
await page.waitForTimeout(1500);
const vp = await page.video().path();
await ctx.close(); await browser.close();
fs.writeFileSync(`${dir}/stack.json`, JSON.stringify({ ...stack, scripts: [...scripts], media, seconds: Math.round((Date.now() - t0) / 1000) }, null, 1));
fs.renameSync(vp, `${dir}/${name}.webm`);
console.log(name, 'video saved', (fs.statSync(`${dir}/${name}.webm`).size / 1e6).toFixed(1), 'MB |', JSON.stringify({ globals: stack.globals, canvases: stack.canvases, videos: stack.videos.length, scripts: scripts.size }));
