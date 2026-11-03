import { defineConfig } from 'astro/config';
import { redirects } from './src/data/redirects.js';

export default defineConfig({ site: 'https://nextgenius.com.au', trailingSlash: 'always', redirects, devToolbar: { enabled: false }, server: { host: '127.0.0.1', port: 8804 } });
