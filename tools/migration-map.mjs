// Relation layer for the migration: every content unit with its images, CTAs, graph entities, related units,
// duplicates and open issues, plus blank columns (new_page, new_section, action, notes) for the redesign.
import fs from 'node:fs';
const kb = JSON.parse(fs.readFileSync('knowledge-base/kb.json', 'utf8'));
const graph = JSON.parse(fs.readFileSync('knowledge-base/graph.json', 'utf8'));
const OUT = 'knowledge-base/migration';
fs.mkdirSync(OUT, { recursive: true });

const units = kb.chunks.filter((c) => !['image'].includes(c.type));
const nodeById = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
const entsOf = {}; // chunk id -> [node]
for (const n of graph.nodes) for (const id of n.chunks) (entsOf[id] ??= []).push(n);
const words = (t) => new Set(t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(' ').filter((w) => w.length > 3));
const jac = (a, b) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1); };

// page-level issues verified in the crawl (see 00-OUTLINE.md section 7)
const PAGE_ISSUES = {
  '/workshop': ['title tag is a copy of the contact page', 'no meta description / social tags / structured data', 'no H1'],
  '/service': ['no H1 (starts with H2, lead sentence is an H4)', 'images are AI art from the Creative Studio, not services'],
  '/use-cases': ['STEM image is an architecture diagram; product site is titled "MathTutor Pro"', 'generic image alt text'],
  '/events': ['no dates, venue or booking link; "View events" links to itself'],
  '/blog': ['visitor-facing text talks about "AI-generated discovery paths"'],
  '/ai-meetup-sydney': ['route shows "Page not found" although content exists in code'], '/ai-events-sydney': ['route shows "Page not found" although content exists in code'], '/learn-ai-sydney': ['route shows "Page not found" although content exists in code'],
};
const BLOG = /^\/blog\//;

const rows = units.map((c, i) => ({
  unit: 'u' + String(i + 1).padStart(3, '0'), chunk: c.id, type: c.type, route: c.route, page: c.page, section: c.heading, eyebrow: c.eyebrow || '',
  visible_on_live_site: c.type !== 'code-only' && c.type !== 'meta' ? 'yes' : c.type === 'meta' ? 'in tab/search only' : 'NO (in code only)',
  words: c.text.split(/\s+/).filter(Boolean).length, text: c.text,
  images: c.images ?? [], ctas: c.ctas ?? [],
  entities: (entsOf[c.id] ?? []).sort((a, b) => b.degree - a.degree).map((n) => ({ name: n.name, type: n.type, group: n.community < 0 ? 'other' : graph.reports[n.community].title })),
  issues: PAGE_ISSUES[c.route] ?? (BLOG.test(c.route) && c.type === 'blog' ? ['article body not shown on live page (see code-only units)'] : []),
}));
// related units: shared graph entities (weighted by rarity), different section
const df = {}; rows.forEach((r) => new Set(r.entities.map((e) => e.name)).forEach((n) => (df[n] = (df[n] || 0) + 1)));
for (const r of rows) {
  const mine = new Set(r.entities.map((e) => e.name));
  r.related = rows.filter((o) => o !== r && o.type !== 'meta').map((o) => {
    let s = 0; for (const e of o.entities) if (mine.has(e.name) && e.name !== 'NextGenius') s += 1 / Math.log(2 + df[e.name]);
    return [o.unit, s];
  }).filter((x) => x[1] > 0.6).sort((a, b) => b[1] - a[1]).slice(0, 5).map((x) => x[0]);
}
// duplicates: near-identical wording on another page
const W = rows.map((r) => words(r.text));
rows.forEach((r, i) => {
  r.duplicate_of = '';
  if (r.type === 'meta' || W[i].size < 8) return;
  for (let j = 0; j < i; j++) if (rows[j].type !== 'meta' && rows[j].route !== r.route && jac(W[i], W[j]) >= 0.8) { r.duplicate_of = rows[j].unit; break; }
});
// suggested action (human decides; blank design columns follow)
for (const r of rows) {
  r.suggested_action = r.type === 'meta' ? 'rewrite (SEO title/description for new page)'
    : r.duplicate_of ? `merge – same wording as ${r.duplicate_of}`
    : r.type === 'code-only' ? 'decide – never shown on old site'
    : r.type === 'product' ? 'reference only – lives on its own site'
    : r.route === '(all)' ? 'rebuild as global header/footer'
    : 'keep / rewrite';
  r.new_page = ''; r.new_section = ''; r.action = ''; r.notes = '';
}
// page level + link graph
const pages = kb.pages.map((p) => {
  const d = JSON.parse(fs.readFileSync(`out/pages/${p.slug}.json`, 'utf8'));
  return { route: p.route, old_url: p.url, title_tag: p.title, meta_description: p.metas.description || '', structured_data: p.ld.join(' '), units: rows.filter((r) => r.route === p.route).length,
    links_to: [...new Set(d.links.filter((l) => l.startsWith('#/')).map((l) => l.slice(1)))].join(' '), issues: (PAGE_ISSUES[p.route] ?? []).join(' | '), new_url: '', redirect_needed: p.route === '/' ? 'no' : 'yes (hash URL → real URL)', notes: '' };
});
const assets = kb.images.map((i) => ({ file: i.file, shows: i.desc, alt_now: i.alts.join('; '), used_on: i.pages.join(' '), new_use: '', new_alt: '', keep: '' }));

fs.writeFileSync(`${OUT}/migration-map.json`, JSON.stringify({ built: '2026-10-31', units: rows, pages, assets }, null, 1));
const q = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';
const csv = (arr, cols) => '﻿' + cols.join(',') + '\n' + arr.map((r) => cols.map((c) => q(Array.isArray(r[c]) ? r[c].map((x) => x.name ?? x.label ? (x.name ?? `${x.label} → ${x.to}`) : x).join('; ') : r[c])).join(',')).join('\n');
fs.writeFileSync(`${OUT}/units.csv`, csv(rows, ['unit', 'route', 'section', 'type', 'visible_on_live_site', 'words', 'images', 'ctas', 'entities', 'related', 'duplicate_of', 'issues', 'suggested_action', 'new_page', 'new_section', 'action', 'notes', 'text']));
fs.writeFileSync(`${OUT}/pages.csv`, csv(pages, ['route', 'old_url', 'title_tag', 'meta_description', 'structured_data', 'units', 'links_to', 'issues', 'new_url', 'redirect_needed', 'notes']));
fs.writeFileSync(`${OUT}/images.csv`, csv(assets, ['file', 'shows', 'alt_now', 'used_on', 'new_use', 'new_alt', 'keep']));
const dup = rows.filter((r) => r.duplicate_of).length;
console.log('units', rows.length, '| with images', rows.filter((r) => r.images.length).length, '| with CTAs', rows.filter((r) => r.ctas.length).length, '| with entities', rows.filter((r) => r.entities.length).length, '| with related', rows.filter((r) => r.related.length).length, '| duplicates', dup, '| hidden', rows.filter((r) => r.type === 'code-only').length);
console.log(rows.filter((r) => r.duplicate_of).slice(0, 6).map((r) => `${r.unit} ${r.route} "${r.section.slice(0, 40)}" = ${r.duplicate_of}`).join('\n'));
