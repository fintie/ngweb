// Screenshot a local page at phone and wide sizes, one frame per viewport-height of scroll. Usage: node tools/shots.mjs <url> <outDir>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const [url, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const SIZES = { phone: { width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }, wide: { width: 1600, height: 900 } };
for (const [name, vp] of Object.entries(SIZES)) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
  const page = await ctx.newPage(); const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text())); page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(3500);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  let i = 0;
  for (let y = 0; y < H; y += vp.height * 0.9, i++) {
    await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y); await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/${name}-${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 70 });
  }
  console.log(name, 'height', H, 'scrollWidth', sw, 'frames', i, 'errors', errs.slice(0, 5));
  await ctx.close();
}
await browser.close();
