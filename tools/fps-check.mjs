// Smoothness with the machine's real graphics card (no window opens): frames per second and slowest frames per stretch of the page. Prints which renderer was used, so a software run cannot pass as a real one. Usage: node tools/fps-check.mjs <url> [url...]
import { pathToFileURL } from 'node:url';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=d3d11', '--enable-gpu-rasterization', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader=false'] });
for (const url of process.argv.slice(2)) {
  const page = await (await browser.newContext({ viewport: { width: 1600, height: 900 } })).newPage();
  await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(3000);
  const gpu = await page.evaluate(() => { const g = document.createElement('canvas').getContext('webgl'); const e = g?.getExtension('WEBGL_debug_renderer_info'); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'none'; });
  const res = await page.evaluate(async () => {
    const H = document.documentElement.scrollHeight - innerHeight, out = [], STEP = 1800;
    for (let a = 0; a < H; a += STEP) { const b = Math.min(H, a + STEP), ms = 2400, ts = []; const t0 = performance.now();
      await new Promise((r) => { (function f(t) { ts.push(t); const p = (t - t0) / ms; window.scrollTo({ top: a + (b - a) * Math.min(1, p), behavior: 'instant' }); p < 1 ? requestAnimationFrame(f) : r(); })(t0); });
      const g = ts.slice(1).map((x, i) => x - ts[i]).sort((x, y) => x - y); out.push({ from: a, fps: Math.round((1000 * ts.length) / ms), worst: Math.round(g[Math.floor(g.length * 0.98)]) }); }
    return out; });
  console.log(url, '| renderer:', gpu); for (const r of res) console.log(`  from ${String(r.from).padStart(6)}: ${r.fps} frames per second, slowest ${r.worst} ms`);
  await page.close();
}
await browser.close();
