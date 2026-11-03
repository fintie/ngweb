// Rebuild responsive assets from retained originals. Run from the repository root.
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(new URL('../site/package.json', import.meta.url));
const sharp = require('sharp');
const root = new URL('../site/public/', import.meta.url);
const sources = ['img/sydney-harbour-hero-a.webp', 'img/community-gathering.png'];
for (let n = 1; n <= 8; n++) sources.push(`img/workshop-${String(n).padStart(2, '0')}.jpg`);
for (const folder of ['img/blog', 'img/team', 'img/partners', 'img/communities']) {
  for (const file of await fs.readdir(new URL(folder + '/', root), { recursive: true })) {
    if (/\.(png|jpe?g|webp)$/i.test(file)) sources.push(folder + '/' + file.replaceAll('\\', '/'));
  }
}
await fs.mkdir(new URL('img/optimised/', root), { recursive: true });
const manifest = {};
let originalBytes = 0, outputBytes = 0;
for (const source of sources) {
  const input = fileURLToPath(new URL(source, root)), metadata = await sharp(input).metadata();
  const widths = [...new Set([480, 960, 1440, Math.min(metadata.width, 1680)].filter(w => w <= metadata.width))].sort((a, b) => a - b);
  const variants = [];
  for (const width of widths) {
    const filename = `img/optimised/${source.replace(/^img\//, '').replace(/\.[^.]+$/, '').replaceAll('/', '-')}-${width}.webp`;
    const info = await sharp(input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(fileURLToPath(new URL(filename, root)));
    variants.push({ src: '/' + filename, width });
    if (width === widths.at(-1)) outputBytes += info.size;
  }
  originalBytes += (await fs.stat(input)).size;
  manifest['/' + source] = { width: metadata.width, height: metadata.height, variants };
}
await fs.writeFile(new URL('../site/src/data/responsive-images.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n');
console.log(`${sources.length} images: ${(originalBytes / 1024).toFixed(0)} KiB originals → ${(outputBytes / 1024).toFixed(0)} KiB largest variants (${Math.round((1 - outputBytes / originalBytes) * 100)}% smaller).`);
