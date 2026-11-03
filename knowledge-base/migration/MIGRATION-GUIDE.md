# Migration guide – old site → new design

## What exists now (the "relation understanding")
Every piece of content on the old site is a **unit** (160 units, `units.csv` / `migration-map.json`). Each unit knows:
- where it lives (route, section), its exact text, whether visitors see it (15 units exist only in code)
- which **images** and **buttons/links** belong to it
- which **things** from the knowledge graph it talks about, and which topic group they are in
- which **other units** are related (share the same things) and which units are **duplicates** (7 found)
- known **issues** of its page, and a **suggested action**
Pages (`pages.csv`): old URL, title tag, meta description, which pages it links to, issues, empty `new_url`.
Images (`images.csv`): what it shows, alt text now, where used, empty `new_use` / `new_alt` / `keep`.

## What is needed from the design (the missing half)
1. **Page list of the new site** with real URLs (not `/#/…`).
2. **Section types per page** (e.g. hero, offer cards, proof, process, FAQ, call to action, gallery). Wireframes or Figma frames are enough; a list of names is the minimum.
3. **Decisions**: what to drop, what to merge, which tone (the old copy is plain and careful – keep that or change it).
4. **Image direction** (real photos vs illustrations, 8 workshop photos stay or go).

## How it is applied once the design exists
1. Fill `new_page`, `new_section`, `action` (keep / rewrite / merge / drop) in `units.csv`; fill `new_url` in `pages.csv`; fill `keep` in `images.csv`. Claude can pre-fill these from the topic groups: a group with its connected units is the natural candidate for one new page or section.
2. Run the gate: `node tools/migration-check.mjs` – lists every unit, page or image without a decision. It must report all decided before building.
3. Build the new pages from the decided units (text, images, button targets and related-link suggestions come from the map). Old `/#/…` routes get redirects or a note, because hash URLs cannot be redirected by the server.
4. After build: re-crawl the new site with `tools/crawl.mjs` and check that every kept unit appears (same check as the old crawl: 463 blocks, 0 missing).

## Known decisions waiting for the owner
- 15 hidden units (blog article bodies, 3 landing pages): publish, merge or drop?
- 7 duplicates (FAQ wording repeated on 4 pages): one source, shown in several places?
- Product sites (LunchUp, STEM/MathTutor Pro, Creative Studio): keep as links, or bring into the new site?
- Forms only open an email draft: keep, or real form handling?
