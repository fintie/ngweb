// Turn a motion log into a readable inventory. Usage: node tools/motion-report.mjs <name>
import fs from 'node:fs';
const name = process.argv[2]; const L = JSON.parse(fs.readFileSync(`out/motion/${name}/log.json`, 'utf8'));
const out = []; const say = (s = '') => out.push(s);
say(`# Motion inventory: ${name} (${L.url}), page height ${L.height}`); say(`Phases (seconds in video): ${L.phases.map((p) => p.ph + ' ' + p.sec).join(' · ')}`);
say(`\n## CSS motion that fired, grouped (count · phases · what)`);
const g = {}; for (const e of L.ev) { const k = [e.k, e.s, e.p, e.d, e.w, e.e, e.n || ''].join(' ~ '); (g[k] ||= { n: 0, ph: new Set(), t: [], y: [] }); g[k].n++; g[k].ph.add(e.ph); if (g[k].t.length < 12) { g[k].t.push(e.t); g[k].y.push(e.y); } }
for (const [k, v] of Object.entries(g).sort((a, b) => b[1].n - a[1].n).slice(0, 90)) say(`${String(v.n).padStart(4)} [${[...v.ph].join(',')}] ${k}`);
say(`\n## Stagger: same phase + same selector, gap between starts`);
const st = {}; for (const e of L.ev) { (st[e.s + ' ~ ' + e.p] ||= []).push(e.t); }
for (const [k, ts] of Object.entries(st)) { if (ts.length < 3) continue; const gaps = ts.slice(1).map((t, i) => t - ts[i]).filter((x) => x > 0 && x < 600); if (gaps.length < 2) continue; gaps.sort((a, b) => a - b); say(`${k}: ${ts.length} starts, median gap ${gaps[gaps.length >> 1]} ms`); }
say(`\n## Changed by the site's own script (count · phases · classes added/removed · sample)`);
for (const [k, r] of Object.entries(L.mut).sort((a, b) => b[1].n - a[1].n).slice(0, 70)) say(`${String(r.n).padStart(5)} ${JSON.stringify(r.ph)} ${k} +${Object.keys(r.added).join(',')} -${Object.keys(r.removed).join(',')} ${r.vals.slice(0, 2).join(' || ')}`);
say(`\n## Scroll link: how an element's position changes per pixel of scroll (1 = moves with the page, 0 = stuck, others = own speed)`);
const tr = {}; for (const s of L.samples) { const seen = {}; for (const e of s.els) { if (seen[e.s]) continue; seen[e.s] = 1; (tr[e.s] ||= []).push({ y: s.y, top: e.top, o: e.o, tf: e.tf, sc: e.sc }); } }
for (const [k, a] of Object.entries(tr)) { if (a.length < 4) continue; const dy = a.at(-1).y - a[0].y; if (!dy) continue; const ratio = -(a.at(-1).top - a[0].top) / dy; const ops = [...new Set(a.map((x) => x.o))]; const tfs = [...new Set(a.map((x) => x.tf))].length, scs = [...new Set(a.map((x) => x.sc))].length; if (Math.abs(ratio - 1) < 0.02 && ops.length < 2 && tfs < 2 && scs < 2) continue; say(`${k}: ratio ${ratio.toFixed(2)}, ${a.length} samples, opacity values ${ops.length}, transform values ${tfs}, style values ${scs}; ${a[0].sc || ''} → ${a.at(-1).sc || ''}`); }
const file = `out/motion/${name}/REPORT.md`; fs.writeFileSync(file, out.join('\n')); console.log(file, out.length, 'lines');
