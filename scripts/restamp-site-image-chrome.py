#!/usr/bin/env python3
"""Bulk restamp G.A.I.N chrome onto OLD hero PNGs that have empty corners.

For empty-corner bulk restamp of OLD images only. Never use this on new
GenerateImage output. Compose chrome in the original GenerateImage instead
(see .cursor/rules/site-image-chrome.mdc).

Skips (fails) if the top-left or bottom-right already contain text, so a
stamp cannot cover titles, labels, or legends.
"""

from __future__ import annotations

import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

BOLD = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
REGULAR = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
WHITE = (255, 255, 255, 255)
MUTED = (186, 210, 232, 255)
# Bright occupancy in a corner above this share is treated as existing text.
_TEXT_LUMA = 180
_TEXT_SHARE = 0.04


class OccupiedCornerError(RuntimeError):
    """Top-left or bottom-right already has text; stamping would cover it."""


def _region_has_text(im: Image.Image, box: tuple[int, int, int, int]) -> bool:
    crop = im.crop(box).convert("L")
    pixels = list(crop.getdata())
    if not pixels:
        return False
    bright = sum(1 for p in pixels if p > _TEXT_LUMA)
    return (bright / len(pixels)) > _TEXT_SHARE


def _hex_points(cx: float, cy: float, r: float) -> list[tuple[float, float]]:
    # Flat-top hex matching static/img/logo.svg (r ~ 9 in 18px icon).
    w = r * (7.8 / 9)
    h = r
    return [
        (cx, cy - h),
        (cx + w, cy - h / 2),
        (cx + w, cy + h / 2),
        (cx, cy + h),
        (cx - w, cy + h / 2),
        (cx - w, cy - h / 2),
    ]


def stamp(path: Path) -> None:
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    tl = (0, 0, max(1, int(w * 0.28)), max(1, int(h * 0.16)))
    br = (min(w - 1, int(w * 0.72)), min(h - 1, int(h * 0.84)), w, h)
    if _region_has_text(im, tl) or _region_has_text(im, br):
        raise OccupiedCornerError(
            f"skip {path.name}: top-left or bottom-right already contains text"
        )
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    pad = max(18, int(w * 0.022))
    icon_r = max(14, int(w * 0.014))
    stroke = max(1.5, w * 0.00115)
    cx = pad + icon_r
    cy = pad + icon_r

    draw.ellipse(
        [cx - icon_r, cy - icon_r, cx + icon_r, cy + icon_r],
        outline=WHITE,
        width=max(2, int(round(stroke))),
    )
    hex_r = icon_r * 0.56
    pts = _hex_points(cx, cy, hex_r)
    draw.polygon(pts, outline=WHITE, width=max(2, int(round(stroke))))
    # Internal wireframe
    draw.line([pts[0], pts[3]], fill=WHITE, width=max(2, int(round(stroke))))
    draw.line([pts[1], pts[4]], fill=WHITE, width=max(2, int(round(stroke))))
    draw.line([pts[2], pts[5]], fill=WHITE, width=max(2, int(round(stroke))))
    dot = max(2, int(icon_r * 0.09))
    draw.ellipse([cx - dot, cy - dot, cx + dot, cy + dot], fill=WHITE)

    word_size = max(16, int(w * 0.0165))
    font_gain = ImageFont.truetype(str(BOLD), word_size)
    gx = cx + icon_r + max(10, int(w * 0.01))
    gy = cy - word_size * 0.42
    draw.text((gx, gy), "G.A.I.N", font=font_gain, fill=WHITE)

    url_size = max(13, int(w * 0.0125))
    font_url = ImageFont.truetype(str(REGULAR), url_size)
    url = "jitendersharma.dev"
    bbox = draw.textbbox((0, 0), url, font=font_url)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    ux = w - pad - tw
    uy = h - pad - th
    draw.text((ux, uy), url, font=font_url, fill=MUTED)

    out = Image.alpha_composite(im, overlay).convert("RGB")
    out.save(path, "PNG", optimize=True)
    print(f"stamped {path.name} ({w}x{h})")


def main() -> int:
    paths = [Path(p) for p in sys.argv[1:]]
    if not paths:
        print("usage: restamp-site-image-chrome.py <png>...", file=sys.stderr)
        return 2
    failed = False
    for p in paths:
        if not p.is_file():
            print(f"missing: {p}", file=sys.stderr)
            return 1
        try:
            stamp(p)
        except OccupiedCornerError as exc:
            print(str(exc), file=sys.stderr)
            failed = True
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
