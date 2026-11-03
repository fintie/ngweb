# Project covers: the people stay a photo, the motion-blurred corner dissolves into the hero's characters.
# Originals in out/cover-img/<slug>/<slug>.png, written to site/public/img/cover-N.jpg.
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

CHARS = ' =+xX0S8#@'  # same set as public/ascii-bg.js
CELL_W, CELL_H = 14, 23
SOFT = .17  # width of the dissolve, as a share of the picture height
# file, slant of the edge, where the edge sits: a point counts as characters when y + slant * (1 - x) > edge
COVERS = {'lunchup': ('cover-1', .62, .99), 'studio': ('cover-2', .62, .99), 'stem': ('cover-3', .62, .99)}

font = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 21)
def glyph(ch):
    im = Image.new('L', (CELL_W, CELL_H))
    ImageDraw.Draw(im).text((CELL_W / 2, CELL_H / 2), ch, fill=255, font=font, anchor='mm')
    return np.asarray(im, float) / 255
ATLAS = [glyph(c) for c in CHARS]

for slug, (name, slant, edge) in COVERS.items():
    rng = np.random.default_rng(7)
    photo = np.asarray(Image.open(f'out/cover-img/{slug}/{slug}.png').convert('RGB'), float) / 255
    h, w, _ = photo.shape
    marks = np.zeros_like(photo)
    for y0 in range(0, h, CELL_H):
        for x0 in range(0, w, CELL_W):
            cell = photo[y0:y0 + CELL_H, x0:x0 + CELL_W]
            t = ((y0 + CELL_H / 2) / h + slant * (1 - (x0 + CELL_W / 2) / w) - edge) / SOFT
            if t + rng.uniform(-.5, .5) <= 0:
                continue
            c = cell.reshape(-1, 3).mean(0)
            luma = c @ [.2126, .7152, .0722]
            mark = ATLAS[round(min(1, luma ** .6 * 1.25) * (len(CHARS) - 1))][:cell.shape[0], :cell.shape[1]]
            marks[y0:y0 + CELL_H, x0:x0 + CELL_W] = mark[..., None] * (c / max(c.max(), .01) * (.5 + .7 * luma) + .12 * luma)
    # the photo fades smoothly behind the characters, plus a little glow around them, as in the hero
    Y, X = np.mgrid[0:h, 0:w]
    fade = np.clip(((Y + .5) / h + slant * (1 - (X + .5) / w) - edge) / SOFT + .5, 0, 1)
    fade = fade * fade * (3 - 2 * fade)
    glow = np.asarray(Image.fromarray((np.clip(marks, 0, 1) * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(7)), float) / 255
    out = np.clip(photo * (1 - .82 * fade[..., None]) + marks + glow * .35, 0, 1)
    Image.fromarray((out * 255).astype('uint8')).save(f'site/public/img/{name}.jpg', quality=82, optimize=True)
