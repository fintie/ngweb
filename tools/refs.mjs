// Study captures of two reference sites: scroll-step screenshots + measured design tokens. Study only; nothing is copied into the product.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const SITES = { redstone: 'https://redstone.software/', findrealestate: 'https://www.findrealestate.com/', sincro: 'https://sincro.es/en/us/' };
const only = process.argv[2];
const browser = await chromium.launch();
for (const [name, url] of Object.entries(SITES)) {
  if (only && only !== name) continue;
  const dir = `out/ref/${name}`; fs.mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);
  // dismiss common cookie banners (study captures only)
  for (const t of ['Accept', 'Accept all', 'Reject', 'Got it', 'OK']) { try { await page.getByRole('button', { name: t, exact: false }).first().click({ timeout: 500 }); break; } catch {} }
  let total = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = 650; let n = 0, y = 0;
  while (y < total && n < 60) {
    await page.mouse.wheel(0, n === 0 ? 0 : step); await page.waitForTimeout(700);
    await page.screenshot({ path: `${dir}/${String(n).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 70 });
    y = await page.evaluate(() => scrollY); total = await page.evaluate(() => document.documentElement.scrollHeight); n++;
    if (n > 1 && y === prevY) break; var prevY = y;
  }
  const tokens = await page.evaluate(() => {
    const cs = (el) => getComputedStyle(el);
    const count = (arr) => Object.entries(arr.reduce((a, k) => (a[k] = (a[k] || 0) + 1, a), {})).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const els = [...document.querySelectorAll('body *')].filter((e) => e.offsetParent !== null || e.tagName === 'BODY');
    const heads = [...document.querySelectorAll('h1,h2,h3')].slice(0, 25).map((h) => ({ tag: h.tagName, text: h.innerText.trim().slice(0, 80), size: cs(h).fontSize, weight: cs(h).fontWeight, font: cs(h).fontFamily.split(',')[0], color: cs(h).color, lh: cs(h).lineHeight, ls: cs(h).letterSpacing }));
    const secs = [...document.querySelectorAll('section, main > div, header, footer')].slice(0, 30).map((s) => { const r = s.getBoundingClientRect(); return { tag: s.tagName.toLowerCase(), top: Math.round(r.top + scrollY), h: Math.round(r.height), pad: cs(s).padding, bg: cs(s).backgroundColor, text: s.innerText.trim().slice(0, 60).replace(/\n/g, ' / ') }; });
    return {
      title: document.title, height: document.documentElement.scrollHeight,
      bodyFont: cs(document.body).fontFamily, bodySize: cs(document.body).fontSize, bodyBg: cs(document.body).backgroundColor, bodyColor: cs(document.body).color,
      fonts: count(els.map((e) => cs(e).fontFamily.split(',')[0].trim())), colors: count(els.map((e) => cs(e).color)), backgrounds: count(els.map((e) => cs(e).backgroundColor).filter((c) => c !== 'rgba(0, 0, 0, 0)')),
      radii: count(els.map((e) => cs(e).borderRadius).filter((r) => r !== '0px')), shadows: count(els.map((e) => cs(e).boxShadow).filter((s) => s !== 'none')),
      buttons: [...document.querySelectorAll('a,button')].filter((b) => /^(get|book|start|contact|request|try|see|view|learn|talk|schedule|explore)/i.test(b.innerText.trim())).slice(0, 8).map((b) => ({ text: b.innerText.trim().slice(0, 40), bg: cs(b).backgroundColor, color: cs(b).color, radius: cs(b).borderRadius, pad: cs(b).padding, size: cs(b).fontSize })),
      headings: heads, sections: secs, nav: [...document.querySelectorAll('nav a')].slice(0, 12).map((a) => a.innerText.trim()), maxWidths: count([...document.querySelectorAll('section > div, main > div > div')].map((e) => cs(e).maxWidth).filter((w) => w !== 'none')),
    };
  });
  fs.writeFileSync(`${dir}/tokens.json`, JSON.stringify(tokens, null, 1));
  fs.writeFileSync(`${dir}/text.txt`, await page.evaluate(() => document.body.innerText));
  console.log(name, 'screens', n, 'height', tokens.height, 'fonts', JSON.stringify(tokens.fonts.slice(0, 3)));
  await ctx.close();
}
await browser.close();
