# Design template v2 (2026-10-31) – built from a recorded video of Redstone

Preview: `node tools/serve.mjs design/hero2 8802` → http://127.0.0.1:8802/ (press **M** for the source map). v1 stays at `design/hero` (port 8801).

## What the video of Redstone showed (a still screenshot hides all of this)
Recorded 92 s, 1440×900, `out/video/redstone/redstone.webm`; frame sheets `sheet-intro.jpg`, `sheet-rest-*.jpg`; stack in `stack.json`.
1. **Everything moves.** 14 `<video>` elements (hero banner + every project tile is a looping screen recording), no animation library at all (own code, no GSAP), one custom easing `cubic-bezier(0.65, 0, 0.35, 1)` used everywhere.
2. **Hero card cycles** top-right every ~2 s: logo card → project clips → a stacked word list → photos. The headline itself stands still.
3. **Custom cursor** (`div.cursor`): a bubble that grows and shows a label ("Muted", "Link →") over videos and tiles.
4. **Floating glass header** (blurred pill), not a bar across the page.
5. **Dark ↔ white section flips**; a giant word with video running inside the letters ("MARTIN"); a line of words that light up grey→white; an inline logo box inside a headline ("WE ARE [logo] PROUD").
6. **Colourful cover art** per project (gradients, vertical rotated names), blurred bottom fades, intro loader.
7. Also: a 360° product viewer (KeyShot) for the "AI tools" head – not copied.

## Why v1 looked cheap (honest list)
Flat dark colour only; static screenshots in plain frames; no video, no cursor, no loader, no texture; header as a plain bar; no light/dark rhythm; no art direction on the project tiles.

## What v2 does (all from our own material)
| Redstone/Sincro idea | Our version |
|---|---|
| looping clips in tiles + hero card | 3 clips recorded from our own apps (`video/*.mp4`, 8 s, silent, ~0.6 MB each) |
| colourful covers | 3 abstract covers made with Codex (blue network, magenta ribbons, green contours), `assets/cover-*.jpg` |
| video inside giant letters | "ONE WORKFLOW" with our blue network art drifting inside the letters (CSS blend trick, no video needed) |
| word-by-word light-up | About sentence (u058), with an inline "SYDNEY" chip |
| cycling hero card | logo → LunchUp clip → "Assistants / Automation / Integrations / Software" → STEM clip → Studio clip |
| custom cursor | white bubble, labels "View" on projects and "Open" on services |
| hero picture | OUR knowledge graph, glowing, reacts to the mouse (60 of 349 things) |
| texture | fine film grain over everything, gradient on the word "busywork" |
| rhythm | dark hero → word band → white statement → white masked word → dark projects → white services → blue path → dark footer |

## Not verified yet
- Checked 2026-10-31 with `tools/shots.mjs` (375 and 1600 wide, whole page) and `tools/el-shots.mjs` (the two giant words at 375/1600/1920/2560): no sideways scroll, no console errors. Found and fixed: "ONE WORKFLOW" and the footer wordmark were cut off on the right (phone and ≥1920), the source-map button covered text on phones (now hidden under 560 px). Not checked: the cursor bubble needs a real mouse (hidden on touch); real phone hardware.
- Clips are scrolling landing pages, not designed motion; real motion pieces would be better.
- Copy is still the old wording (RAG, MCP, OpenClaw unexplained).
- Codex pictures cost picture quota; free disk on C: dropped from 13 GB to 4 GB during this session (other sessions) – watch it.
