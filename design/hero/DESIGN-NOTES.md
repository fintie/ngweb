# Design template v1 – hero + 4 sections (2026-10-31)

Preview: `node tools/serve.mjs design/hero 8801` → http://127.0.0.1:8801/ (loopback only; press **M** on the page to show which knowledge-base unit each block comes from).

## Mix: what comes from where
| Part | From Redstone (dark, bold agency) | From Sincro (white, blue, calm corporate) | From our own knowledge base |
|---|---|---|---|
| Hero | huge uppercase two-line headline, pill button with circle arrow, dark ground, small uppercase nav | hairline column grid, one electric-blue block, facts row split by thin lines | real hero copy (u001); the blue block shows OUR knowledge graph (60 of 349 things), live and hoverable |
| Services | numbered rows 01–06, row title slides on hover | white ground, big regular-weight heading left, list right | the 6 service blocks word for word (u020–u025) |
| Projects | dark tiles with a real picture each, small label + "view project" arrow | – | the 3 real products, screenshots of their own landing pages (no invented client work) |
| Delivery path | – | full-bleed blue panel, 4 columns with thin dividers, big numerals, line symbols | Discover / Scope / Pilot / Support; the symbols are tiny graphs with 1–4 nodes |
| Footer | giant wordmark | side card with the call to action | real contact data; call-to-action text from the home page |

Ignored on purpose: FIND real estate (per Lukas, 2026-10-31).

## Tokens
Ink `#081423` · Panel dark `#0f1d30` · Blue `#3366ff` (measured on Sincro, also close to NextGenius theme navy `#10253b` family) · White · Logo yellow stays only in the logo.
Font: Schibsted Grotesk variable (SIL Open Font Licence, self-hosted from `@fontsource-variable/schibsted-grotesk`, no Google request). Headline 500 weight, uppercase, −0.035 em, line-height 0.9, size `clamp(46px, 8.6vw, 160px)`.
Radius: pills fully round, panels 4 px. Motion: headline rise 1 s, scroll reveal, accordion, tile zoom 0.8 s; all off under "reduce motion".

## Truth rules used here
- Only facts from the old site: "30–45 minute discovery call", "5 questions, no signup", "Sydney-based", "one useful workflow first".
- No invented numbers, ratings, client logos or quotes (both references show them; we have none).
- The graph caption says what it is ("60 of 349 things").

## Open decisions for the owner
1. Dark hero (Redstone) vs. white hero (Sincro)? Now: dark hero, white services, dark projects, blue path, dark footer.
2. Keep the knowledge graph as the hero picture, or add a generated photo/illustration? (Two Sydney sky images were started with Codex before the FIND reference was dropped; they are not used. Folders `img-a`, `img-b`.)
3. Plain-language copy: this template keeps the old wording ("RAG", "MCP", "OpenClaw"); the redesign should explain or drop them.
4. Real photos: 8 workshop photos exist (Ultimo loft); Sincro-style people photos could use them.

## Reference captures (study only, not published)
`out/ref/<site>/NN.jpg` (scroll steps: redstone 21, findrealestate 24, sincro 31), `out/ref/<site>/tokens.json`, `out/ref/<site>-sheet.jpg`.
