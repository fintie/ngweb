# New NextGenius site (2026-10-31)

Test deployment (2026-11-01): https://nextgenius-test.djdev123.workers.dev.
All 15 pages and key assets returned HTTP 200; the test deployment sends noindex headers.
The production domain remains separate. See the root README for redeployment commands.

Build and local preview:

```bash
cd C:/Dev/nextgenius/site && npx astro build
```

```bash
cd C:/Dev/nextgenius && node tools/serve.mjs site/dist 8805
```

Then http://127.0.0.1:8805/

## Pages (15), old address → new
`/` · `/service` → `/solutions/` · `/use-cases` → `/projects/` · `/opc` → `/partners/ (retired English and Chinese planner addresses also redirect here)` · `/community/` · `/about/` · `/contact/` · `/workshop` → `/workshops/` · `/events/` · `/blog/` plus 3 articles · `/faq/`. Old `/#/…` addresses forward in the browser.

## Current design (2026-11-01, editorial revision)
Reference: https://design.google/. Warm neutral surfaces, a dark featured introduction, clear type hierarchy, evenly aligned project and reading grids, small category labels and simple navigation. This revision is local; the test URL above still reflects its last deployment.

The homepage uses the requested Hero A Sydney Harbour photograph behind one left-aligned text block; the workflow illustration box has been removed. Project covers are CSS illustrations in `src/components/ProjectVisual.astro`, shared with the projects page. No synthetic portraits, video reels, canvas graph, ASCII backgrounds, scroll reveals, drifting bands, cursor effects or automatic slideshows are loaded. The earlier assets remain in the repository for reference. `public/site.js` contains only navigation, accessible accordions, old-address forwarding and enquiry email preparation. The service planner was replaced with Partners at user request on 2026-11-01. Old addresses redirect to Partners.

Shared styles cover all content pages, including Partners. Desktop navigation uses direct links; the phone menu keeps the full grouped link tree. Keyboard focus stays inside the open phone menu, Escape closes it, and service deep links open the matching accordion. `public/img/site-preview.png` is the new social preview.

Verified before the Partners replacement: production build; site check (15 pages, 150/150 content units, no broken internal links or images); mobile widths at 390px across nine representative routes; desktop layout at 1280px and 1440px; menu-to-service navigation; English and Chinese planner example generation. Previous animation implementation notes are in Git history through aaf0543.

## Checks (run from C:/Dev/nextgenius)
- `node tools/migration-check.mjs`: every old unit, page and image has a decision.
- `node tools/site-check.mjs`: every unit is marked on its page, links, pictures, one main heading per page, own title. The unit part proves a place exists, not that the wording is right; that is what the reviewers were for.
- `tools/site-behaviour.mjs` is a historical harness with retired planner assertions. Current browser QA covers menu, forms and redirects.
- `tools/planner-check.mjs` is historical tooling; the planner is retired.
- `node tools/copy-check.mjs <urls>`, `node tools/fps-check.mjs <url>`, `node tools/motion-log.mjs site <url>` + `node tools/motion-compare.mjs redstone v2 site`.

Two separate reviewers compared the text with the knowledge base: 20 findings, 18 acted on. Not changed on purpose: the STEM home card keeps its short line (the full wording is on /projects/); "AI agents" and "operators" stay on community and about, where those readers use the words.

## Fixed compared with the old site
Page text is in the delivered file instead of an empty page; clean addresses; every page has one main heading and its own title; the workshop page has its own title and description; article bodies are visible; a "View events" link that pointed to itself now goes to Meetup; no more sentence about "AI-generated discovery paths"; a phone menu.

## For Lukas to decide
Lukas accepted the 15 pages as shown on 2026-10-31 ("Ja, passt"). He did not answer the points below one by one, so the current state stands until he says otherwise. This acceptance is not a go-ahead to publish.
- OpenClaw: never explained on the old site; now named in one point only.
- The 3 article bodies were in the old site's code but never shown. They are published here word for word, with one sentence changed in each that spoke like a strategy note.
- The 3 unreachable landing pages were folded into /events/ and /faq/ instead of being rebuilt.
- 6 decorative or mismatched old pictures are not used (`knowledge-base/migration/images.csv`).
- "Customer records" replaces "CRM": ask the SEO partner before going live.
- The planner was removed on 2026-11-01 at user request. Partner enquiries use the subject Partnership enquiry.

## Not done
- Production migration is not done: no production domain changes or server redirects. The separate Cloudflare test deployment is live. Before production hosting work, run `tools/hosting/scan.mjs` and read `registry/hosting.md` (both are absent from this checkout). Measured 2026-10-31: address book (DNS) at Cloudflare, nameservers cris and zita; the live site is served by GitHub Pages, `www` points to `fintie.github.io`; last change 3 Oct 2026. nextgenius.com.au is not in `registry/hosting.md` yet.
- Code lives in the private repository github.com/SensaiXo/nextgenius (no publishing attached). `out/` stays on this machine.
- Forms still only prepare an email, as on the old site.
- Real phone not tested; events page has no dates because the old site had none.
- The retired Chinese planner address redirects to Partners.

## Partners replacement - 2026-11-01

Replaced the service planner with `/partners/`, including five redesigned WebP banners, delivery partner context, learning/community links, AI Learners Club ownership context and a partnership enquiry. Updated the homepage, community promotion, navigation, footer and sitemap. Sources and asset provenance are documented in `design/partners/README.md`.

Verified: Astro production build; 137/137 active content units; 795 internal links with no problems; all five banners loaded; desktop at 1440px and mobile at 390px with no horizontal overflow; phone menu navigation and enquiry jump link; English, Chinese, `/opc/` and legacy `/#/opc` redirects to Partners. The enquiry retains the existing email preparation behaviour. Local server remains at http://127.0.0.1:8804/. No deployment performed.

## Solutions partner expansion - 2026-11-01

Expanded `/solutions/` to 11 service areas using the current Altamir and Schnellstart offerings. Added an attributed Align / Assure / Adopt governance pathway, partner links in service accordions, full solution navigation and matching enquiry-interest options. The source inventory is in `design/SOLUTIONS-SOURCES.md`.

Verified locally: production build; 147/147 active content units; 874 internal links with no problems; desktop at 1440px and mobile at 390px without horizontal overflow; Microsoft service accordion; mobile menu to ChatGPT advertising deep link; Altamir service destinations; new enquiry-interest options. No messages sent or deployment performed. Existing local dev server remains available at http://127.0.0.1:8804/.

## Local SEO service pages — 2026-11-02

Added four focused service pages: /solutions/ai-automation-sydney/, /solutions/customer-service-assistants/, /solutions/bookings-lead-follow-up/ and /solutions/openai-integration/. Each includes distinct service copy, project scope, visible FAQs, related links, canonical metadata and Service structured data. Added routes to the sitemap and linked them from Solutions and navigation. Homepage title and hero now explicitly describe AI automation and Sydney-based delivery. No client results, reviews, prices or timelines were invented. Changes are local; production publication, Search Console setup and Business Profile management remain separate.
