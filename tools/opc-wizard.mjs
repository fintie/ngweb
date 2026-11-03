// Run the OPC planner with every delivery format and hours option; save each generated plan.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const results = [];
const base = async () => { await page.goto('https://nextgenius.com.au/#/opc', { waitUntil: 'networkidle' }); await page.waitForTimeout(800); };
await base();
const before = await page.evaluate(() => document.body.innerText);
// example button first
await page.click('text=Try an automation example'); await page.waitForTimeout(400);
const example = await page.evaluate(() => ({
  expertise: document.querySelector('[name=expertise]').value, customer: document.querySelector('[name=customer]').value,
  problem: document.querySelector('[name=problem]').value, format: document.querySelector('[name=format]').value, hours: document.querySelector('[name=hours]').value }));
console.log('example prefill', JSON.stringify(example));
const formats = ['Review & action plan', 'Setup & implementation', 'Content & research package', 'Training & coaching'];
const hours = ['3–5', '5–10', '10–20', '20+'];
for (const lang of ['English', '中文']) {
  await page.click('text=' + lang); await page.waitForTimeout(400);
  for (let i = 0; i < formats.length; i++) {
    await page.fill('[name=expertise]', example.expertise); await page.fill('[name=customer]', example.customer); await page.fill('[name=problem]', example.problem);
    await page.selectOption('[name=format]', { index: i }); await page.selectOption('[name=hours]', { index: i });
    await page.locator('form:has([name=hours]) button[type=submit]').click();
    await page.waitForTimeout(700);
    const txt = await page.evaluate(() => document.body.innerText + '\n\n[[EDITABLE TEXTAREA]]\n' + [...document.querySelectorAll('textarea')].map(t => t.value).join('\n---\n'));
    const shot = `out/pages/opc-plan-${lang === 'English' ? 'en' : 'zh'}-${i}.png`;
    results.push({ lang, format: i, hours: i, text: txt });
    if (i === 0) await page.screenshot({ path: shot, fullPage: true });
  }
}
fs.writeFileSync('out/opc-wizard.json', JSON.stringify({ before, example, results }, null, 1));
console.log('lengths', results.map(r => r.text.length).join(','));
for (const i of [0, 4]) console.log('\n##', results[i].lang, i, '\n' + results[i].text.split('[[EDITABLE TEXTAREA]]')[1]);
await browser.close();
