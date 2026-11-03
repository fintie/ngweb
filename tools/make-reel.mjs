// Render our showreel frame by frame from design/hero3/_reel/seg.html, then join the parts with pixel transitions. Needs the 8803 preview server. Usage: node tools/make-reel.mjs
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const FPS = 30, X = 0.45, tmp = 'out/reel';
const SEGS = [['logo', 1.7], ['letters', 2.5], ['app:lunchup:cover-1:LunchUp', 3], ['graph', 3.2], ['app:stem:cover-3:STEM Learning App', 3], ['busy', 1.9], ['app:studio:cover-2:AI Creative Studio', 3], ['logo', 0.9]];
fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
const browser = await chromium.launch(); const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.goto('http://127.0.0.1:8803/_reel/seg.html', { waitUntil: 'networkidle' }); await page.evaluate(() => window.prep());
const parts = [];
for (const [i, [seg, dur]] of SEGS.entries()) {
  const dir = `${tmp}/${i}`; fs.mkdirSync(dir); const n = Math.round(dur * FPS);
  for (let f = 0; f < n; f++) { await page.evaluate(([s, t, d]) => window.seek(s, t, d), [seg, f / FPS, dur]); await page.screenshot({ path: `${dir}/${String(f).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 }); }
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', `${dir}/%04d.jpg`, '-c:v', 'libx264', '-crf', '16', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', `${tmp}/p${i}.mp4`]);
  fs.rmSync(dir, { recursive: true }); parts.push({ file: `${tmp}/p${i}.mp4`, dur }); console.log(seg, n, 'frames');
}
await browser.close();
const args = ['-v', 'error', '-y']; parts.forEach((p) => args.push('-i', p.file));
let chain = '', last = '[0:v]', off = 0;
for (let i = 1; i < parts.length; i++) { off += parts[i - 1].dur - X; const lab = i === parts.length - 1 ? '[out]' : `[v${i}]`; chain += `${last}[${i}:v]xfade=transition=pixelize:duration=${X}:offset=${off.toFixed(3)}${lab}${i === parts.length - 1 ? '' : ';'}`; last = lab; }
args.push('-filter_complex', chain, '-map', '[out]', '-an', '-c:v', 'libx264', '-crf', '24', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'design/hero3/video/reel.mp4');
execFileSync('ffmpeg', args);
console.log('reel', (fs.statSync('design/hero3/video/reel.mp4').size / 1e6).toFixed(2), 'MB');
