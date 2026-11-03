# The 13 round graph pictures: square crops around the faces, written to site/public/img/graph/*.webp.
from PIL import Image

NEW = 'agents automation community events mcp meetups nextgenius opc sydney workshops'.split()
# cut from the project covers' originals: left, top, side
COVERS = {'lunchup': (172, 60, 950), 'stem': (262, 130, 860), 'studio': (150, 120, 900)}

def save(im, slug):
    im.resize((480, 480), Image.LANCZOS).save(f'site/public/img/graph/{slug}.webp', quality=78, method=6)

for slug in NEW:
    im = Image.open(f'out/graph-photo/{slug}/{slug}.png').convert('RGB')
    w, h = im.size
    side = round(w * .82)  # the faces sit in the upper half, so cut from the top
    save(im.crop(((w - side) // 2, 0, (w + side) // 2, side)), slug)
for slug, (x, y, side) in COVERS.items():
    save(Image.open(f'out/cover-img/{slug}/{slug}.png').convert('RGB').crop((x, y, x + side, y + side)), slug)
