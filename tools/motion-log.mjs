// Measure a site's motion inside a live browser (study only): every CSS transition/animation that fires, every script-driven style/class change,
// how far elements move per pixel of scroll, plus a synced video with phase times so dense frame strips can be cut. Usage: node tools/motion-log.mjs <name> <url> [menuSelector] [linkSelector]
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const [name, url, menuSel, linkSel] = process.argv.slice(2);
const dir = `out/motion/${name}`; fs.mkdirSync(`${dir}/src`, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir, size: { width: 1440, height: 900 } } });
const tVideo = Date.now();
await ctx.route(/googletagmanager|google-analytics|smartlook|hotjar|clarity\.ms/, (r) => r.abort()); // do not pollute their statistics
await ctx.addInitScript(() => {
  const L = (window.__ml = { t0: performance.now(), phase: 'load', ev: [], mut: {}, samples: [], watch: new Set() });
  const now = () => Math.round(performance.now() - L.t0);
  const cn = (e) => (typeof e.className === 'string' ? e.className : e.className?.baseVal || '').trim().split(/\s+/).filter(Boolean);
  const sel = (e) => { if (!e || !e.tagName) return '?'; let p = e.tagName.toLowerCase(); if (e.id) p += '#' + e.id; const c = cn(e).slice(0, 3).join('.'); if (c) p += '.' + c; const up = e.parentElement; const pc = up && cn(up)[0]; return pc ? pc + ' > ' + p : p; };
  L.sel = sel;
  document.addEventListener('transitionrun', (e) => {
    if (L.ev.length > 6000) return; const cs = getComputedStyle(e.target), ps = cs.transitionProperty.split(', '), i = Math.max(ps.indexOf(e.propertyName), ps.indexOf('all'), 0);
    const at = (s) => { const a = s.split(/, (?![^(]*\))/); return a[i % a.length]; };
    L.ev.push({ t: now(), y: Math.round(scrollY), ph: L.phase, k: 'tr', s: sel(e.target), p: e.propertyName, d: at(cs.transitionDuration), w: at(cs.transitionDelay), e: at(cs.transitionTimingFunction) });
  }, true);
  document.addEventListener('animationstart', (e) => {
    const cs = getComputedStyle(e.target);
    L.ev.push({ t: now(), y: Math.round(scrollY), ph: L.phase, k: 'an', s: sel(e.target), p: e.animationName, d: cs.animationDuration, w: cs.animationDelay, e: cs.animationTimingFunction, n: cs.animationIterationCount });
  }, true);
  const mo = new MutationObserver((list) => {
    for (const m of list) {
      const key = sel(m.target) + ' | ' + m.attributeName, r = (L.mut[key] ||= { n: 0, first: now(), last: 0, ph: {}, added: {}, removed: {}, vals: [] });
      r.n++; r.last = now(); r.ph[L.phase] = (r.ph[L.phase] || 0) + 1;
      if (m.attributeName === 'class') { const a = new Set((m.oldValue || '').split(/\s+/)), b = new Set(cn(m.target)); for (const x of b) if (x && !a.has(x)) r.added[x] = (r.added[x] || 0) + 1; for (const x of a) if (x && !b.has(x)) r.removed[x] = (r.removed[x] || 0) + 1; }
      else { L.watch.add(m.target); if (r.vals.length < 6) r.vals.push((m.target.getAttribute('style') || '').slice(0, 160)); }
    }
  });
  const go = () => mo.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'], attributeOldValue: true, subtree: true });
  document.documentElement ? go() : document.addEventListener('readystatechange', go, { once: true });
});
const page = await ctx.newPage();
const phases = [];
const mark = async (ph) => { phases.push({ ph, sec: +((Date.now() - tVideo) / 1000).toFixed(2) }); await page.evaluate((p) => { if (window.__ml) window.__ml.phase = p; }, ph).catch(() => {}); };
// keep the site's own script and style files for reading the exact motion logic
page.on('response', async (r) => { try { const u = new URL(r.url()); if (!/\.(js|css)$/.test(u.pathname) || u.host !== new URL(url).host) return; fs.writeFileSync(`${dir}/src/${u.pathname.split('/').pop()}`, await r.body()); } catch {} });
phases.push({ ph: 'load', sec: +((Date.now() - tVideo) / 1000).toFixed(2) });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(7000);

await mark('mouse');
for (const [x, y] of [[250, 300], [700, 500], [1150, 260], [1250, 640], [420, 720]]) { await page.mouse.move(x, y, { steps: 25 }); await page.waitForTimeout(450); }

await mark('scroll'); // constant speed, 750 px per second, with stops so that reveals can finish
const height = await page.evaluate(() => document.documentElement.scrollHeight);
const sample = () => page.evaluate(() => { const L = window.__ml, out = []; for (const e of L.watch) { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); if (r.bottom < -200 || r.top > innerHeight + 200) continue; out.push({ s: L.sel(e), top: Math.round(r.top), h: Math.round(r.height), o: +(+cs.opacity).toFixed(2), tf: cs.transform === 'none' ? '' : cs.transform.slice(0, 70), sc: e.getAttribute('style')?.slice(0, 90) }); } L.samples.push({ y: Math.round(scrollY), els: out.slice(0, 60) }); });
await page.mouse.move(720, 450);
for (let y = 0, step = 0; y < height; y += 30, step++) {
  await page.mouse.wheel(0, 30); await page.waitForTimeout(40);
  if (step % 8 === 0) await sample().catch(() => {});
  if (step % 30 === 29) await page.waitForTimeout(1300);
}
await page.waitForTimeout(1500);

await mark('hover');
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(1200);
const seen = new Set();
for (let y = 0; y < height; y += 800) {
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y); await page.waitForTimeout(500);
  const pts = await page.evaluate(() => [...document.querySelectorAll('a,button,video,[class*=card],[class*=item],[class*=tile]')].map((e) => ({ s: window.__ml.sel(e), r: e.getBoundingClientRect() })).filter((x) => x.r.width > 40 && x.r.height > 20 && x.r.top > 90 && x.r.bottom < 860 && x.r.left >= 0 && x.r.right < 1440).map((x) => ({ s: x.s, x: x.r.x + x.r.width / 2, y: x.r.y + x.r.height / 2 })));
  for (const p of pts) { if (seen.has(p.s) || seen.size > 40) continue; seen.add(p.s); await page.mouse.move(p.x, p.y, { steps: 10 }); await page.waitForTimeout(800); }
}
const keep = async () => page.evaluate(() => { const L = window.__ml; return { ev: L.ev, mut: L.mut, samples: L.samples }; });

let menu = null;
if (menuSel) { await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(1000); await mark('menu'); await page.hover(menuSel).catch(() => {}); await page.waitForTimeout(1500); await page.click(menuSel, { timeout: 4000 }).catch((e) => { menu = String(e).slice(0, 120); }); await page.waitForTimeout(2200); await page.keyboard.press('Escape'); await page.mouse.move(720, 800); await page.waitForTimeout(1500); }
const log = await keep();
let nav = null;
if (linkSel) { await mark('pagechange'); const before = page.url(); await page.locator(linkSel).first().scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(900); await page.locator(linkSel).first().click({ timeout: 5000 }).catch((e) => { nav = String(e).slice(0, 160); }); await page.waitForTimeout(5000); nav = nav || { before, after: page.url() }; }
await mark('end');
const skeleton = await page.evaluate(() => [...document.body.children].map((e) => e.tagName + '.' + e.className + ' children=' + e.children.length)).catch(() => []);
const vp = await page.video().path(); await ctx.close(); await browser.close();
fs.renameSync(vp, `${dir}/${name}.webm`);
fs.writeFileSync(`${dir}/log.json`, JSON.stringify({ url, height, phases, menu, nav, skeleton, ...log }));
console.log(name, 'events', log.ev.length, 'changed-by-script', Object.keys(log.mut).length, 'samples', log.samples.length, JSON.stringify(phases), JSON.stringify({ menu, nav }));
