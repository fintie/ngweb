// Screen-record our own three product sites (slow scroll) and turn each into a short silent looping mp4 for the design.
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const APPS = { lunchup: 'https://lunchup.com.au/', stem: 'https://stem.nextgenius.com.au/', studio: 'https://studio.nextgenius.com.au/' };
const out = 'design/hero2/video'; const tmp = 'out/video/apps'; fs.mkdirSync(tmp, { recursive: true });
const browser = await chromium.launch();
for (const [name, url] of Object.entries(APPS)) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, recordVideo: { dir: tmp, size: { width: 1280, height: 800 } } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1800);
  await page.mouse.move(640, 400, { steps: 10 });
  for (let i = 0; i < 7; i++) { for (let k = 0; k < 5; k++) { await page.mouse.wheel(0, 70); await page.waitForTimeout(60); } await page.waitForTimeout(650); }
  await page.waitForTimeout(500);
  const vp = await page.video().path(); await ctx.close();
  fs.renameSync(vp, `${tmp}/${name}.webm`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '1.2', '-i', `${tmp}/${name}.webm`, '-t', '8', '-an', '-vf', 'scale=960:-2,fps=30', '-c:v', 'libx264', '-crf', '27', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${out}/${name}.mp4`]);
  console.log(name, (fs.statSync(`${out}/${name}.mp4`).size / 1e6).toFixed(2), 'MB');
}
await browser.close();
