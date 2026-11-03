import fs from 'node:fs/promises';
const sources = JSON.parse(await fs.readFile(new URL('../design/editorial-covers/sources.json', import.meta.url)));
const directory = new URL('../design/editorial-covers/references/', import.meta.url);
await fs.mkdir(directory, { recursive: true });
for (const source of sources) {
  const response = await fetch(source.image, { signal: AbortSignal.timeout(30000) });
  if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Image download failed: ${source.id}, ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > 10_000_000) throw new Error('Image exceeds expected size');
  await fs.writeFile(new URL(source.id + '.jpg', directory), bytes);
  console.log(`${source.id}: ${Math.round(bytes.length / 1024)} KiB`);
}
