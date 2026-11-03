// Study a site's top menu live: structure, what opens on hover or click, timing, frame strip. Study only. Usage: node tools/record-menu.mjs <name> <url> "<trigger selector>"
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const [name, url, sel] = process.argv.slice(2); const dir = `out/motion/menu-${name}`; fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch(); const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.route(/googletagmanager|google-analytics|smartlook|hotjar|clarity\.ms/, (r) => r.abort());
const page = await ctx.newPage(); await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); await page.waitForTimeout(4500);
await page.evaluate(() => { window.__ev = []; const sel = (e) => e.tagName.toLowerCase() + '.' + String(e.className).trim().split(/\s+/).slice(0, 2).join('.'); document.addEventListener('transitionrun', (e) => { const c = getComputedStyle(e.target); if (window.__ev.length < 80) window.__ev.push([Math.round(performance.now()), sel(e.target), e.propertyName, c.transitionDuration.split(',')[0], c.transitionDelay.split(',')[0], c.transitionTimingFunction.split(/, (?![^(]*\))/)[0]].join(' ')); }, true); });
const top = await page.evaluate(() => { const h = document.querySelector('header') || document.querySelector('nav'); const items = [...h.querySelectorAll('a,button')].filter((e) => e.getBoundingClientRect().width > 0).map((e) => (e.textContent || e.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40)); return { items: items.slice(0, 24), headerHeight: Math.round(h.getBoundingClientRect().height), position: getComputedStyle(h).position }; });
console.log(JSON.stringify(top));
const triggers = page.locator(sel); const n = await triggers.count(); console.log('triggers', n);
for (let i = 0; i < Math.min(n, 3); i++) {
  const t = triggers.nth(i); const box = await t.boundingBox(); if (!box) continue;
  await page.mouse.move(700, 600); await page.waitForTimeout(700);
  const before = await page.evaluate(() => document.body.innerText.length);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
  for (let f = 0; f < 6; f++) { await page.waitForTimeout(90); await page.screenshot({ path: `${dir}/t${i}-${f}.jpg`, type: 'jpeg', quality: 55, clip: { x: 0, y: 0, width: 1440, height: 620 } }); }
  const open = await page.evaluate(() => { const v = (e) => { const c = getComputedStyle(e), r = e.getBoundingClientRect(); return c.visibility !== 'hidden' && +c.opacity > 0.5 && r.width > 200 && r.height > 80; }; return [...document.querySelectorAll('[class*=drop],[class*=menu],[class*=mega],[class*=submenu]')].filter(v).slice(0, 4).map((e) => ({ cls: String(e.className).slice(0, 50), box: [e.getBoundingClientRect()].map((r) => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])[0], bg: getComputedStyle(e).backgroundColor, blur: getComputedStyle(e).backdropFilter, text: e.innerText.replace(/\s+/g, ' ').slice(0, 220) })); });
  console.log('trigger', i, JSON.stringify(open));
}
console.log((await page.evaluate(() => window.__ev)).slice(0, 26).join('\n'));
await browser.close();
