// Behaviour checks on the template with a real mouse and real scrolling, including the opposite case for each. Usage: node tools/v3-check.mjs <url>
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const url = process.argv[2];
const browser = await chromium.launch(); const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = []; page.on('pageerror', (e) => errs.push(String(e))); page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(2500);
const rect = (s) => page.evaluate((q) => { const r = document.querySelector(q).getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; }, s);
const to = async (y) => { await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(900); };
const cursor = () => page.evaluate(() => ({ on: document.querySelector('#cur').classList.contains('on'), label: document.querySelector('#curL').textContent, scale: new DOMMatrix(getComputedStyle(document.querySelector('#curL')).transform).a }));
console.log('slot', await rect('#slot'), 'card at top', await rect('#grow'));
console.log('video', await page.evaluate(() => { const v = document.querySelector('#grow video'); return { ready: v.readyState, paused: v.paused, width: v.videoWidth }; }));
const fsTop = await page.evaluate(() => document.querySelector('#fs').getBoundingClientRect().top + scrollY);
for (const f of [0.25, 0.5, 0.75, 1]) { await to(fsTop * f); console.log('scroll', f, await rect('#grow')); }
await to(fsTop + 500); console.log('inside stretch', await rect('#grow'));
await to(fsTop + 1100); console.log('leaving', await rect('#grow'));
await to(fsTop + 2200); console.log('gone, visibility', await page.evaluate(() => getComputedStyle(document.querySelector('#grow')).visibility));
// cursor: over nothing, then over a named thing, then off again
await to(0); await page.mouse.move(300, 500, { steps: 6 }); await page.waitForTimeout(900); console.log('cursor over plain text', await cursor());
await page.locator('.tile').first().scrollIntoViewIfNeeded(); await page.waitForTimeout(1200);
const b = await page.locator('.tile .shot').first().boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 12 }); await page.waitForTimeout(1000); console.log('cursor over project', await cursor());
await page.locator('.mq').first().scrollIntoViewIfNeeded(); await page.waitForTimeout(800);
const m = await page.locator('.mq').first().boundingBox(); await page.mouse.move(m.x + 500, m.y + m.height / 2, { steps: 8 }); await page.waitForTimeout(900); console.log('cursor over band', await cursor());
const tf = () => page.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('.mq>div')).transform).e);
const t0 = await tf(); await page.mouse.down(); await page.mouse.move(m.x + 860, m.y + m.height / 2, { steps: 14 }); await page.waitForTimeout(500); await page.mouse.up(); await page.waitForTimeout(300); const t1 = await tf(); console.log('drag moved band by', Math.round(t1 - t0), 'px');
// button swap
await to(0); await page.waitForTimeout(600); const btn = page.locator('.hero .btn').first(); const i0 = await btn.locator('.ic').boundingBox(); await btn.hover(); await page.waitForTimeout(800); const i1 = await btn.locator('.ic').boundingBox(); console.log('button circle moved', Math.round(i1.x - i0.x), 'px');
// frame rate in this test browser (no graphics card, so worst case)
const fps = await page.evaluate(async () => { const run = async (a, b, ms) => { const ts = []; const t0 = performance.now(); await new Promise((r) => { (function f(t) { ts.push(t); const p = (t - t0) / ms; window.scrollTo({ top: a + (b - a) * Math.min(1, p), behavior: 'instant' }); p < 1 ? requestAnimationFrame(f) : r(); })(t0); }); return Math.round((1000 * ts.length) / ms); }; return { growing: await run(0, 1000, 2000), reel: await run(1000, 2300, 1500), rest: await run(2300, document.documentElement.scrollHeight - innerHeight, 4000) }; });
console.log('frames per second, worst case', fps, 'errors', errs);
await browser.close();
