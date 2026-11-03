// Does any element's text run wider than the screen? Checks the two giant words at many widths. Usage: node tools/fit-check.mjs <url> <selector,selector>
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const [url, sels] = process.argv.slice(2);
const browser = await chromium.launch(); let bad = 0;
for (const w of [320, 375, 414, 768, 1024, 1440, 1920, 2560]) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(1200);
  const r = await page.evaluate((s) => s.split(',').map((q) => { const e = document.querySelector(q); if (!e) return { q, missing: true }; const g = document.createRange(); g.selectNodeContents(e); const b = g.getBoundingClientRect(); return { q, right: Math.round(b.right), left: Math.round(b.left), vw: innerWidth }; }), sels);
  for (const x of r) { const ok = !x.missing && x.right <= x.vw - 4 && x.left >= 0; if (!ok) bad++; console.log(w, x.q, x.missing ? 'MISSING' : `left ${x.left} right ${x.right}`, ok ? 'ok' : 'CLIPPED'); }
  await page.close();
}
await browser.close(); console.log(bad ? `${bad} clipped` : 'all fit');
