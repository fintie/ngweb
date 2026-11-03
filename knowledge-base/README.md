# NextGenius knowledge base

Snapshot of https://nextgenius.com.au/#/ taken 2026-10-31 (all 14 pages, interactive tool, 3 linked product sites, 18 images).

- `index.html` – search UI (open directly, or run `node tools/serve.mjs` in the project folder and visit http://127.0.0.1:8800/)
- `00-OUTLINE.md` – structure, conversion paths, content model, verified findings
- `pages/` – one markdown file per page (front matter = title tag, meta description, JSON-LD types); `opc-planner-interactive.md` = tool inputs + every generated plan (EN/中文)
- `blog/` – visible articles + `*-FULL-ARTICLE.md` (text that exists in code but is not shown)
- `code-only/` – content in the code that is not reachable on the live site (3 landing pages)
- `products/` – LunchUp, STEM Learning App, AI Creative Studio (landing page text)
- `images/` + `images.md` – all 18 files, what they show, where used (`_contact-sheet.png` = overview)
- `kb.json` – 178 searchable chunks (type, section, route, url, tags) for any other tool

Rebuild: `node tools/crawl.mjs` → `node tools/opc-wizard.mjs` → `node tools/extras.mjs` → `node tools/build-kb.mjs` → `node tools/inject.mjs`

## Graph (added 2026-10-31)
- `index.html` → tab **Graph**: 349 things, 425 connections, 29 topic groups; click a dot for neighbours + original text; search box lights up matches
- `GRAPH-REPORT.md` – one summary per topic group · `graph.json` – data · `graph-entities.csv`, `graph-relations.csv` – open in Excel
- `GRAPH-PLAN.md` – why this method (GraphRAG steps, run by Claude instead of a paid API)
- Rebuild: `node tools/graph-input.mjs` → 3 extraction helpers → `node tools/graph-merge.mjs` → group reports → `node tools/graph-finish.mjs` → `node tools/inject.mjs`
