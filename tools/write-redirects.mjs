import fs from 'node:fs/promises';
import { redirects } from '../site/src/data/redirects.js';
await fs.writeFile(new URL('../site/dist/_redirects', import.meta.url), Object.entries(redirects).flatMap(([from, to]) => [`${from} ${to} 301`, `${from.slice(0, -1)} ${to} 301`]).join('\n') + '\n');
