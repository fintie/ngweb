import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(new URL('../site/package.json', import.meta.url));
const sharp = require('sharp');
const sources = JSON.parse(await fs.readFile(new URL('../design/editorial-covers/sources.json', import.meta.url)));
const output = new URL('../site/public/img/blog/practical/', import.meta.url);
await fs.mkdir(output, { recursive: true });
for (const source of sources) {
  const input = fileURLToPath(new URL(`../design/editorial-covers/references/${source.id}.jpg`, import.meta.url));
  await sharp(input).rotate().resize(1600, 1000, { fit: 'cover', position: source.id === 'assistant-testing' ? 'centre' : sharp.strategy.attention }).jpeg({ quality: 92, mozjpeg: true }).toFile(fileURLToPath(new URL(source.id + '.jpg', output)));
}
console.log('Prepared three coordinated 1600 × 1000 editorial covers.');
