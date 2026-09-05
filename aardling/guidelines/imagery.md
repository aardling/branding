# Imagery

Aardling has two kinds of picture, and they follow different rules.

## Gradients

Three, in `assets/images/`. They are **SVG** — a few kilobytes each, sharp at any size, and
they carry their own grain through an SVG filter rather than a baked-in texture.

| File | What it is | Use for |
| --- | --- | --- |
| `gradient-meridian.svg` | Night Blue to a lighter indigo, one Ocean Blue highlight and a faint Lime Green. | The quiet one. Behind a slide of content, or a section band that must not compete. |
| `gradient-bloom.svg` | Snow White into Violet, with Lime Green and Pink blooms. | The light option, and the only one that takes Night Blue text-adjacent panels well. |
| `gradient-harvest.svg` | Snow White into Yellow, with a second Yellow bloom low, Pink opposite, and a Lime Green highlight. | The warm option. Social cards, event artwork, a title slide. |

**Each one sits at one end of the luminance range, and stays there.** Meridian is dark
throughout; Bloom and Harvest are light throughout. That is what lets a single knocked-out
colour separate cleanly from the whole field rather than only from part of it. A gradient
whose ramp spans the range takes no mark at all: the warm gradient that preceded Harvest
ran from Pink to deep indigo and was withdrawn for exactly that reason. A new colourway
holds the same discipline or it does not ship.

They are **artwork, not colour**. Do not sample a pixel out of one and add it to the palette;
the palette is in `colour.md` and is defined in text. Do not recolour them ad hoc either — if
a new colourway is needed, it gets drawn and added here.

Each is authored at 1600×1000 with `preserveAspectRatio="xMidYMid slice"`, so it fills any
box without distorting. Give it a container with a real aspect ratio and let it crop.

## Illustrations

Three, in `assets/images/`, as `webp` with a `png` beside each for anything that cannot read
WebP.

| File | Subject |
| --- | --- |
| `illustration-workshop` | A workshop in progress. |
| `illustration-coaching` | One-to-one coaching. |
| `illustration-event` | A conference or event. |

These are painterly and stay raster — they are the exception the SVG rule exists for. They are
shipped at 1600px, which is enough for a full-width web block or a slide. The full-resolution
masters (5000×5000, plus CMYK TIFFs for print) live in Aardling's Google Drive brand folder;
take them from there for anything printed.

## What may sit on a gradient

Either mark, knocked out: the logotype or the icon logo. White on Meridian, Night Blue on
Bloom and Harvest. Both are the brand's own lettering rather than running text, so the same
licence covers the social avatar and a title card carrying the full name.

The knockout colours are measured under each mark's own ink rather than against the field's
average — white on Meridian is 6.75:1 at worst, Night Blue on Bloom 9.42:1, Night Blue on
Harvest 12.02:1. Holding one end of the luminance range is exactly what buys that: a single
colour separates from the whole field, not merely from part of it.

**The minimum size depends on which mark.** The limit is legibility, not contrast, which stays
well clear on all three. Under it the grain starts competing with the mark's hairlines and the
letterform dissolves.

| Mark | Not below |
| --- | --- |
| Logotype | 380px wide |
| Icon logo | 64px wide |

The logotype needs the larger floor because its cap height is a small fraction of its width;
the icon logo is the same lettering at a far coarser scale and survives much smaller. If the
space is under those widths, use a flat approved ground instead of a gradient. The favicon is
the one exception, and it is a generated derivative with its own rules below.

Ready-made lockups of both marks on all three gradients are in `assets/logos/lockups/`. See
`logos.md`.

**Nothing else goes on top.** No headlines over a gradient, no body copy over an
illustration, no captions over either, and no scrim or blur to make it work. The rule is in
`layout.md` and imagery does not get an exception from it. Text goes beside the image, or on
a solid panel next to it.

## The favicon

The favicon is the icon logo knocked out at small size: the mark in Night Blue on a rounded
tile cut from `gradient-bloom.svg`. `assets/favicons/favicon.svg` is the source; every raster in
`assets/favicons/` is generated from it.

Four things are fixed about the drawing, and each was decided against rendered output rather than
by eye at full size.

| Decision | Value | Why |
| --- | --- | --- |
| Crop | The gradient's own `xMidYMid slice` centre square | No bespoke framing. A tighter crop into Bloom's lightest corner raises contrast but lands in the Lime Green bloom, and the tile goes mint. |
| Corner radius | 22% of the tile | The `--radius-*` tokens are absolute and do not transfer to a drawing rendered anywhere from 16 to 512px. 22% is what iOS, Android and macOS round app tiles to. |
| Mark size | 82% of the tile width | At 74% the hairlines fall below one pixel at 16px and drop out. |
| Mark stroke | 0.8 units, in the mark's own colour | Optical compensation. It thickens the hairlines symmetrically without redrawing the letterform. |

The mark measures 9.66:1 against the tile at its thinnest strokes, well over the 3:1 a non-text
graphic needs. The tile itself is only 1.37:1 against light browser chrome, so on a light tab strip
the silhouette thins out and the mark carries; on dark chrome it is 10.59:1.

**The favicon drops the grain.** This is the one place a gradient is used without its
`feTurbulence` filter. Below about 64px the filter is sampled far under its own frequency and lands
as coloured blotch fighting the mark, and it renders at a different apparent size depending on how
large the icon is rasterised. That licence is narrow: the favicon is a generated derivative at fixed
small sizes, not a reproduction of the gradient. The artwork in `assets/images/` keeps its grain, and
nowhere that shows a gradient as itself may drop it.

Two sizes are drawn from a heavier cut — 86% and a 1.5 stroke — embedded as the 16 and 32 bitmaps
inside `favicon.ico`. Browsers that support SVG favicons use `favicon.svg` and rasterise it
themselves, so that heavier cut reaches Windows shortcuts, bookmark exports and older browsers only.
`apple-touch-icon.png` is generated full-bleed and square, without the rounded corners: iOS applies
its own mask and composites on black, so a rounded source would show black corners.

## Where the masters are

Vector logo masters, the icon set in six colourways, the illustration masters and the print
files are in the **Aardling - Brand** shared Google Drive. This package carries the versions
meant for building things; Drive carries the originals.
