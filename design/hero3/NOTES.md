# Design template v3 (2026-10-31) – motion rebuilt from a live measurement of Redstone

Preview: `node tools/serve.mjs design/hero3 8803` → http://127.0.0.1:8803/ (press **M** for the source map). v2 stays at `design/hero2` (8802).

## Why v2 missed the essence
The 92 s video of v2 was only ever read as still pictures. Claude cannot watch video, so timing and what-moves-with-what were guessed.
This time: `tools/motion-log.mjs` runs inside the live page and logs every transition, animation and script change with time and scroll position; `tools/motion-report.mjs` groups it (`out/motion/redstone/REPORT.md`); the site's own readable script and style files were read for exact values (study only, nothing copied; `out/motion/redstone/src/`); dense frame strips were cut from the synced video (`strips/`).

## Corrections to the v2 notes
- Header is NOT a floating glass pill: plain row, no panel. The bottom-pill code exists in their script but never ran here (no header-step class fired).
- The giant word with video inside ("MARTIN") is NOT a page effect: it is a shot inside their showreel.
- The hero card does NOT just cycle: it is one video that **grows to the full screen as you scroll**. This is the signature and v2 lacked it.

## Measured values now used
| Motion | Redstone (measured) | v3 |
|---|---|---|
| Growing picture | 222×125 at top right → full screen, linear from scroll 0 to the next section; next section 200 vh tall | same, 222×125 → 1440×900, checked at 25/50/75/100 % |
| Word reveal | each word masked, slides up + fades, 1.5 s; all words start inside 0.3 s | same |
| Block rise | 4 rem, 1.5 s, cubic-bezier(.33,1,.68,1), 0.11 s stagger | same |
| Card rise | 50 px, 0.8 s, cubic-bezier(.215,.61,.355,1) | same |
| Cursor | 136 px, hidden by default, follows at 15 % per frame, grows in 0.6 s, named states | same; states View / Open / Drag / See our work |
| Button | pill and circle swap sides, 0.5 s, cubic-bezier(.65,0,.35,1) | same |
| Number flip | 0.5 s, overshoot cubic-bezier(.4,2,.6,1), 60 ms per digit | same, shows which project is active (no invented counter) |
| Drag band | eases at 8 % per frame, can be dragged | same, two rows, our words instead of client logos |
| Text fill | parts fill one after the other, 0.8 s each, at 50 % visible | same |
| Sticky object beside text | 3D head turns with scroll | our whole knowledge graph (349 things) in 3D |
| Ruler controls | tick marks form a wave, auto-turn | same, on the blue delivery path |
| Lean-to-mouse card | up to 20 px, 35 % per frame, returns at 12 % | same |
| Blur at screen edge | fixed blur at the bottom, 17 vh | same, plus thin band under the header |
| Loader | 1 s, holds 70 %, fades | same |

`node tools/motion-compare.mjs redstone v2 v3` (opposite case included): Redstone 11 of 11, v2 2 of 11, v3 11 of 11. `tools/v3-check.mjs` tests the behaviour with a real mouse.

## Stack check
| Need | Candidate | Licence | Evidence | Verdict |
|---|---|---|---|---|
| Scroll and page motion | own code | ours | measured: Redstone itself runs on no animation library and native scrolling | **take** |
| | GSAP + ScrollTrigger | custom, free to use | used on a site in our brain notes (caffepaszkowski) | skip, not needed for this list |
| | Lenis smooth scroll | MIT | measured: reference does not smooth scrolling | skip |
| | Motion | MIT | framework-oriented; this page has no framework | skip |
Winner: own code, because the reference proves none of the look needs a library, and no dependency stays cheapest to migrate.

## Showreel
`video/reel.mp4` (16 s, 4 MB, silent) is our own: name card → word with art inside → LunchUp → the knowledge graph → STEM → "Less busywork." → Studio, joined with pixel transitions. Source `_reel/seg.html`, built by `tools/make-reel.mjs`. Before rebuilding, cut frames first (they were deleted to save disk): `ffmpeg -ss 2.5 -i out/video/apps/<name>.webm -t 3.2 -vf fps=30 -q:v 3 design/hero3/_reel/<name>/%03d.jpg`, and the 8803 server must run. The graph layout comes from `tools/graph-3d.mjs`.

## Not done or not verified
- Smoothness: `tools/fps-check.mjs` on Lukas's own graphics card at 1600×900: 60 frames per second, 51 in the stretch with the full-screen video (no graphics card: 23–31). Real phone not measured.
- App segments in the reel are still scrolling landing pages; real designed shots would lift it further.
- Their testimonial, logo wall, technology table and frequently-asked block were left out: no real client quotes or logos to show, and we invent none.
- Menu dropdowns and the page change after a click on Redstone were not measured.
- Text rewritten in plain words, see `COPY-CHANGES.md` (`tools/copy-check.mjs`: technical words 15 in v2, 0 in v3; every number traces to the knowledge base). OpenClaw is still unexplained: owner decision.
