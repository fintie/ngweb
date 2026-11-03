// Text check on a rendered page: counts technical words a business owner should not meet, and lists every number so it can be traced to the knowledge base. Usage: node tools/copy-check.mjs <url> [url...]
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(pathToFileURL('C:/Dev/Claude_harness/node_modules/playwright-core/index.mjs').href);
const BAN = ['RAG', 'MCP', 'SOPs?', 'SMEs?', 'CRM', 'OPC', 'shelfware', 'roadmap', 'bottlenecks?', 'implementation', 'leverage', 'seamless', 'robust', 'cutting-edge', 'transform\\w*', 'solutions? versus', 'follow-through', 'adoption', 'scoped?', 'pilot'];
const kb = []; const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) { if (!/images|migration|vendor/.test(f)) walk(p); } else if (p.endsWith('.md')) kb.push(fs.readFileSync(p, 'utf8')); } }; walk('knowledge-base');
const KB = kb.join('\n');
const browser = await chromium.launch();
for (const url of process.argv.slice(2)) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } }); await page.goto(url, { waitUntil: 'load' }); await page.waitForTimeout(1500);
  const text = await page.evaluate(() => { document.querySelectorAll('script,style,.hint').forEach((e) => e.remove()); return document.body.textContent.replace(/\s+/g, ' '); });
  const hits = BAN.flatMap((b) => (text.match(new RegExp(`\\b${b}\\b`, 'gi')) || []).map((m) => m));
  const words = text.trim().split(' ').filter((w) => /[a-z]/i.test(w)), long = text.split(/(?<=[.!?])\s+/).filter((s) => s.split(' ').length > 22);
  const nums = [...new Set(text.match(/\d[\d–,.]*/g) || [])].map((n) => n.replace(/[.,]$/, '')); const missing = nums.filter((n) => !KB.includes(n));
  console.log(url, '| words', words.length, '| technical words', hits.length, hits.length ? JSON.stringify(hits) : '', '| sentences over 22 words', long.length, '| numbers', nums.join(' '), '| numbers not in knowledge base', missing.length, missing.join(' '));
  await page.close();
}
await browser.close();
