// Combine merged graph + group reports -> knowledge-base/graph.json, GRAPH-REPORT.md, entities.csv, relations.csv
import fs from 'node:fs';
const g = JSON.parse(fs.readFileSync('out/graph/merged.json', 'utf8'));
const reports = JSON.parse(fs.readFileSync('out/graph/reports.json', 'utf8'));
const missing = g.communities.filter((c) => !reports[c.id]).map((c) => c.id);
if (missing.length) throw new Error('reports missing for groups ' + missing.join(','));
fs.writeFileSync('knowledge-base/graph.json', JSON.stringify({ ...g, reports }));
const byId = Object.fromEntries(g.nodes.map((n) => [n.id, n]));
let md = `# Knowledge graph report\n\nBuilt 2026-10-31 from ${g.nodes.length} things and ${g.links.length} connections found in the 140 text parts of the knowledge base. Method: GraphRAG steps (extract → merge → topic groups → group reports); extraction by Claude, groups by the Louvain method, every connection cites its source text parts.\n\n`;
for (const c of g.communities) {
  const r = reports[c.id], mem = g.nodes.filter((n) => n.community === c.id).sort((a, b) => b.degree - a.degree);
  md += `## ${c.id + 1}. ${r.title} (${c.size} items)\n\n${r.summary}\n\n${(r.findings || []).map((f) => '- ' + f).join('\n')}\n\nItems: ${mem.map((m) => `${m.name} [${m.type}]`).join(', ')}\n\n`;
}
const other = g.nodes.filter((n) => n.community < 0);
md += `## Other (not in a group, ${other.length} items)\n\n${other.map((n) => n.name).join(', ')}\n`;
fs.writeFileSync('knowledge-base/GRAPH-REPORT.md', md);
const q = (s) => '"' + String(s ?? '').replace(/"/g, '""') + '"';
fs.writeFileSync('knowledge-base/graph-entities.csv', 'name,type,group,links,description,source_chunks\n' + g.nodes.map((n) => [n.name, n.type, n.community < 0 ? 'other' : reports[n.community].title, n.degree, n.description, n.chunks.join(' ')].map(q).join(',')).join('\n'));
fs.writeFileSync('knowledge-base/graph-relations.csv', 'from,to,description,strength,source_chunks\n' + g.links.map((l) => [byId[l.source].name, byId[l.target].name, l.description, l.strength, l.chunks.join(' ')].map(q).join(',')).join('\n'));
console.log('written: graph.json, GRAPH-REPORT.md, 2 csv | groups', g.communities.length);
