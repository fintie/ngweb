// Does a page have the reference's signature motions? Reads motion logs (out/motion/<name>/log.json) and prints one row per motion. Usage: node tools/motion-compare.mjs redstone v2 v3
import fs from 'node:fs';
const names = process.argv.slice(2);
const load = (n) => JSON.parse(fs.readFileSync(`out/motion/${n}/log.json`, 'utf8'));
const evs = (L, re, k) => L.ev.filter((e) => (!k || e.k === k) && re.test(e.s + ' ' + e.p + ' ' + e.d + ' ' + e.e));
const mut = (L, re) => Object.entries(L.mut).filter(([k]) => re.test(k)).reduce((a, [, r]) => a + r.n, 0);
const grew = (L) => { let min = 1e9, max = 0; for (const s of L.samples) for (const e of s.els) { const m = /width: ?([\d.]+)px/.exec(e.sc || ''); if (m && /grow|videoBlock/.test(e.s)) { min = Math.min(min, +m[1]); max = Math.max(max, +m[1]); } } return max ? max / min : 0; };
const stag = (L, re) => { const t = L.ev.filter((e) => re.test(e.s) && e.p === 'transform').map((e) => e.t), g = t.slice(1).map((x, i) => x - t[i]).filter((x) => x > 0 && x < 300).sort((a, b) => a - b); return g.length ? g[g.length >> 1] : 0; };
const ROWS = [
  ['picture grows with scroll (times bigger)', (L) => +grew(L).toFixed(1), (v) => v >= 3],
  ['word reveal 1.5 s (events)', (L) => evs(L, /(text-animate__word|\bw) > i transform 1\.5s/).length, (v) => v >= 10],
  ['block rise 1.5 s (events)', (L) => evs(L, /slide-up|\bsu\b.*1\.5s/, 'an').length, (v) => v >= 3],
  ['card rise 0.8 s curve (events)', (L) => evs(L, /transform 0\.8s cubic-bezier\(0\.215/).length, (v) => v >= 3],
  ['cursor trails the mouse (changes)', (L) => mut(L, /(div\.cursor|div#cur\.cur|div\.cur).*style/), (v) => v >= 50],
  ['cursor states change (changes)', (L) => mut(L, /(div\.cursor|div#cur\.cur).*class/), (v) => v >= 4],
  ['number flip with overshoot (events)', (L) => evs(L, /cubic-bezier\(0\.4, 2, 0\.6, 1\)/).length, (v) => v >= 3],
  ['drag band moved by script (changes)', (L) => mut(L, /(marquee-item|mq > div).*style/), (v) => v >= 50],
  ['button swap 0.5 s curve (events)', (L) => evs(L, /(btn|btn-text|btn-icon| ic| tx| > span\.(ic|tx))[^~]*0\.5s cubic-bezier\(0\.65/).length, (v) => v >= 3],
  ['text fill step by step (changes)', (L) => mut(L, /(h3 > span|fill > span|state.* > span).*style/), (v) => v >= 10],
  ['accordion/hover panels (events)', (L) => evs(L, /(service-title|accordion-title|span\.a).* transform 0\.[35]s/).length, (v) => v >= 3],
];
const logs = names.map(load);
console.log(['motion', ...names].join(' | '));
let hits = names.map(() => 0);
for (const [label, fn, ok] of ROWS) { const vals = logs.map(fn); vals.forEach((v, i) => { if (ok(v)) hits[i]++; }); console.log([label, ...vals.map((v) => `${ok(v) ? 'yes' : 'NO'} (${v})`)].join(' | ')); }
console.log(['present', ...hits.map((h) => `${h} of ${ROWS.length}`)].join(' | '));
