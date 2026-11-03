// Merge the 3 extraction parts into one graph, find topic groups (Louvain), check evidence per relation.
import fs from 'node:fs';
import Graph from 'graphology';
import louvain from 'graphology-communities-louvain';

const kb = JSON.parse(fs.readFileSync('knowledge-base/kb.json', 'utf8'));
const chunkText = Object.fromEntries(kb.chunks.map((c) => [c.id, (c.heading + ' ' + c.text).toLowerCase()]));
const parts = [1, 2, 3].map((i) => JSON.parse(fs.readFileSync(`out/graph/part-${i}.json`, 'utf8')));
const ALIAS = { 'we': 'NextGenius', 'us': 'NextGenius', 'next genius': 'NextGenius', 'nextgenius pty ltd': 'NextGenius', 'mcp': 'Model Context Protocol (MCP)', 'model context protocol': 'Model Context Protocol (MCP)', 'rag': 'Retrieval Augmented Generation (RAG)', 'opc': 'One Person Company (OPC)', 'one person company': 'One Person Company (OPC)', 'ai agent': 'AI Agents', 'ai agents': 'AI Agents' };
const key = (n) => n.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const canon = (n) => ALIAS[key(n)] ?? n.trim();

const ents = new Map(); // key -> {name, types:{}, descs:Set, chunks:Set}
const touch = (name, type, desc, chunks) => {
  const nm = canon(name), k = key(nm); if (!k) return null;
  const e = ents.get(k) ?? { name: nm, types: {}, descs: [], chunks: new Set() };
  if (type) e.types[type] = (e.types[type] || 0) + 1;
  if (desc && !e.descs.includes(desc)) e.descs.push(desc);
  (chunks || []).forEach((c) => e.chunks.add(c));
  ents.set(k, e); return k;
};
const rels = new Map();
for (const p of parts) {
  for (const e of p.entities) touch(e.name, e.type, e.description, e.chunks);
  for (const r of p.relationships) {
    const a = touch(r.source, null, null, r.chunks), b = touch(r.target, null, null, r.chunks);
    if (!a || !b || a === b) continue;
    const [x, y] = a < b ? [a, b] : [b, a], k = x + '||' + y;
    const o = rels.get(k) ?? { s: x, t: y, descs: [], strength: 0, n: 0, chunks: new Set() };
    if (r.description && !o.descs.includes(r.description)) o.descs.push(r.description);
    o.strength = Math.max(o.strength, r.strength || 1); o.n++; (r.chunks || []).forEach((c) => o.chunks.add(c)); rels.set(k, o);
  }
}
// Evidence check: both end names (or their first significant word) must occur in at least one cited chunk
const mentions = (name, ids) => { const w = key(name).split(' ').filter((t) => t.length > 2); return ids.some((id) => { const t = chunkText[id] || ''; return t.includes(name.toLowerCase()) || (w.length && w.some((x) => t.includes(x))); }); };
let supported = 0; const unsupported = [];
for (const [k, r] of rels) { const ids = [...r.chunks]; const ok = ids.length && mentions(ents.get(r.s).name, ids) && mentions(ents.get(r.t).name, ids); if (ok) supported++; else { unsupported.push(k); rels.delete(k); } }

const g = new Graph({ type: 'undirected', multi: false });
for (const [k, e] of ents) g.addNode(k, {});
for (const r of rels.values()) if (!g.hasEdge(r.s, r.t)) g.addEdge(r.s, r.t, { weight: r.strength });
let seed = 42; // seeded random so the groups are the same on every rebuild (mulberry32)
const rng = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const comm = louvain(g, { getEdgeWeight: 'weight', resolution: 1, rng });
const nodes = [...ents].map(([k, e]) => ({
  id: k, name: e.name, type: Object.entries(e.types).sort((a, b) => b[1] - a[1])[0]?.[0] || 'concept',
  description: e.descs.slice(0, 3).join(' '), chunks: [...e.chunks], degree: g.hasNode(k) ? g.degree(k) : 0, community: comm[k] ?? -1,
}));
const links = [...rels.values()].map((r) => ({ source: r.s, target: r.t, description: r.descs.slice(0, 2).join(' '), strength: r.strength, chunks: [...r.chunks] }));
// renumber communities by size, drop singletons into -1 group "other"
const size = {}; nodes.forEach((n) => (size[n.community] = (size[n.community] || 0) + 1));
const order = Object.keys(size).map(Number).filter((c) => c >= 0 && size[c] > 1).sort((a, b) => size[b] - size[a]);
const remap = Object.fromEntries(order.map((c, i) => [c, i]));
nodes.forEach((n) => (n.community = remap[n.community] ?? -1));
const communities = order.map((c, i) => ({ id: i, size: size[c], top: nodes.filter((n) => n.community === i).sort((a, b) => b.degree - a.degree).slice(0, 8).map((n) => n.name) }));
fs.writeFileSync('out/graph/merged.json', JSON.stringify({ nodes, links, communities }, null, 1));
console.log('entities', nodes.length, '| relations kept', links.length, '| dropped unsupported', unsupported.length, '| supported', supported, '| communities', communities.length, 'sizes', communities.map((c) => c.size).join(','));
console.log('types', JSON.stringify(nodes.reduce((a, n) => (a[n.type] = (a[n.type] || 0) + 1, a), {})));
console.log('top by degree', nodes.sort((a, b) => b.degree - a.degree).slice(0, 12).map((n) => `${n.name}(${n.degree})`).join(', '));
