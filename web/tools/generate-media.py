"""
JAMODI Partners — procedural media generator (daylight).

Produces sunlit multifamily exteriors for a light institutional site.

These are BESPOKE PLACEHOLDERS. They exist so the layout ships with usable,
art-directed imagery instead of grey boxes. Replace /public/media/*.jpg with real
property photography when it is available — filenames and aspect ratios are
stable, so no code changes are required.

The cues that decide whether this reads as a photograph or as a drawing, in order
of importance:

  1. PERSPECTIVE. A straight-on elevation always reads as an architectural
     drawing. The facade is rendered flat, then warped through a real perspective
     transform so the far end recedes toward the horizon.
  2. Daylight glazing is DARK and reflects the sky — a vertical light-to-dark
     gradient per pane. Lit windows read as night and break the illusion.
  3. Directional sun: the front elevation is warm and bright, the return wall
     sits in cool shade, and the mass throws a shadow across the lawn.
  4. Masonry texture, and planting kept low so it frames rather than hides.

    python tools/generate-media.py
"""

import os
import random

from PIL import Image, ImageDraw, ImageFilter, ImageChops, ImageEnhance

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media")
os.makedirs(OUT, exist_ok=True)

SS = 2  # supersample: draw big, downsample for clean edges


# ------------------------------------------------------------------ colour
def lerp(a, b, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def shade(c, k):
    return tuple(max(0, min(255, int(v * k))) for v in c)


def vgrad(size, stops):
    w, h = size
    strip = Image.new("RGB", (1, h))
    px = strip.load()
    for y in range(h):
        t = y / max(1, h - 1)
        col = stops[-1][1]
        for i in range(len(stops) - 1):
            p0, c0 = stops[i]
            p1, c1 = stops[i + 1]
            if p0 <= t <= p1:
                col = lerp(c0, c1, (t - p0) / max(1e-6, p1 - p0))
                break
        px[0, y] = col
    return strip.resize(size, Image.BILINEAR)


# ------------------------------------------------------------------ perspective
def _solve(m, b):
    """Gaussian elimination with partial pivoting. Pillow needs 8 coefficients
    and numpy is not available here, so this is the whole linear algebra budget."""
    n = len(b)
    a = [row[:] + [b[i]] for i, row in enumerate(m)]
    for col in range(n):
        piv = max(range(col, n), key=lambda r: abs(a[r][col]))
        a[col], a[piv] = a[piv], a[col]
        pv = a[col][col]
        if abs(pv) < 1e-12:
            continue
        a[col] = [v / pv for v in a[col]]
        for r in range(n):
            if r != col and a[r][col]:
                f = a[r][col]
                a[r] = [v - f * w for v, w in zip(a[r], a[col])]
    return [a[i][n] for i in range(n)]


def perspective_coeffs(dst_quad, src_quad):
    """Coefficients mapping destination pixels back to source (what PIL wants)."""
    m, b = [], []
    for (dx, dy), (sx, sy) in zip(dst_quad, src_quad):
        m.append([dx, dy, 1, 0, 0, 0, -sx * dx, -sx * dy])
        b.append(sx)
        m.append([0, 0, 0, dx, dy, 1, -sy * dx, -sy * dy])
        b.append(sy)
    return _solve(m, b)


def warp(layer, size, dst_quad):
    """Place `layer` (a flat RGBA elevation) into `size` at the given quad."""
    w, h = layer.size
    src = [(0, 0), (w, 0), (w, h), (0, h)]
    c = perspective_coeffs(dst_quad, src)
    return layer.transform(size, Image.PERSPECTIVE, c, Image.BICUBIC)


# ------------------------------------------------------------------ palettes
PALETTES = {
    "brick": dict(body=(168, 106, 84), body2=(150, 92, 74), trim=(240, 234, 224),
                  base=(112, 76, 64), glass=(72, 96, 120)),
    "stucco": dict(body=(214, 190, 158), body2=(197, 172, 141), trim=(250, 246, 238),
                   base=(146, 126, 104), glass=(76, 100, 124)),
    "modern": dict(body=(163, 167, 172), body2=(138, 143, 150), trim=(248, 248, 246),
                   base=(92, 98, 106), glass=(66, 90, 118)),
    "warmgrey": dict(body=(188, 179, 168), body2=(169, 160, 149), trim=(252, 249, 244),
                     base=(118, 111, 103), glass=(74, 98, 122)),
}

SKY = [
    (0.00, (96, 146, 198)),
    (0.36, (150, 189, 222)),
    (0.70, (204, 224, 236)),
    (1.00, (240, 234, 222)),
]

GREENS = [(78, 106, 62), (98, 128, 74), (64, 92, 56), (118, 144, 88), (86, 118, 78)]


# ------------------------------------------------------------------ facade layer
def window_tile(glass, size=(26, 44)):
    return vgrad(size, [
        (0.00, (226, 236, 244)),
        (0.26, lerp(glass, (210, 228, 240), 0.55)),
        (0.72, glass),
        (1.00, shade(glass, 0.5)),
    ])


def facade_layer(w, h, pal, rng, floors, tile, balconies=True, texture=True):
    """A flat elevation on transparent ground, ready to be warped."""
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    body, body2 = pal["body"], pal["body2"]
    trim, base = pal["trim"], pal["base"]

    d.rectangle([0, 0, w, h], fill=body + (255,))

    fh = h / floors
    bays = max(4, int(round(w / (fh * 0.80))))
    bw = w / bays

    for c in range(bays):
        if c % 2 == 0:
            d.rectangle([c * bw, 0, (c + 1) * bw, h], fill=body2 + (255,))

    # masonry texture — breaks the flat fill that gives illustrations away
    if texture:
        n = Image.effect_noise((w, h), 14).filter(ImageFilter.GaussianBlur(0.6))
        img = Image.composite(
            Image.blend(img.convert("RGB"),
                        ImageChops.add(img.convert("RGB"), Image.merge("RGB", (n, n, n)), scale=11),
                        0.5).convert("RGBA"),
            img, Image.new("L", (w, h), 90))
        d = ImageDraw.Draw(img)

    # ground-floor base course
    d.rectangle([0, h - fh * 0.7, w, h], fill=base + (255,))

    # parapet
    d.rectangle([-w * 0.01, -h * 0.018, w * 1.01, h * 0.024], fill=trim + (255,))
    d.rectangle([-w * 0.01, h * 0.024, w * 1.01, h * 0.036], fill=shade(trim, 0.8) + (255,))

    win_w, win_h = bw * 0.5, fh * 0.5

    for f in range(floors):
        fy = f * fh
        ground = f == floors - 1
        d.rectangle([0, fy + fh - fh * 0.06, w, fy + fh], fill=shade(trim, 0.9) + (255,))

        for c in range(bays):
            bx = c * bw
            ww, wh = win_w, win_h
            wx = bx + (bw - ww) / 2
            wy = fy + fh * 0.24
            if ground:
                wy, wh = fy + fh * 0.16, fh * 0.44

            is_balcony = balconies and not ground and c % 3 == 1
            if is_balcony:
                d.rectangle([bx + bw * 0.07, fy + fh * 0.10, bx + bw * 0.93, fy + fh - fh * 0.07],
                            fill=shade(body, 0.7) + (255,))
                ww = bw * 0.68
                wx = bx + (bw - ww) / 2

            pane = tile.resize((max(2, int(ww)), max(2, int(wh))), Image.BILINEAR)
            img.paste(pane, (int(wx), int(wy)))
            d.rectangle([wx, wy, wx + ww, wy + wh], outline=trim + (255,),
                        width=max(1, int(bw * 0.026)))
            d.rectangle([wx - ww * 0.06, wy + wh, wx + ww * 1.06, wy + wh + fh * 0.04],
                        fill=trim + (255,))

            if is_balcony:
                ry = fy + fh - fh * 0.28
                d.rectangle([bx + bw * 0.07, ry, bx + bw * 0.93, ry + fh * 0.03],
                            fill=trim + (255,))
                for r in range(7):
                    rx = bx + bw * 0.09 + r * (bw * 0.84 / 6)
                    d.line([rx, ry, rx, fy + fh - fh * 0.07], fill=shade(trim, 0.78) + (255,),
                           width=max(1, int(bw * 0.013)))
                d.rectangle([bx + bw * 0.07, fy + fh - fh * 0.09, bx + bw * 0.93, fy + fh - fh * 0.035],
                            fill=shade(body, 0.56) + (255,))
    return img


def foliage(img, rng, band_y, h_range, count, blur, spread=(0.0, 1.0)):
    w, h = img.size
    lay = Image.new("RGB", (w, h), (0, 0, 0))
    msk = Image.new("L", (w, h), 0)
    ld, md = ImageDraw.Draw(lay), ImageDraw.Draw(msk)
    for _ in range(count):
        cx = rng.uniform(w * spread[0], w * spread[1])
        rw = rng.uniform(w * 0.035, w * 0.085)
        rh = rng.uniform(*h_range)
        cy = band_y + rng.uniform(-h * 0.012, h * 0.02)
        tone = rng.choice(GREENS)
        for _ in range(rng.randint(3, 6)):
            ox = rng.uniform(-rw * 0.5, rw * 0.5)
            oy = rng.uniform(-rh * 0.4, rh * 0.2)
            lw = rw * rng.uniform(0.45, 0.85)
            lh = rh * rng.uniform(0.45, 0.9)
            c = shade(tone, rng.uniform(0.8, 1.2))
            ld.ellipse([cx + ox - lw, cy + oy - lh, cx + ox + lw, cy + oy + lh], fill=c)
            md.ellipse([cx + ox - lw, cy + oy - lh, cx + ox + lw, cy + oy + lh], fill=255)
    lay = lay.filter(ImageFilter.GaussianBlur(blur))
    msk = msk.filter(ImageFilter.GaussianBlur(blur))
    img.paste(Image.composite(lay, img, msk))


def sun_bloom(img, at, radius, warmth=(255, 240, 214), strength=0.5):
    w, h = img.size
    g = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(g)
    for i in range(44, 0, -1):
        t = i / 44
        r = radius * t
        d.ellipse([at[0] - r, at[1] - r, at[0] + r, at[1] + r],
                  fill=int(255 * (1 - t) ** 2 * strength))
    g = g.filter(ImageFilter.GaussianBlur(w // 14))
    return Image.composite(ImageChops.screen(img, Image.new("RGB", (w, h), warmth)), img, g)


def grain(img, amount=5):
    w, h = img.size
    n = Image.effect_noise((w, h), amount).filter(ImageFilter.GaussianBlur(0.5))
    n = Image.merge("RGB", (n, n, n))
    return Image.blend(img, ImageChops.add(img, n, scale=10), 0.32)


# ------------------------------------------------------------------ scene
def community(size, seed, palette="brick", floors=5, sun_x=0.16, recede=0.30, wide=False):
    w, h = size[0] * SS, size[1] * SS
    rng = random.Random(seed)
    pal = PALETTES[palette]
    tile = window_tile(pal["glass"])

    img = vgrad((w, h), SKY)

    # --- clouds
    cl = Image.new("RGB", (w, h), (0, 0, 0))
    cm = Image.new("L", (w, h), 0)
    cd, cmd = ImageDraw.Draw(cl), ImageDraw.Draw(cm)
    for _ in range(9):
        cy = rng.uniform(h * 0.03, h * 0.40)
        cw = rng.uniform(w * 0.18, w * 0.5)
        ch = rng.uniform(h * 0.025, h * 0.07)
        cx = rng.uniform(0, w)
        cd.ellipse([cx - cw, cy - ch, cx + cw, cy + ch], fill=(255, 253, 248))
        cmd.ellipse([cx - cw, cy - ch, cx + cw, cy + ch], fill=rng.randint(80, 150))
    img = Image.composite(cl.filter(ImageFilter.GaussianBlur(w * 0.022)), img,
                          cm.filter(ImageFilter.GaussianBlur(w * 0.022)))

    horizon = h * 0.86
    top = horizon - h * (0.52 if wide else 0.60)

    # --- setback neighbour, hazed toward the sky (aerial perspective)
    nb_layer = facade_layer(1400, 900, PALETTES["warmgrey"], rng, max(3, floors - 1),
                            tile, balconies=False, texture=False)
    nb_top, nb_bot = horizon - h * 0.30, horizon
    nb = warp(nb_layer, (w, h), [
        (w * 0.66, nb_top + h * 0.05), (w * 1.16, nb_top),
        (w * 1.16, nb_bot), (w * 0.66, nb_bot),
    ])
    nb = Image.alpha_composite(Image.new("RGBA", (w, h), (0, 0, 0, 0)), nb)
    haze = Image.new("RGBA", (w, h), (198, 218, 234, 255))
    nb = Image.blend(nb, Image.composite(haze, nb, nb.split()[3]), 0.34)
    img.paste(nb.filter(ImageFilter.GaussianBlur(w * 0.0025)), (0, 0), nb.split()[3])

    # --- the subject: front elevation, warped so the far end recedes
    front = facade_layer(2200, 1300, pal, rng, floors, tile)
    x_near, x_far = w * (-0.10 if wide else -0.02), w * (0.74 if wide else 0.70)
    near_top, near_bot = top, horizon + h * 0.02
    far_top = top + (near_bot - near_top) * recede * 0.42
    far_bot = horizon - h * 0.055 * recede / 0.30
    front_w = warp(front, (w, h), [
        (x_near, near_top), (x_far, far_top), (x_far, far_bot), (x_near, near_bot),
    ])

    # cast shadow on the lawn, thrown away from the sun
    sh = Image.new("L", (w, h), 0)
    sd = ImageDraw.Draw(sh)
    off = w * (0.10 if sun_x < 0.5 else -0.10)
    sd.polygon([(x_near + off, near_bot), (x_far + off * 0.5, far_bot),
                (x_far + off * 1.6, far_bot + h * 0.05),
                (x_near + off * 2.1, near_bot + h * 0.09)], fill=120)
    sh = sh.filter(ImageFilter.GaussianBlur(w * 0.012))

    # --- ground
    d = ImageDraw.Draw(img)
    d.rectangle([0, horizon - h * 0.06, w, h], fill=(132, 150, 100))
    d.polygon([(w * 0.06, h), (w * 0.30, h), (w * 0.50, horizon - h * 0.02),
               (w * 0.42, horizon - h * 0.02)], fill=(212, 205, 190))
    img = Image.composite(Image.blend(img, Image.new("RGB", (w, h), (44, 56, 40)), 0.42), img, sh)

    # --- building over the ground
    img.paste(front_w, (0, 0), front_w.split()[3])

    # --- return wall, in cool shade
    ret = facade_layer(700, 1200, pal, rng, floors, tile, balconies=False)
    ret = ImageEnhance.Brightness(ret).enhance(0.66)
    ret_w = warp(ret, (w, h), [
        (x_far, far_top), (x_far + w * 0.11, far_top + h * 0.03),
        (x_far + w * 0.11, far_bot - h * 0.012), (x_far, far_bot),
    ])
    img.paste(ret_w, (0, 0), ret_w.split()[3])

    # --- planting: a low band at the base only. Big foreground crowns were the
    #     most cartoonish element in earlier passes, so they are gone; depth now
    #     comes from the perspective and the shadow instead.
    foliage(img, rng, horizon - h * 0.025, (h * 0.022, h * 0.045), 18, w * 0.0035)

    # --- light
    img = sun_bloom(img, (w * sun_x, h * 0.08), w * 0.7)

    # atmospheric haze toward the horizon — softens the hard CG edge
    hz = vgrad((w, h), [(0.0, (255, 255, 255)), (0.55, (255, 255, 255)), (1.0, (255, 255, 255))])
    hm = vgrad((w, h), [(0.0, (0, 0, 0)), (0.62, (26, 26, 26)), (1.0, (54, 54, 54))]).convert("L")
    img = Image.composite(Image.blend(img, hz, 0.5), img, hm)

    img = img.resize(size, Image.LANCZOS)
    img = ImageEnhance.Brightness(img).enhance(1.04)
    img = ImageEnhance.Color(img).enhance(0.96)
    img = ImageEnhance.Contrast(img).enhance(1.03)
    return grain(img, 6)


jobs = [
    dict(name="hero-community.jpg", size=(2560, 1440), seed=31, palette="brick",
         floors=5, sun_x=0.14, recede=0.34, wide=True, quality=86),
    dict(name="cta-community.jpg", size=(2400, 1100), seed=77, palette="stucco",
         floors=4, sun_x=0.84, recede=0.28, wide=True, quality=85),
    dict(name="asset-parkline.jpg", size=(1600, 1200), seed=203, palette="brick",
         floors=4, sun_x=0.20, recede=0.30, quality=85),
    dict(name="asset-brightwater.jpg", size=(1600, 1200), seed=417, palette="stucco",
         floors=5, sun_x=0.76, recede=0.26, quality=85),
    dict(name="asset-cedarhouse.jpg", size=(1600, 1200), seed=826, palette="modern",
         floors=6, sun_x=0.28, recede=0.33, quality=85),
    dict(name="founder-context.jpg", size=(1200, 1500), seed=644, palette="warmgrey",
         floors=6, sun_x=0.24, recede=0.30, quality=84),
    dict(name="og.jpg", size=(1200, 630), seed=31, palette="brick",
         floors=5, sun_x=0.14, recede=0.34, wide=True, quality=86),
]

for j in jobs:
    q, name = j.pop("quality"), j.pop("name")
    img = community(**j)
    p = os.path.join(OUT, name)
    img.save(p, quality=q, optimize=True, progressive=True)
    print(f"{name:26} {img.size}  {os.path.getsize(p)//1024} KB")
