// Coverage gate for the migration: every old unit, page and image needs a decision before the new site is built.
import fs from 'node:fs';
const parse = (file) => {
  const s = fs.readFileSync(file, 'utf8').replace(/^﻿/, ''); const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < s.length; i++) { const c = s[i];
    if (q) { if (c === '"' && s[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; } else if (c !== '\r') f += c; }
  if (f || row.length) { row.push(f); rows.push(row); }
  const [h, ...b] = rows; return b.map((r) => Object.fromEntries(h.map((k, i) => [k, r[i] ?? ''])));
};
const D = (process.env.MIG_DIR ?? 'knowledge-base/migration') + '/';
const units = parse(D + 'units.csv'), pages = parse(D + 'pages.csv'), imgs = parse(D + 'images.csv');
const rep = (label, rows, field, id) => { const open = rows.filter((r) => !r[field].trim()); console.log(`${label}: ${rows.length - open.length}/${rows.length} decided` + (open.length ? ` | open: ${open.slice(0, 5).map((r) => r[id]).join(', ')}${open.length > 5 ? ' …' : ''}` : '')); return open.length; };
const open = rep('content units (action)', units, 'action', 'unit') + rep('content units (new_page)', units.filter((u) => /^(drop|delete)/i.test(u.action) ? false : true), 'new_page', 'unit') + rep('old pages (new_url)', pages, 'new_url', 'route') + rep('images (keep)', imgs, 'keep', 'file');
process.exit(open ? 1 : 0);
