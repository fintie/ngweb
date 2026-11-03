// Build knowledge-base/ (markdown per page, outline, kb.json chunks, images catalog) from out/ crawl data.
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'knowledge-base';
const SITE = 'https://nextgenius.com.au/';
for (const d of ['pages', 'blog', 'products', 'code-only', 'images']) fs.mkdirSync(`${OUT}/${d}`, { recursive: true });
const rd = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const data = rd('out/bundle-data.json'); // rt = faq, zm = events, rd = blog posts, Um = landing pages
const opcInt = rd('out/opc-interactive.json');
const opcWiz = rd('out/opc-wizard.json');

// ---------- page registry ----------
const PAGES = [
  ['/', 'home', 'Home', 'Home'],
  ['/service', 'service', 'Solutions', 'Solutions'],
  ['/use-cases', 'use-cases', 'Projects', 'Projects'],
  ['/opc', 'opc', 'Free OPC service plan', 'OPC'],
  ['/community', 'community', 'Community & OPC network', 'Community'],
  ['/about', 'about', 'About', 'About'],
  ['/contact', 'contact', 'Contact', 'Contact'],
  ['/workshop', 'workshop', 'Workshops', 'Workshops'],
  ['/events', 'events', 'Events', 'Events'],
  ['/blog', 'blog', 'Insights (blog index)', 'Insights'],
  ['/faq', 'faq', 'FAQ', 'FAQ'],
  ['/blog/top-ai-meetups-in-sydney', 'blog__top-ai-meetups-in-sydney', 'Blog: Top AI Meetups in Sydney', 'Insights'],
  ['/blog/how-to-learn-ai-in-sydney-2026-guide', 'blog__how-to-learn-ai-in-sydney-2026-guide', 'Blog: How to Learn AI in Sydney (2026 Guide)', 'Insights'],
  ['/blog/best-ai-networking-events-in-sydney', 'blog__best-ai-networking-events-in-sydney', 'Blog: Best AI Networking Events in Sydney', 'Insights'],
];
const TOPICS = {
  RAG: /\bRAG\b|retrieval/i, MCP: /\bMCP\b|model context protocol/i, 'AI agents': /\bagents?\b/i, automation: /automat/i, workshop: /workshop|bootcamp/i,
  Sydney: /sydney|ultimo/i, OPC: /\bOPC\b|one[- ]person/i, pilot: /\bpilot/i, pricing: /pric|fee\b|quote/i, 'knowledge assistant': /knowledge|assistant|SOP/i,
  integration: /integrat|connect/i, 'custom software': /software|portal|dashboard|platform/i, community: /community|meetup|network/i, contact: /contact|enquir|discovery call|email/i,
};
const tagsFor = (t) => Object.entries(TOPICS).filter(([, re]) => re.test(t)).map(([k]) => k);
const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
const chunks = []; let cid = 0;
const addChunk = (c) => { c.id = 'c' + (++cid); c.text = c.text.trim(); c.tags = [...new Set([...(c.tags || []), ...tagsFor(c.heading + ' ' + c.text)])]; chunks.push(c); };

// ---------- global (header/footer) from the home page ----------
const home = rd('out/pages/home.json');
const nav = home.blocks.filter((b) => b.in === 'header' && b.t === 'a').map((b) => ({ text: b.text, href: b.href }));
const footerBlocks = home.blocks.filter((b) => b.in === 'footer');
const footerText = home.innerText.slice(home.innerText.indexOf('NextGenius\n\nPractical AI delivery'));

// ---------- segmentation ----------
function sectionsOf(d) {
  const bl = d.blocks.filter((b) => b.in !== 'header' && b.in !== 'footer');
  const kept = [];
  for (const b of bl) {
    const key = b.t === 'img' ? 'img:' + b.src : clean(b.text);
    if (!key) continue;
    if (kept.length && kept.at(-1).key === key) continue;                                         // consecutive duplicate
    if ((b.t === 'a' || b.t === 'button') && kept.slice(-3).some((k) => k.key === key)) continue; // wrapper repeat
    if (b.t === 'text' && kept.slice(-2).some((k) => k.key === key)) continue;
    kept.push({ ...b, key });
  }
  // drop a "text" block that is just the concatenation of the previous blocks (card wrapper)
  const items = kept.filter((b, i) => !(b.t === 'text' && i > 0 && kept.slice(Math.max(0, i - 6), i).map((k) => k.key).join(' ').includes(b.key) && b.key.length > 40));
  const secs = []; let cur = { eyebrow: '', h: '', level: 0, items: [] };
  const push = () => { if (cur.h || cur.items.length) secs.push(cur); };
  items.forEach((b, i) => {
    if (b.t === 'h1' || b.t === 'h2') {
      push(); const prev = cur.items.at(-1);
      let eyebrow = '';
      if (prev && prev.t === 'text' && (prev.key === prev.key.toUpperCase() || /·/.test(prev.key)) && prev.key.length < 70) { eyebrow = prev.key; cur.items.pop(); }
      cur = { eyebrow, h: b.key, level: b.t === 'h1' ? 1 : 2, items: [] };
    } else cur.items.push(b);
  });
  push();
  return secs;
}
const itemMd = (b) => b.t === 'img' ? `
![${b.alt}](${'../images/' + path.basename(b.src)})
` : b.t === 'li' ? `- ${b.key}` : /^h[3-6]$/.test(b.t) && b.t !== 'h4' ? `\n### ${b.key}\n` : b.t === 'h4' ? `\n**${b.key}**\n` : (b.t === 'a' || b.t === 'button') ? `[${b.key}](${b.href ?? '#button'})` : b.key;
const itemTxt = (b) => b.t === 'img' ? `[image: ${b.alt}]` : b.t === 'li' ? '• ' + b.key : b.key;

function chunkSections(page, secs, extra = {}) {
  for (const s of secs) {
    const subs = []; let g = { h: '', items: [] };
    for (const b of s.items) { if (b.t === 'h3') { if (g.h || g.items.length) subs.push(g); g = { h: b.key, items: [] }; } else g.items.push(b); }
    subs.push(g);
    const split = subs.filter((x) => x.h).length >= 2;
    const groups = split ? subs : [{ h: '', items: s.items.filter((b) => true) }];
    for (const x of groups) {
      const text = (split ? '' : '') + x.items.filter((b) => b.t !== 'img' || false).map(itemTxt).join('\n');
      if (!text.trim() && !s.h) continue;
      addChunk({ type: extra.type || 'page', page: page.title, route: page.route, url: page.url, category: page.category, heading: [s.h, x.h].filter(Boolean).join(' › ') || page.title, eyebrow: s.eyebrow, text,
        images: x.items.filter((b) => b.t === 'img').map((b) => path.basename(b.src)),
        ctas: x.items.filter((b) => (b.t === 'a' || b.t === 'button') && b.key).map((b) => ({ label: b.key, to: b.href ?? '(opens email draft / action)' })), ...extra.flags });
    }
  }
}

// ---------- pages ----------
const pageIndex = [];
for (const [route, slug, title, category] of PAGES) {
  const d = rd(`out/pages/${slug}.json`);
  const url = SITE + '#' + route;
  const secs = sectionsOf(d);
  const page = { route, slug, title: d.title, nav: title, category, url, metas: d.metas, ld: d.ld.map((x) => { try { const j = JSON.parse(x); return (Array.isArray(j) ? j : [j]).map((o) => o['@type'] ?? Object.keys(o)).flat(); } catch { return ['(unparsed)']; } }).flat() };
  pageIndex.push({ ...page, sections: secs.length, images: d.blocks.filter((b) => b.t === 'img' && b.in !== 'header').length });
  const folder = route.startsWith('/blog/') ? 'blog' : 'pages';
  let md = `---\ntitle: "${d.title}"\nroute: "${route}"\nurl: ${url}\nmeta_description: "${(d.metas.description || '(none set)').replace(/"/g, "'")}"\nkeywords: "${d.metas.keywords || ''}"\nog_title: "${d.metas['og:title'] || ''}"\njson_ld: [${page.ld.join(', ')}]\ncategory: ${category}\n---\n\n# ${title}\n\n> Page title tag: **${d.title}**\n\n`;
  for (const s of secs) {
    md += (s.eyebrow ? `*${s.eyebrow}*\n\n` : '') + (s.h ? `${s.level === 1 ? '##' : '##'} ${s.h}\n\n` : '') + s.items.map(itemMd).join('\n').replace(/\n{3,}/g, '\n\n') + '\n\n';
  }
  fs.writeFileSync(`${OUT}/${folder}/${slug.replace(/__/g, '-')}.md`, md.trim() + '\n');
  chunkSections(page, secs, { type: route.startsWith('/blog') ? 'blog' : 'page' });
  // meta as its own searchable chunk
  addChunk({ type: 'meta', page: d.title, route, url, category, heading: 'Search/SEO metadata', text: `Title: ${d.title}\nDescription: ${d.metas.description || '(none)'}\nKeywords: ${d.metas.keywords || '(none)'}\nOG title: ${d.metas['og:title'] || '(none)'}` });
}

// ---------- code-only content (exists in bundle, not visible on live pages) ----------
const posts = data.rd, faq = data.rt, events = data.zm;
let co = `# Content that exists in the site code but is NOT visible on the live pages\n\nSource: JavaScript bundle (assets/index-Ise8EmZo.js), crawled 2026-10-31.\n\n`;
for (const p of posts) {
  let md = `---\ntitle: "${p.title}"\nslug: ${p.slug}\ndate: ${p.date}\ncategory: ${p.category}\nkeywords: ${p.keywords.join(', ')}\nrendered_on_live_page: "only the FAQ part + next step; the body sections below are NOT shown"\n---\n\n# ${p.title}\n\n${p.description}\n\n`;
  for (const s of p.body) md += `## ${s.heading}\n\n${s.paragraphs.join('\n\n')}\n\n`;
  md += `## FAQ (rendered as "Quick answers")\n\n` + p.faq.map((f) => `**${f.question}**\n${f.answer}`).join('\n\n') + '\n';
  fs.writeFileSync(`${OUT}/blog/${p.slug}-FULL-ARTICLE.md`, md);
  const url = `${SITE}#/blog/${p.slug}`;
  addChunk({ type: 'code-only', page: p.title, route: `/blog/${p.slug}`, url, category: 'Insights', heading: `${p.title} › article summary`, text: `${p.description}\nDate: ${p.date} · Category: ${p.category} · Keywords: ${p.keywords.join(', ')}`, flags: {} });
  for (const s of p.body) addChunk({ type: 'code-only', page: p.title, route: `/blog/${p.slug}`, url, category: 'Insights', heading: `${p.title} › ${s.heading}`, text: s.paragraphs.join('\n'), note: 'In code, not shown on live page' });
}
co += `## Blog posts\n${posts.map((p) => `- ${p.title} (${p.slug}) – ${p.body.length} body sections in code, ${p.faq.length} FAQ shown`).join('\n')}\n\n`;
co += `## Landing pages defined in code but unreachable (routes render "Page not found")\n\n`;
for (const [k, u] of Object.entries(data.Um)) {
  co += `### /${u.slug} – "${u.heroTitle}"\n- title tag: ${u.title}\n- intro: ${u.intro}\n` + u.sections.map((s) => `- **${s.heading}**: ${s.paragraphs.join(' ')}`).join('\n') + `\n- FAQ: ${u.faq.map((f) => f.question).join(' | ')}\n\n`;
  addChunk({ type: 'code-only', page: u.title, route: '/' + u.slug, url: SITE + '#/' + u.slug, category: 'SEO landing', heading: `${u.heroTitle}`, text: u.intro + '\n' + u.sections.map((s) => s.heading + ': ' + s.paragraphs.join(' ')).join('\n'), note: 'Defined in code; route currently renders "Page not found"' });
}
co += `## Events list data (shown on /events)\n${events.map((e) => `- ${e.title} (${e.dateLabel}; ${e.audience}) – ${e.description}`).join('\n')}\n`;
fs.writeFileSync(`${OUT}/code-only/hidden-and-unreachable-content.md`, co);

// ---------- OPC planner ----------
const planEn = opcWiz.results.filter((r) => r.lang === 'English'), planZh = opcWiz.results.filter((r) => r.lang !== 'English');
const planOf = (r) => r.text.split('[[EDITABLE TEXTAREA]]')[1].trim();
const FORMATS = ['Review & action plan', 'Setup & implementation', 'Content & research package', 'Training & coaching'];
let opc = `# OPC service-plan tool (interactive part of /opc)\n\nRoute: ${SITE}#/opc · Runs fully in the browser with templates (no AI API, nothing stored).\n\n## Inputs\n1. What can you help with? (text) · 2. Who would you like to help? (text) · 3. What specific problem will you solve? (text) · 4. Delivery format (select: ${FORMATS.join(' / ')}) · 5. Hours per week (select: 3–5 / 5–10 / 10–20 / 20+)\n\nExample prefill ("Try an automation example"): ${JSON.stringify(opcWiz.example)}\n\n## Output sections\nPositioning · Your first package · Delivery workflow · Pricing structure · Where AI can help · Your first week · Service page copy · Boundaries\n\n## Output actions\nCopy plan · Download .txt · Discuss this plan with NextGenius (mailto draft)\n\n`;
FORMATS.forEach((f, i) => { opc += `## Generated plan – English – ${f} (hours option ${i + 1})\n\n\`\`\`\n${planOf(planEn[i])}\n\`\`\`\n\n`; });
FORMATS.forEach((f, i) => { opc += `## Generated plan – 中文 – format ${i + 1}\n\n\`\`\`\n${planOf(planZh[i])}\n\`\`\`\n\n`; });
opc += `## Full page text – 中文 version\n\n\`\`\`\n${opcInt.zh.slice(opcInt.zh.indexOf('NEXTGENIUS'), opcInt.zh.lastIndexOf('NextGenius'))}\n\`\`\`\n`;
fs.writeFileSync(`${OUT}/pages/opc-planner-interactive.md`, opc);
FORMATS.forEach((f, i) => addChunk({ type: 'opc', page: 'OPC planner output (EN)', route: '/opc', url: SITE + '#/opc', category: 'OPC', heading: `Generated plan template › ${f}`, text: planOf(planEn[i]) }));
addChunk({ type: 'opc', page: 'OPC page 中文 version', route: '/opc', url: SITE + '#/opc', category: 'OPC', heading: 'Chinese version of the OPC page', text: opcInt.zh.slice(opcInt.zh.indexOf('NEXTGENIUS'), opcInt.zh.lastIndexOf('NextGenius')), lang: 'zh' });
addChunk({ type: 'opc', page: 'OPC planner output (中文)', route: '/opc', url: SITE + '#/opc', category: 'OPC', heading: 'Generated plan template › 中文 sample', text: planOf(planZh[0]), lang: 'zh' });

// ---------- linked product sites ----------
for (const [k, name] of [['lunchup', 'LunchUp'], ['stem', 'STEM Learning App (MathTutor Pro)'], ['studio', 'AI Creative Studio']]) {
  const d = rd(`out/external/${k}.json`);
  const md = `---\ntitle: "${d.title}"\nurl: ${d.url}\nmeta_description: "${(d.description || '').replace(/"/g, "'")}"\ncaptured: landing page only (not a deep crawl)\n---\n\n# ${name}\n\n${d.text.trim()}\n\n## Headings\n${d.headings.map((h) => '- ' + h).join('\n')}\n\n## Links\n${d.links.map((l) => '- ' + l).join('\n')}\n`;
  fs.writeFileSync(`${OUT}/products/${k}.md`, md);
  const parts = d.text.split(/\n(?=[A-Z0-9][^\n]{3,60}\n)/).join('\n').match(/[\s\S]{1,1400}(?:\n|$)/g) || [];
  parts.forEach((p, i) => addChunk({ type: 'product', page: name, route: d.url, url: d.url, category: 'Product site', heading: `${name} › part ${i + 1}`, text: p }));
}

// ---------- images catalogue ----------
const imgUse = {}; // file -> {alts, pages}
for (const [route, slug] of PAGES.map((p) => [p[0], p[1]])) {
  const d = rd(`out/pages/${slug}.json`);
  for (const b of d.blocks.filter((x) => x.t === 'img')) { const f = path.basename(b.src); const o = (imgUse[f] ??= { alts: new Set(), pages: new Set(), place: new Set() }); o.alts.add(b.alt); o.pages.add(route); o.place.add(b.in); }
  for (const u of d.bgs) { const f = path.basename(u); const o = (imgUse[f] ??= { alts: new Set(), pages: new Set(), place: new Set() }); o.pages.add(route); o.place.add('css background'); }
}
const DESC = {
  'logo-': 'Logo: yellow head-profile with light bulb + "NEXT GENIUS" wordmark. 500×176 px PNG.',
  'case-screenshot': 'Phone mockup of the LunchUp app ("New post" screen with publishing options). Used as LunchUp project image.',
  'process-flow': 'Dark-blue architecture diagram: Slack user → Lambda/AWS → OpenAI API (FAQ answering bot flow). Used as "STEM Learning App" project image (mismatch).',
  'video-collage': 'Collage of Metaverse Sydney video thumbnails (virtual worlds, 3D skull, VR). Used as "AI Creative Studio" project image.',
  'workshop-': 'Photo of a NextGenius workshop/meetup in a brick-walled loft room with projector and seated attendees.',
  'service-1': 'AI-generated art: small robot painting a forest scene on an easel in a gallery.',
  'service-2': 'AI-generated art: astronaut-like figure on a platform in a colourful cosmic/lava scene.',
  'service-3': 'AI-generated art: cyber figure painting at an easel in a neon-lit lab.',
  'product-': 'Wide, thin strip: hands on laptop at a desk with coffee (used as CSS background banner).',
  'city-': 'Blue night city skyline with network-node lines (hero background on SEO/blog pages).',
  'favicon': 'Browser tab icon.',
};
const descOf = (f) => Object.entries(DESC).find(([k]) => f.startsWith(k))?.[1] || '';
let imgMd = `# Image catalogue\n\n${fs.readdirSync('out/images').length} files downloaded to knowledge-base/images/. Overview: contact-sheet.png\n\n| File | What it shows | Alt text on site | Used on | Placement |\n|---|---|---|---|---|\n`;
const imgRecords = [];
for (const f of fs.readdirSync('out/images').sort()) {
  fs.copyFileSync(`out/images/${f}`, `${OUT}/images/${f}`);
  const u = imgUse[f] ?? { alts: new Set(), pages: new Set(), place: new Set() };
  const rec = { file: f, desc: descOf(f), alts: [...u.alts].filter(Boolean), pages: [...u.pages], place: [...u.place], bytes: fs.statSync(`out/images/${f}`).size, url: SITE + (f === 'favicon.ico' ? f : 'assets/' + f) };
  imgRecords.push(rec);
  imgMd += `| ${f} | ${rec.desc} | ${rec.alts.join('; ') || '–'} | ${rec.pages.join(', ') || '–'} | ${rec.place.join(', ') || '–'} |\n`;
  addChunk({ type: 'image', page: 'Image: ' + f, route: rec.pages[0] || '', url: rec.url, category: 'Images', heading: f, text: `${rec.desc}\nAlt: ${rec.alts.join('; ')}\nUsed on: ${rec.pages.join(', ')}`, image: 'images/' + f });
}
fs.writeFileSync(`${OUT}/images.md`, imgMd);
fs.copyFileSync('out/contact-sheet.png', `${OUT}/images/_contact-sheet.png`);

// ---------- global ----------
const gl = `# Global elements (on every page)\n\n## Header navigation\n${nav.map((n) => `- ${n.text} → ${n.href}`).join('\n')}\n\n## Footer\n\`\`\`\n${footerText}\n\`\`\`\n\n## External profiles\n- LinkedIn: https://www.linkedin.com/company/nextgen14\n- Meetup: https://meetup.com/nextgenius\n- X: https://x.com/nextgeniusau\n- Email: info@nextgenius.com.au\n- Address: 15 Broadway, Ultimo NSW 2007, Australia\n- Legal entity: Next Genius Pty Ltd (© 2026)\n`;
fs.writeFileSync(`${OUT}/pages/_global-header-footer.md`, gl);
addChunk({ type: 'page', page: 'Global header & footer', route: '(all)', url: SITE, category: 'Global', heading: 'Navigation, contact, address, social', text: gl.replace(/[#`]/g, '') });

// ---------- faq as own chunks ----------
faq.forEach((f) => addChunk({ type: 'faq', page: 'FAQ', route: '/faq', url: SITE + '#/faq', category: 'FAQ', heading: f.question, text: f.answer }));

fs.writeFileSync(`${OUT}/kb.json`, JSON.stringify({ built: '2026-10-31', source: SITE, chunks, images: imgRecords, pages: pageIndex }, null, 1));
fs.writeFileSync('out/page-index.json', JSON.stringify(pageIndex, null, 1));
console.log('chunks', chunks.length, 'by type', JSON.stringify(chunks.reduce((a, c) => (a[c.type] = (a[c.type] || 0) + 1, a), {})), '| images', imgRecords.length);
