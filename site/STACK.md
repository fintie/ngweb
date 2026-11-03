# Stack check: how the new site is built (2026-10-31)

| Need | Candidate | Licence | Upkeep | Evidence | Fit | Verdict |
|---|---|---|---|---|---|---|
| Real pages with text in the delivered file | Astro 7 | MIT | active, pinned to 7.2.8 (same as schnellstart; 7.4 needs a newer Node than this machine has) | our own fleet: schnellstart, ets.ch, swissfinanceai run on it (registry) | every page is finished text, clean addresses, no script needed to read it | **take** |
| | Keep Vite + React (old site) | MIT | active | measured on the old site: empty page until scripts run, addresses with `#`, wrong title on /workshop, two pages without a main heading | cause of the problems we are fixing | skip |
| | Next.js static export | MIT | active | one fleet project, a portal | heavy for a content site without logins | skip |
| | Own small build script | ours | us | v3 proved the design needs no framework | would rebuild sitemap, layouts and link checks by hand | skip |

Winner: Astro, because the fleet already runs on it and it fixes the old site's address and empty-page problems. Motion stays our own plain script: measured, the reference needs no animation library.
## Hero background in ASCII characters (2026-11-01)

| Need | Candidate | Licence | Upkeep | Evidence | Fit | Verdict |
|---|---|---|---|---|---|---|
| A soft light in ASCII characters behind the hero, no React | React Bits GradientASCII (WebGL2 shaders) | MIT + Commons Clause: free inside a website, only reselling the component itself is barred | 50 861 stars, pushed 2026-10-31, 7 open issues | source read in full; React part is a thin wrapper around plain WebGL | ported to our plain script, same shaders; GPU-side, no pixel read-back | **take, ported** |
| | three.js AsciiEffect | MIT | active | source read: reads pixels back from the GPU every frame and rebuilds a text table | needs three.js (heavy) and burns the main thread; our 1050 Ti already drops to 48 fps in one stretch | skip |
| | Our 3D knowledge graph (`tools/graph-3d.mjs`, in the reel) | ours | us | already drawn, 349 nodes, glow sprites | different look: dots and lines, not characters; already shown in the video, would repeat | skip, kept as fallback |
| | Plain CSS glow (gradient, no characters) | — | none | 0 cost, no script | loses the one thing Lukas asked for, the characters | skip |

Winner: the React Bits shaders, ported, because they are the only candidate that stays on the graphics card. Measured after the build: see site/NOTES.md. Phones and reduced-motion get a still frame.

### Covering the black while scrolling into the video (2026-11-01)

| Need | Candidate | Licence | Upkeep | Evidence | Fit | Verdict |
|---|---|---|---|---|---|---|
| No empty black under the hero while the video grows | Our ASCII light, standing still and rising with the scroll | as above | ours | test shots: 92 to 100 % black in the lower half when the light scrolls away; real browser: no gap at 15, 40, 50 and 70 % of the way | one continuous picture, no second animation, same cost | **take** |
| | React Bits Grainient (grainy soft gradient) | MIT + Commons Clause | same repo, no extra packages, 21 KB | source read: separate shader | needs a second animation running and a visible join where the characters stop | ideas only |
| | React Bits Aurora / Soft Aurora | MIT + Commons Clause | same repo, 16 and 18 KB | source read: separate shaders | same join problem, wavy bands fight the character look | skip |
| | Plain black-to-blue colour fade | none needed | none | no cost | still stops abruptly against the characters | skip |

Winner: expand our own light, because it is the only option with no join between two effects.

## Knowledge graph with pictures and hover cards (2026-11-01)

| Need | Candidate | Licence | Upkeep | Evidence | Fit | Verdict |
|---|---|---|---|---|---|---|
| Hover a point, see picture and text | Our own canvas graph (`site.js`) | ours | us | already draws all 349 points at 60 frames per second, from our layout | a few dozen lines added, nothing new to load | **take** |
| | vasturiano/3d-force-graph | MIT | 6 519 stars, pushed 2026-09-29 | brings three.js | heavy for one section, redoes what works | skip |
| | sigma.js | MIT | 12 211 stars, pushed 2026-10-27 | large flat graphs | strong for thousands of points, flat look, loses our 3D turn | skip |
| | cytoscape.js | MIT | 11 260 stars, pushed 2026-10-30 | analysis tool | built for diagrams, not this look | skip |
| Pictures for the main points | Codex image tool | our plan | standing pick 2026-10-18 | Sydney test matched the graph on the first try | style held across all pictures using it as reference | **take** |

Winner: our own canvas, because the graph already runs and only needs hover and pictures. Licence and upkeep read live from GitHub; none of the three was installed or run.

## Project covers: people instead of abstract waves (2026-11-01)

| Need | Candidate | Licence | Upkeep | Evidence | Fit | Verdict |
|---|---|---|---|---|---|---|
| Three photos of people with motion blur and film grain, one colour per project | Codex image tool | our plan | standing pick 2026-10-18 | schnellstart's image family and our graph pictures came from it | any scene and colour, no real person shown | **take** |
| | Stock photos | depends on the site | none | not tried | real, but the blur, grain and project colour would have to be faked afterwards, and the same picture can sit on other sites | skip |
| | Our workshop photos with blur added in code | ours | us | `workshop-01.jpg` read: wide room, many small faces, venue banner | the only real NextGenius people, but they show events, not the three apps, and they already run on 3 pages | ideas only |

Winner: Codex, because only it gives one scene per project in that project's colour. Short check, no measured comparison. Style rules come from schnellstart `design-system/OVERVIEW.md` §12 and its saved Wonderful captures.

Not decided here: hosting and domain move (standing order: run tools/hosting/scan.mjs and read registry/hosting.md first). This is a local preview.
