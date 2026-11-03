// Embed kb.json (+ graph.json when present) into the search page so it works from file:// and from the local server alike.
import fs from 'node:fs';
const kbObj = JSON.parse(fs.readFileSync('knowledge-base/kb.json', 'utf8'));
if (fs.existsSync('knowledge-base/graph.json')) kbObj.graph = JSON.parse(fs.readFileSync('knowledge-base/graph.json', 'utf8'));
const kb = JSON.stringify(kbObj).replace(/</g, '\\u003c');
fs.writeFileSync('knowledge-base/index.html', fs.readFileSync('tools/search-template.html', 'utf8').replace('/*KB_JSON*/', () => kb));
console.log('index.html', (fs.statSync('knowledge-base/index.html').size / 1024).toFixed(0), 'KB', kbObj.graph ? `(graph: ${kbObj.graph.nodes.length} nodes)` : '(no graph yet)');
