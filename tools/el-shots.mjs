// Element screenshots of selected sections at several widths, stitched into one sheet. Usage: node tools/el-shots.mjs <url> <outfile> <selector> [widths]
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const [url, out, sel, ws = '375,1600,2560'] = process.argv.slice(2);
const browser = await chromium.launch(); const dir = out.replace(/\.[a-z]+$/, '-parts'); fs.mkdirSync(dir, { recursive: true });
for (const w of ws.split(',').map(Number)) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.goto(url, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
  const el = page.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(1500);
  await el.screenshot({ path: `${dir}/${w}.jpg`, type: 'jpeg', quality: 75 }); await page.close();
}
await browser.close(); console.log(fs.readdirSync(dir).join(' '));
