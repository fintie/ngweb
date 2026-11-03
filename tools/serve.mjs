// Loopback-only static server (allowlist: file types below, inside the given folder only). Usage: node tools/serve.mjs [folder] [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(process.argv[2] ?? 'knowledge-base');
const PORT = Number(process.argv[3] ?? 8800);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.md': 'text/markdown; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.css': 'text/css; charset=utf-8', '.mp4': 'video/mp4', '.csv': 'text/csv; charset=utf-8', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]);
  const file = path.resolve(ROOT, '.' + (rel.endsWith('/') ? rel + 'index.html' : rel));
  if (!file.startsWith(ROOT + path.sep) || !TYPES[path.extname(file)] || !fs.existsSync(file)) { res.writeHead(404); return res.end('not found'); }
  const size = fs.statSync(file).size, type = TYPES[path.extname(file)];
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  if (m) { // byte ranges so video can seek and loop
    const start = m[1] ? Number(m[1]) : 0, end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    return fs.createReadStream(file, { start, end }).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, '127.0.0.1', () => console.log(`http://127.0.0.1:${PORT}/ -> ${ROOT}`));
