# NextGenius – Site outline (as crawled 2026-10-31)

Source: https://nextgenius.com.au/#/ · Pty entity: Next Genius Pty Ltd · 15 Broadway, Ultimo NSW 2007 · info@nextgenius.com.au
Tagline (hero): "Smarter systems. Less busywork." · Kicker: "AI CONSULTING · AUTOMATION · SOFTWARE" · Sydney-based.

## 1. What the company says it is (two halves)
1. **Delivery partner for Australian SMEs** – AI consulting, knowledge assistants (RAG), workflow automation / integrations (MCP), custom software, ongoing support. Entry offer: "start with one useful workflow", pilot first.
2. **Builder community in Sydney** – meetups, workshops, a forming "Australia OPC Network" (One Person Company), free OPC service-plan tool, blog.
Bridge between the two: portfolio of 3 demo products (LunchUp, STEM Learning App, AI Creative Studio).

## 2. Sitemap (14 live pages + 1 tool state + 3 linked product sites)
```
nextgenius.com.au/#/                     Home
├─ #/service            Solutions        (6 service blocks, 6 use cases, 3 engagement models)
├─ #/use-cases          Projects         (3 product showcases, 3 pilot workflows)
├─ #/opc                Free OPC plan    (5-question tool, EN + 中文, generates editable plan)
├─ #/community          Community & OPC network (interest form → mailto)
├─ #/events             Events           (3 formats, no dates)
├─ #/workshop           Workshops        (5 topics, 8 photos)
├─ #/blog               Insights         (3 articles)
│   ├─ #/blog/top-ai-meetups-in-sydney
│   ├─ #/blog/how-to-learn-ai-in-sydney-2026-guide
│   └─ #/blog/best-ai-networking-events-in-sydney
├─ #/faq                FAQ              (6 Q&As)
├─ #/about              About            (2 parts, 3 working principles)
└─ #/contact            Discovery call   (form → mailto, 3 next-steps)
Linked product sites (landing captured only):
├─ https://lunchup.com.au/                 LunchUp
├─ https://stem.nextgenius.com.au/         STEM Learning App (page title: "MathTutor Pro")
└─ https://studio.nextgenius.com.au/       AI Creative Studio
```
Header nav: Solutions · Projects · Start an OPC · Community · About · Request a call ↗ (+ menu button on mobile).
Footer: Explore (Solutions, Projects, Free OPC service plan, Community & OPC, Events, Workshops, Insights, FAQ, About, Contact) · Connect (LinkedIn, Meetup, X) · address · © 2026 Next Genius Pty Ltd.
Routing: hash router (`/#/…`). The raw HTML is an empty `<div id="root">`; all text, titles, meta tags and JSON-LD are injected by JavaScript.

## 3. Page by page (title tag → purpose → main sections)
| Route | Title tag | Purpose | Sections (H2/eyebrow) |
|---|---|---|---|
| `/` | Practical AI for Australian Businesses \| NextGenius | Explain offer, route to contact | Hero · "What better operations can look like" (3 steps) · "Start with the work that slows you down" (3 cards) · "See the work. Try the experience." (3 projects) · "A clear delivery path" (Discover/Scope/Pilot/Support) · OPC promo · Community promo · CTA "What would you like to make easier?" |
| `/service` | AI Solutions & System Integration \| NextGenius | Service catalogue | "Services built around business outcomes…" (6 blocks) · Typical SME use cases · How engagements usually start (Strategy/Pilot/Build) · What working together looks like |
| `/use-cases` | Projects & Practical AI Use Cases \| NextGenius | Proof / demos | Product showcase (3 apps; who for / problem / what we built / how to evaluate) · "One workflow. A clear way to measure value." (3 pilots) |
| `/opc` | Build Your First OPC Service \| NextGenius | Lead-gen tool | Hero · What you leave with · "Start with expertise, not a blank page" · 5-question form · result · next steps · share |
| `/community` | Community & Australia OPC Network \| NextGenius | Community funnel | Start your OPC · 3 cards (meet / learn / share) · "Australia OPC Network" (forming, expressions of interest) · interest form |
| `/events` | AI Events Sydney \| NextGenius | SEO + event formats | Upcoming events and learning formats (3) · Why people join (3) · CTA |
| `/workshop` | **Request a Discovery Call** \| NextGenius (copy of contact title) | Team workshops | 5 topics: AI agent design · ML for business · MCP · Agent skills · Harness engineering · CTA · 8-photo gallery |
| `/blog` | AI Blog Sydney \| NextGenius | Article index | 3 article cards |
| `/blog/:slug` | Article title | Article | Quick answers (3 FAQs) · Next step · Related articles |
| `/faq` | AI Meetup Sydney FAQ \| NextGenius | SEO FAQ | 6 Q&As · CTA |
| `/about` | About Our Business & Builder Community \| NextGenius | Credibility | Two connected parts · How we work (3 principles) · 1 photo |
| `/contact` | Request a Discovery Call \| NextGenius | Conversion | Form (name, email, company, interest, message) · "What happens next?" · direct email + address |

## 4. Conversion paths (where each CTA goes)
- Primary: "Discuss your business ↗", "Request a call ↗", "Request a discovery call ↗", "Discuss a project ↗" → `#/contact`
- Contact and community forms: **"Prepare my email ↗" = opens a mailto draft to info@nextgenius.com.au. Nothing is sent or stored by the website** (stated on the page).
- OPC: "Create my free service plan ↗" (home, community) → `#/opc` · tool output → Copy / Download .txt / "Discuss this plan" (mailto with plan)
- Projects → external product sites (3 links) · Events → "Try our 3D Studio APP" → studio.nextgenius.com.au
- Secondary: Explore solutions → `#/service`; Explore events / workshops / insights → their pages; FAQ → events / workshops.

## 5. Content model (reusable for the redesign)
- **Offer blocks**: title + 1-line promise + 3 bullets (Solutions, 6×) · card: number + title + sentence + "Explore ↗" (home 3×)
- **Process**: 4-step (Discover → Scope → Pilot → Support); 3 engagement models (Strategy & scoping / Pilot & prove value / Design, build & rollout)
- **Project card**: type label · name · who it is for · problem · what we built · how to evaluate · link + image
- **Pilot workflow card**: workflow · promise · "Pilot evaluation: measure …" · CTA
- **Event/Workshop card**: title · cadence · audience · description · CTA
- **FAQ pair** (6 shared across /faq, blog posts, JSON-LD) · **Photo gallery** (8 workshop photos)
- Voice: plain, no hype ("No inflated transformation language", "No customer growth … claimed here"), claims are deliberately hedged.

## 6. Key vocabulary
RAG · MCP (Model Context Protocol) · AI agents · harness engineering · OpenClaw assistant (unexplained on site) · OPC (= One Person Company / one-person business) · pilot · SOPs · discovery call.

## 7. Verified findings useful for the redesign
Fact = checked in the crawl. Judgement calls are marked *(opinion)*.
1. **Workshop page has the wrong title tag** ("Request a Discovery Call | NextGenius") and **no meta description, no social tags, no JSON-LD**. Blog index and Solutions have no JSON-LD either.
2. **Three SEO landing pages exist in code but show "Page not found"**: `/ai-meetup-sydney`, `/ai-events-sydney`, `/learn-ai-sydney` (content in `code-only/`).
3. **Blog articles are truncated on screen**: each article has 3 body sections in code that are not rendered (full text in `blog/*-FULL-ARTICLE.md`); the page shows only 3 "Quick answers". All 3 posts are dated 2026-04-10.
4. **Blog index text is written for crawlers, not people**: "These articles are structured to … help NextGenius appear in AI-generated discovery paths." *(opinion: remove from visitor-facing copy)*
5. **Events page lists no dates, venue or booking link**; its "View events" button links back to the same page (`#/events`). The Meetup profile is linked only in the footer.
6. **Image/text mismatches**: Solutions page images are AI art from the Creative Studio (alt: "Creative AI art experience", "Immersive digital environment") and not services; "STEM Learning App" uses an AWS/Slack/OpenAI architecture diagram as its image, and the product site's own title is "MathTutor Pro"; project images have generic alt text ("…interface or system illustration").
7. **Heading structure**: `/service` and `/workshop` have **no H1** (they start with an H2; Solutions also uses an H4 for its lead sentence). All other pages have exactly one H1.
8. **Product sites show numbers the main site avoids**: LunchUp shows "10K+ professionals · 50K+ meetings · 500+ venues" and a "(example)" company in its map, while `/use-cases` says no customer growth or results are claimed. Needs one consistent story.
9. **Language**: site is English; only `/opc` has a Chinese (中文) version (UI + generated plans).
10. **No tracking on the OPC share links** (stated), no analytics seen on the pages themselves (not audited deeply).
11. "OpenClaw assistant setup" is a service block with no explanation of what OpenClaw is.
12. The raw HTML has no content → crawlers without JavaScript see only the page title; hash URLs share one URL for all pages. *(SEO impact is an opinion until measured.)*

## 8. Not covered / limits
- Linked product sites: landing page only (text, headings, links), not their inner app screens or login areas.
- No access to hosting, analytics, Search Console or the Meetup page content.
- Live site may change; this is a snapshot with the bundle `index-Ise8EmZo.js`.
- Screenshots of each page: `../out/pages/*.png` (full-page, 1440 px).
