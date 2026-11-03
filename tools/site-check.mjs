// Checks the built site without a browser: every old content unit has a home, every internal link and picture exists, every page has one main heading and its own title. Usage: node tools/site-check.mjs [distDir] [extraUnitThatMustExist]
import fs from 'node:fs';
import path from 'node:path';
const dist = process.argv[2] ?? 'site/dist', extra = process.argv[3];
const csv = (f) => { const s = fs.readFileSync(f, 'utf8').replace(/^﻿/, ''), R = []; let r = [], c = '', q = false; for (let i = 0; i < s.length; i++) { const x = s[i]; if (q) { if (x === '"' && s[i + 1] === '"') { c += '"'; i++; } else if (x === '"') q = false; else c += x; } else if (x === '"') q = true; else if (x === ',') { r.push(c); c = ''; } else if (x === '\n') { r.push(c); R.push(r); r = []; c = ''; } else if (x !== '\r') c += x; } const [h, ...b] = R; return b.map((v) => Object.fromEntries(h.map((k, i) => [k, v[i] ?? '']))); };
const pages = []; const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html') pages.push(p); } }; walk(dist);
const url = (p) => '/' + path.relative(dist, path.dirname(p)).replaceAll('\\', '/').replace(/^$/, '').concat('/').replace(/^\/$/, '');
const html = Object.fromEntries(pages.map((p) => [url(p).replace('//', '/'), fs.readFileSync(p, 'utf8')]));
const problems = [], say = (s) => problems.push(s);
// unit coverage: each unit must be marked on the page the map promises
const units = csv('knowledge-base/migration/units.csv'); const need = units.filter((u) => !/drop|keep-link/.test(u.action)); if (extra) need.push({ unit: extra, new_page: '/', section: 'test' });
let ok = 0; for (const u of need) { const hay = u.new_page === '(all)' ? Object.values(html).join(' ') : html[u.new_page] ?? ''; if (new RegExp(`data-unit="[^"]*\\b${u.unit}\\b`).test(hay)) ok++; else say(`unit ${u.unit} not on ${u.new_page}: ${u.section.slice(0, 50)}`); }
// links, pictures, headings, titles
const titles = {}; let links = 0, assets = 0;
for (const [u, h] of Object.entries(html)) {
  // Static redirect stubs intentionally have no content or page metadata.
  const redirect = /<meta[^>]*http-equiv="refresh"[^>]*content="[^"]*url=([^";]+)"/i.exec(h)?.[1];
  if (redirect) {
    const target = new URL(redirect, 'https://nextgenius.com.au');
    if (target.origin !== 'https://nextgenius.com.au' || !html[target.pathname]) say(`${u}: invalid redirect ${redirect}`);
    else links++;
    continue;
  }
  const hs = (h.match(/<h1[\s>]/g) || []).length; if (hs !== 1) say(`${u}: ${hs} main headings`);
  for (const m of h.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)) {
    // The keyboard skip link is the only intentional in-page destination.
    if (m[1].includes('#') && !/class="skip-link"/.test(m[0])) say(`${u}: fragment navigation ${m[1]}`);
    if (/^https?:\/\/(?:localhost|127\.0\.0\.1)(?=[:/]|$)/.test(m[1])) say(`${u}: local preview link ${m[1]}`);
  }
  const t = /<title>([^<]*)/.exec(h)?.[1]; if (!t) say(`${u}: no title`); (titles[t] ||= []).push(u);
  if (!/<meta name="description" content="[^"]{30,}/.test(h)) say(`${u}: no description`);
  if (!/rel="canonical"/.test(h)) say(`${u}: no canonical address`);
  for (const m of h.matchAll(/(?:href|src|poster|data-v)="(\/[^"#?]*)(#[^"]*)?/g)) { const p = m[1], file = path.join(dist, p.endsWith('/') ? p + 'index.html' : p); links++; if (!fs.existsSync(file)) say(`${u}: dead ${p}`); else if (m[2] && m[2].length > 1 && !fs.readFileSync(file, 'utf8').includes(`id="${m[2].slice(1)}"`)) say(`${u}: no anchor ${p}${m[2]}`); }
  for (const m of h.matchAll(/href="(#[^"]+)"/g)) if (!h.includes(`id="${m[1].slice(1)}"`)) say(`${u}: no anchor ${m[1]}`);
  for (const m of h.matchAll(/<img [^>]*>/g)) {
    assets++;
    // HTML permits alt="" to be serialized as a bare alt attribute.
    if (!/\salt(?:\s|=|\/?>)/.test(m[0])) say(`${u}: picture without alt`);
    const srcset = /srcset="([^"]+)"/.exec(m[0])?.[1];
    if (srcset) for (const candidate of srcset.split(',')) {
      const source = candidate.trim().split(/\s+/)[0];
      if (source.startsWith('/') && !fs.existsSync(path.join(dist, source))) say(`${u}: dead responsive picture ${source}`);
    }
  }
}
for (const [t, l] of Object.entries(titles)) if (l.length > 1) say(`same title on ${l.join(' ')}`);
console.log(`pages ${Object.keys(html).length} | units ${ok} of ${need.length} placed | internal links checked ${links} | pictures ${assets} | problems ${problems.length}`); problems.slice(0, 30).forEach((p) => console.log(' -', p)); process.exit(problems.length ? 1 : 0);
