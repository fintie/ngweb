// 1) shallow capture of the three linked product sites  2) labelled contact sheet of all downloaded images
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
fs.mkdirSync('out/external', { recursive: true });
const sites = { lunchup: 'https://lunchup.com.au/', stem: 'https://stem.nextgenius.com.au/', studio: 'https://studio.nextgenius.com.au/' };
const summary = {};
for (const [k, url] of Object.entries(sites)) {
  try {
    const r = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2000);
    const d = await page.evaluate(() => ({
      title: document.title, url: location.href,
      description: document.querySelector('meta[name=description]')?.content || '',
      text: document.body.innerText.slice(0, 12000),
      headings: [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ': ' + h.innerText.trim()).slice(0, 60),
      links: [...new Set([...document.querySelectorAll('a[href]')].map(a => a.href))].slice(0, 60),
      images: [...document.images].map(i => ({ src: i.currentSrc || i.src, alt: i.alt })).slice(0, 40),
    }));
    d.status = r.status();
    fs.writeFileSync(`out/external/${k}.json`, JSON.stringify(d, null, 1));
    await page.screenshot({ path: `out/external/${k}.png` });
    summary[k] = { status: d.status, title: d.title, chars: d.text.length, headings: d.headings.length, links: d.links.length };
  } catch (e) { summary[k] = { error: String(e).slice(0, 150) }; }
}
console.log(JSON.stringify(summary, null, 1));

// contact sheet
const dir = 'out/images';
const files = fs.readdirSync(dir).filter(f => /\.(jpg|png)$/.test(f));
const html = '<body style="margin:0;background:#fff;font:14px sans-serif"><div style="display:grid;grid-template-columns:repeat(4,350px);gap:10px;padding:10px">' +
  files.map(f => `<figure style="margin:0"><img src="file:///${path.resolve(dir, f).replace(/\\/g, '/')}" style="width:350px;height:230px;object-fit:contain;background:#eee"><figcaption>${f}</figcaption></figure>`).join('') + '</div></body>';
fs.writeFileSync('out/contact-sheet.html', html);
await page.goto('file:///' + path.resolve('out/contact-sheet.html').replace(/\\/g, '/'));
await page.waitForTimeout(800);
await page.screenshot({ path: 'out/contact-sheet.png', fullPage: true });
await browser.close();
