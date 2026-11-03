// Walk the interactive OPC service-plan tool: both languages, wizard inputs, generated result.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const main = () => page.evaluate(() => {
  const t = document.body.innerText;
  const a = t.indexOf('Request a call'), b = t.search(/\nNextGenius\n\s*\n?\s*(Practical AI delivery|面向)/);
  return t;
});
const form = () => page.evaluate(() => [...document.querySelectorAll('input,textarea,select,button')].map(e => ({
  tag: e.tagName.toLowerCase(), type: e.type, name: e.name, id: e.id, ph: e.placeholder, text: (e.innerText || e.value || '').trim().slice(0, 60),
  label: e.closest('label')?.innerText?.trim().slice(0, 80) || '', options: e.tagName === 'SELECT' ? [...e.options].map(o => o.text) : undefined,
})));
const out = {};
await page.goto('https://nextgenius.com.au/#/opc', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
out.en = await main();
out.formEn = await form();
// Chinese
await page.click('text=中文'); await page.waitForTimeout(800);
out.zh = await main();
out.formZh = await form();
await page.screenshot({ path: 'out/pages/opc-zh.png', fullPage: true });
await page.click('text=English'); await page.waitForTimeout(500);
fs.writeFileSync('out/opc-interactive.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.formEn, null, 0).slice(0, 4000));
await browser.close();
