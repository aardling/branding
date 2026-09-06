# Imagery

Aardling has two kinds of picture, and they follow different rules.

## Gradients

Four, in `assets/images/`. They are **SVG** — a few kilobytes each, and sharp at any size.

**Bloom and Harvest carry grain**, drawn as an SVG filter rather than a baked-in texture.
**Vesper and Understory do not**, and the reason is measured rather than aesthetic: the
filter's bright excursions are the worst pixels in a dark field, so they land exactly where
white has least room. With grain, white on Vesper falls from 5.20:1 at worst instead of
6.57:1, and white on Understory falls to 4.60:1 — under the 5.07:1 floor the dark gradients
are held to. The light gradients have the opposite problem and keep their grain: there the
worst pixel is the darkest, and the filter does not make one.

| File | What it is | Use for |
| --- | --- | --- |
| `gradient-vesper.svg` | Near-black to a deep violet, a Pink glow low left, Ocean Blue holding the far corner. | The quiet dark one. Behind a slide of content, or a section band that must not compete. |
| `gradient-understory.svg` | The darkest field in the brand: Ocean Blue at one corner, Lime Green at the other, near-black between them. | The dark one that is meant to be looked at. A cover, a full-bleed ground under a lot of white text. It competes, deliberately — do not put it behind something else that matters. |
| `gradient-bloom.svg` | Snow White into Violet, with Lime Green and Pink blooms. | The light option, and the only one that takes Night Blue text-adjacent panels well. |
| `gradient-harvest.svg` | Snow White into Yellow, with a second Yellow bloom low, Pink opposite, and a Lime Green highlight. | The warm option. Social cards, event artwork, a title slide. |

**Each one sits at one end of the luminance range, and stays there.** Vesper and Understory
are dark throughout; Bloom and Harvest are light throughout. That is what lets a single
knocked-out colour separate cleanly from the whole field rather than only from part of it. A
gradient whose ramp spans the range takes no mark at all: the warm gradient that preceded
Harvest ran from Pink to deep indigo and was withdrawn for exactly that reason. A new
colourway holds the same discipline or it does not ship.

They are **artwork, not colour**. Do not sample a pixel out of one and add it to the palette;
the palette is in `colour.md` and is defined in text. Do not recolour them ad hoc either — if
a new colourway is needed, it gets drawn and added here.

Each is authored at 1600×1000 with `preserveAspectRatio="xMidYMid slice"`, so it fills any
box without distorting. Give it a container with a real aspect ratio and let it crop.

### How the numbers here were arrived at

Every ratio on this page comes from one method: the SVG rendered at 1600×1000, sRGB
linearised, WCAG relative luminance per pixel, contrast taken against the knockout colour.
The worst pixel is the brightest one where white knocks out and the darkest one where Night
Blue does.

Bloom's and Harvest's figures were re-measured with that method when Vesper and Understory
were added. They moved: the mark on Bloom was recorded as 9.42:1 and measures 8.08:1, and on
Harvest 12.02:1 against 10.33:1. The artwork did not change — the earlier figures came from a
method that is not reproducible from anything in this repository. The lower numbers are the
ones to trust, and all four rows are now comparable to each other.

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

Either mark, knocked out: the logotype or the icon logo. White on Vesper and Understory, Night
Blue on Bloom and Harvest. Both are the brand's own lettering rather than running text, so the
same licence covers the social avatar and a title card carrying the full name.

The knockout colours are measured under each mark's own ink rather than against the field's
average. Both marks are measured, and the worse of the two is the number below — in all four
cases that is the logotype, whose hairlines reach further across the field than the icon's.

| Gradient | Knockout | Field | Under the mark's ink |
| --- | --- | --- | --- |
| `gradient-vesper.svg` | White | 6.57:1 – 17.86:1 | 7.09:1 |
| `gradient-understory.svg` | White | 5.71:1 – 18.56:1 | 7.00:1 |
| `gradient-bloom.svg` | Night Blue | 7.35:1 – 15.29:1 | 8.08:1 |
| `gradient-harvest.svg` | Night Blue | 9.62:1 – 15.00:1 | 10.33:1 |

Holding one end of the luminance range is exactly what buys that: a single colour separates
from the whole field, not merely from part of it.

**The minimum size depends on which mark.** The limit is legibility, not contrast, which stays
well clear on all four. On Bloom and Harvest, the grain starts competing with the mark's
hairlines under it and the letterform dissolves; on Vesper and Understory, which have no
grain, the limit is simply the hairlines themselves falling below a pixel. The floors are the
same for both cases, so one number covers all four.

| Mark | Not below |
| --- | --- |
| Logotype | 380px wide |
| Icon logo | 64px wide |

The logotype needs the larger floor because its cap height is a small fraction of its width;
the icon logo is the same lettering at a far coarser scale and survives much smaller. If the
space is under those widths, use a flat approved ground instead of a gradient. The favicon is
the one exception, and it is a generated derivative with its own rules below.

Ready-made lockups of both marks on all four gradients are in `assets/logos/lockups/`. See
`logos.md`.

## A heading may go on a gradient

One heading, and nothing else. It takes the same colour the knocked-out mark takes on that
ground — white on Vesper and Understory, Night Blue on Bloom and Harvest — so a gradient never
carries two lettering colours.

Four constraints, and each one exists because of something measured:

| Constraint | Why |
| --- | --- |
| The body face, never Voyage. | Voyage's thick-to-thin contrast and hairline serifs lose to the grain. It is the same interference that sets the marks' minimum sizes. |
| `--font-size-h3` (35px) or larger. | Comfortably past the large-text threshold, with margin for the grain. |
| At most half the width, **and on the side the table below names**. | The field's luminance changes across it. Full width across the middle, a heading runs 6.65:1 to 16.25:1 on Vesper and 5.87:1 to 17.33:1 on Understory — swings of nine and eleven points, which read as the line changing weight along its length. Confined to the region below, the same heading swings 2.91 and 3.88. Half the width alone does not do it: Understory's right half still swings 10.41, because its bright corner is on that side. |
| Two or three lines, balanced. | A heading is a phrase held inside one region of the artwork, not a line crossing it. |

**Where the heading goes.** Each gradient has one region where the field is steadiest. It was
found by scoring every 660×400 box in the artwork by how far contrast swings across it and
taking the lowest. The origins are given in the artwork's own 1600×1000 coordinates.

| Gradient | Region | Origin | Contrast across it |
| --- | --- | --- | --- |
| `gradient-vesper.svg` | Upper right | 840, 120 | 6.57:1 – 9.48:1 |
| `gradient-understory.svg` | Lower left | 60, 540 | 14.41:1 – 18.29:1 |
| `gradient-bloom.svg` | Right, vertically centred | 840, 360 | 7.65:1 – 11.54:1 |
| `gradient-harvest.svg` | Lower right | 840, 480 | 10.20:1 – 13.75:1 |

A swing measured high up the scale costs less than the same swing near the floor — the four
points across Understory's region, all of it above 14:1, are not visible, where four points
starting at 4.5:1 would be. Read the pair of numbers, not the difference alone.

**A gradient carries a mark or a heading, never both.** The knocked-out logotype is already a
title treatment. Two lettering treatments on one piece of artwork is the failure this rule
exists to prevent.

**Nothing else goes on top.** No body copy, no captions, no labels, no lists, no buttons —
and no scrim or blur anywhere, on anything. Body copy is small and long and would cross the
field the way a full-width heading does; it is never set on artwork.

**Illustrations take no text at all.** Not a heading, not a caption. The licence above is for
gradients only, because a gradient is a controlled field with a measured luminance band and
an illustration is not. Text goes beside an illustration, or on a solid panel next to it.

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

**The favicon drops the grain.** Bloom carries grain and the favicon cut from it does not.
Below about 64px the filter is sampled far under its own frequency and lands as coloured blotch
fighting the mark, and it renders at a different apparent size depending on how large the icon is
rasterised. That licence is narrow: the favicon is a generated derivative at fixed small sizes, not
a reproduction of the gradient. Bloom and Harvest keep their grain wherever they are shown as
themselves, and nowhere that reproduces one of them may drop it. Vesper and Understory are a
separate case — they have no grain to drop.

Two sizes are drawn from a heavier cut — 86% and a 1.5 stroke — embedded as the 16 and 32 bitmaps
inside `favicon.ico`. Browsers that support SVG favicons use `favicon.svg` and rasterise it
themselves, so that heavier cut reaches Windows shortcuts, bookmark exports and older browsers only.
`apple-touch-icon.png` is generated full-bleed and square, without the rounded corners: iOS applies
its own mask and composites on black, so a rounded source would show black corners.

## Where the masters are

Vector logo masters, the icon set in six colourways, the illustration masters and the print
files are in the **Aardling - Brand** shared Google Drive. This package carries the versions
meant for building things; Drive carries the originals.
