// Who links to whom on the built site, split into links inside the page content and links in the header and footer. Usage: node tools/link-map.mjs [distDir]
import fs from 'node:fs';
import path from 'node:path';
const dist = process.argv[2] ?? 'site/dist', pages = {};
const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html') pages['/' + path.relative(dist, d).replaceAll('\\', '/') + (d === dist ? '' : '/')] = fs.readFileSync(p, 'utf8'); } }; walk(dist);
const links = (h) => [...h.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)].map((m) => m[1]).filter((u) => !/\.[a-z0-9]+$/i.test(u));
const body = (h) => (/<main[\s\S]*<\/main>/.exec(h) || [''])[0], talk = (h) => (/class="wrap talk"[\s\S]*?class="wrap fcols"/.exec(h) || [''])[0];
const inMain = {}, inAll = {}; for (const u of Object.keys(pages)) { inMain[u] = new Set(); inAll[u] = new Set(); }
for (const [u, h] of Object.entries(pages)) { for (const l of links(body(h))) if (inMain[l] && l !== u) inMain[l].add(u); for (const l of links(h)) if (inAll[l] && l !== u) inAll[l].add(u); }
console.log('page | linked from content of N pages | from anywhere | links out from its content');
for (const u of Object.keys(pages).sort()) { const out = [...new Set(links(body(pages[u])))].filter((l) => l !== u); console.log(`${u} | ${inMain[u].size} | ${inAll[u].size} | ${out.length}: ${out.map((o) => o.replace(/^\/|\/$/g, '').replace(/^blog\/.*/, 'article').replace(/^$/, 'home')).join(' ')}`); }
const header = /<nav class="hnav[\s\S]*?<\/nav>/.exec(pages['/'])?.[0] ?? ''; console.log('in the top menu:', [...header.matchAll(/href="([^"]+)/g)].length, 'links');
