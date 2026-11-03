// Split the text chunks into 3 balanced slices for entity/relationship extraction.
import fs from 'node:fs';
const kb = JSON.parse(fs.readFileSync('knowledge-base/kb.json', 'utf8'));
const use = kb.chunks.filter((c) => ['page', 'blog', 'code-only', 'faq', 'opc', 'product'].includes(c.type) && c.lang !== 'zh' && c.text.length > 30);
fs.mkdirSync('out/graph', { recursive: true });
const slices = [[], [], []]; const size = [0, 0, 0];
for (const c of use) { const i = size.indexOf(Math.min(...size)); slices[i].push({ id: c.id, source: c.page, section: c.heading, type: c.type, text: c.text.slice(0, 3000) }); size[i] += c.text.length; }
slices.forEach((s, i) => fs.writeFileSync(`out/graph/input-${i + 1}.json`, JSON.stringify(s, null, 1)));
console.log('chunks used', use.length, 'of', kb.chunks.length, '| per slice', slices.map((s) => s.length).join('/'), '| chars', size.join('/'));
