// Evaluate the data block (FAQ list, blog posts, landing pages) straight out of the bundle source.
import fs from 'node:fs';
import vm from 'node:vm';
const s = fs.readFileSync('raw/bundle.js', 'utf8');
const start = s.indexOf('rt=[{question:"What is the best AI meetup');
const um = s.indexOf('Um={aiMeetupSydney:', start);
if (start < 0 || um < 0) throw new Error('data block not found');
// brace-match the Um object
let i = um + 3, depth = 0, inStr = null, esc = false;
for (; i < s.length; i++) {
  const c = s[i];
  if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === inStr) inStr = null; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
}
const block = s.slice(start, i);
const names = [...new Set([...block.matchAll(/(?:^|\],)(\w+)=[\[{]/g)].map(m => m[1]))];
console.log('block chars', block.length, '| vars:', names.join(','));
// Own site's pure data literals; evaluated in an empty vm context (no require/process/fetch) with a timeout.
const out = vm.runInNewContext('var ' + block + '; ({' + names.join(',') + '})', Object.create(null), { timeout: 2000 });
fs.mkdirSync('out', { recursive: true });
fs.writeFileSync('out/bundle-data.json', JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k, Array.isArray(v) ? 'array ' + v.length : 'object ' + Object.keys(v).join(','));
