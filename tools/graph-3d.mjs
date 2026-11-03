// Lay out the whole knowledge graph in 3D ahead of time, so the page only has to draw it. Usage: node tools/graph-3d.mjs
import fs from 'node:fs';
const g = JSON.parse(fs.readFileSync('knowledge-base/graph.json', 'utf8'));
const nodes = g.nodes ?? g.entities, links = g.links ?? g.relations ?? g.edges;
console.log('keys', Object.keys(g), 'sample', JSON.stringify(nodes[0]).slice(0, 160), JSON.stringify(links[0]).slice(0, 120));
const id = (n) => n.id ?? n.name, idx = new Map(nodes.map((n, i) => [id(n), i]));
const L = links.map((l) => [idx.get(l.source?.id ?? l.source), idx.get(l.target?.id ?? l.target)]).filter(([a, b]) => a !== undefined && b !== undefined && a !== b);
let s = 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647); // fixed start, same shape every run
const P = nodes.map(() => ({ x: rnd() - 0.5, y: rnd() - 0.5, z: rnd() - 0.5, vx: 0, vy: 0, vz: 0 }));
const deg = new Array(nodes.length).fill(0); for (const [a, b] of L) { deg[a]++; deg[b]++; }
for (let it = 0; it < 420; it++) {
  for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
    const a = P[i], b = P[j], dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z, d2 = dx * dx + dy * dy + dz * dz + 0.001, f = 0.0011 / d2;
    a.vx += dx * f; a.vy += dy * f; a.vz += dz * f; b.vx -= dx * f; b.vy -= dy * f; b.vz -= dz * f;
  }
  for (const [ai, bi] of L) { const a = P[ai], b = P[bi], dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, d = Math.hypot(dx, dy, dz) || 0.01, f = (d - 0.13) * 0.03; a.vx += (dx / d) * f; a.vy += (dy / d) * f; a.vz += (dz / d) * f; b.vx -= (dx / d) * f; b.vy -= (dy / d) * f; b.vz -= (dz / d) * f; }
  for (const p of P) { p.vx -= p.x * 0.012; p.vy -= p.y * 0.012; p.vz -= p.z * 0.012; p.x += p.vx; p.y += p.vy; p.z += p.vz; p.vx *= 0.8; p.vy *= 0.8; p.vz *= 0.8; }
}
const r = P.map((p) => Math.hypot(p.x, p.y, p.z)).sort((a, b) => a - b), ext = r[Math.floor(r.length * 0.97)];
const out = { n: nodes.map((n, i) => [+(P[i].x / ext).toFixed(3), +(P[i].y / ext).toFixed(3), +(P[i].z / ext).toFixed(3), deg[i], n.name ?? n.label ?? n.id, n.group ?? n.community ?? 0]), l: L };
for (const f of ['design/hero3/assets/graph-3d.json']) fs.writeFileSync(f, JSON.stringify(out));
console.log('nodes', out.n.length, 'links', L.length, 'bytes', fs.statSync('design/hero3/assets/graph-3d.json').size);
