// One tall contact sheet per page and screen size, scrolled like a visitor so reveals have fired; also reports sideways overflow and script errors. Usage: node tools/site-shots.mjs <base> <outDir> [paths...]
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const [base, out, ...only] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const PATHS = only.length ? only : ['/', '/solutions/', '/projects/', '/one-person-business/', '/one-person-business/zh/', '/community/', '/events/', '/workshops/', '/blog/', '/blog/top-ai-meetups-in-sydney/', '/faq/', '/about/', '/contact/'];
const SIZES = { wide: { width: 1440, height: 900 }, phone: { width: 375, height: 812, isMobile: true, hasTouch: true } };
const browser = await chromium.launch();
for (const [size, v] of Object.entries(SIZES)) {
  const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.isMobile, hasTouch: v.hasTouch });
  for (const p of PATHS) {
    const page = await ctx.newPage(), errs = []; page.on('pageerror', (e) => errs.push(String(e).slice(0, 120))); page.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 120))); page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(base)) errs.push(r.status() + ' ' + r.url().replace(base, '')); });
    await page.goto(base + p, { waitUntil: 'load' }); await page.waitForTimeout(1600);
    const H = await page.evaluate(() => document.documentElement.scrollHeight), sw = await page.evaluate(() => document.documentElement.scrollWidth);
    const name = (p.replace(/\//g, '_') || '_') + '-' + size; let i = 0;
    for (let y = 0; y < H; y += v.height * 0.92, i++) { await page.evaluate((t) => window.scrollTo({ top: t, behavior: 'instant' }), y); await page.waitForTimeout(650); if (i % (size === 'wide' ? 1 : 1) === 0) await page.screenshot({ path: `${out}/${name}-${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 55 }); }
    console.log(p, size, 'height', H, sw > v.width ? `SIDEWAYS ${sw}` : 'ok', i, 'frames', errs.length ? JSON.stringify(errs.slice(0, 4)) : '');
    await page.close();
  }
  await ctx.close();
}
await browser.close();
