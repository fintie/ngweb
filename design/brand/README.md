# NextGenius logo and favicon

User-supplied artwork installed 2026-11-01. Original: `C:/Users/Devje/Downloads/1feca248-83d3-4fa7-bc34-087802a4f260.png`; workspace copy: `nextgenius-logo-source.png`.

The supplied square artwork is used without redrawing, cropping or background removal. The yellow mark and navy background are preserved. Only resizing and encoding were performed using the existing sharp dependency.

- Shared header and footer: `site/public/img/nextgenius-logo.webp`, 256x256 lossless WebP, displayed at 40x40 alongside the NextGenius name.
- Browser favicon: `site/public/favicon.ico`, containing 16x16, 32x32 and 48x48 PNG entries.
- PNG favicons: `site/public/favicon-16x16.png`, `favicon-32x32.png` and `favicon-48x48.png`.
- Apple touch icon: `site/public/apple-touch-icon.png`, 180x180.
- Shared head links and organisation logo metadata are configured in `site/src/layouts/Base.astro`.

The home link keeps its accessible NextGenius home label; the accompanying logo image is decorative to avoid repeating the brand name to screen readers.

Header styling revision (2026-11-01): applied the user's reference palette through a navy gradient, gold wordmark and lower border, light navigation links, and a gold contact button with asymmetric corner radii. Header content, typography, spacing, link order and responsive layout are unchanged. The phone menu uses the same palette and gold keyboard-focus indicators. Footer styling remains unchanged.

Header logo revision (2026-11-02): the user's header-reference logo replaces the square mark and text in the header. Reused the matching original transparent `site/public/img/logo.png` (500x176) and positioned a native TECH VENTURE line under its wordmark to match the reference. The artwork is unchanged. Desktop header remains 88px high and mobile remains 76px; navigation order, links and alignment are retained. Header logo displays at 193x68 desktop and 159x56 mobile. The separate square favicon artwork and footer mark remain as previously supplied.

Header spacing revision (2026-11-02): aligned the header's inner edges to the page's 1440px content width. Increased the original wordmark to 250x88 desktop and 200x70.4 mobile, with a readable 10.5px / 9px secondary line. Navigation is 16px with 44px minimum link targets; the contact button is 48px high. Desktop header height is now 108px and mobile is 92px, with matching menu offsets and anchor clearance. Navigation switches to the menu at 1100px to prevent crowding. Browser checks at 320, 390, 700, 768, 1100, 1101, 1440 and 1920px showed no horizontal overflow; phone menu opening and closing were verified.
