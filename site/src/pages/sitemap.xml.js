import { solutionPages } from '../data/solutionPages.js';
import { ARTICLES } from '../data/articles.js';
const P = ['/', '/solutions/', ...solutionPages.map(p => `/solutions/${p.slug}/`), '/getting-started/', '/partners/', '/community/', '/events/', '/workshops/', '/blog/', ...ARTICLES.map((a) => `/blog/${a.slug}/`), '/faq/', '/about/', '/contact/', '/privacy/'];
export const GET = ({ site }) => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${P.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n')}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
