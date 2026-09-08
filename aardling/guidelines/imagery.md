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

## Photographs

Where gradients and illustrations are drawn, a photograph is found. It earns a place only
when an article has a concrete, real subject: the port in a piece about logistics, a trading
floor for a finance client, a ward for a healthcare domain model. A photograph pictures a
place; a gradient or an illustration pictures a mood — and that licence is only worth
spending when the article actually has a place to picture.

### When a photograph is the right call

Ask what the article is actually about. A specific real-world domain — logistics, healthcare,
finance, retail, manufacturing, agriculture — is a photograph's job: show the domain, not the
software. A general engineering or process topic — testing strategy, team structure, an
internal retrospective — has no real subject to photograph; reach for an illustration or a
gradient instead, or run with no image at all. Adding a photo doesn't make an abstract topic
more concrete — the wrong photo just makes it generic instead.

If unsure, one question decides it: could this photograph run under a different headline,
about a different company, in the same domain, and still be correct? If yes — a generic
office, a generic server room, a generic handshake — it is stock, not evidence, and it does
not belong.

### Ideas, so choosing one isn't the hard part

A short list of domains Aardling's articles keep returning to. It isn't exhaustive — the same
test applies to any domain not listed: photograph the world the software is modelling, never
the software itself.

| Article is about… | Photograph |
| --- | --- |
| Logistics, supply chain | A port, a container yard, a warehouse floor, a fleet in a depot. |
| Finance, banking, insurance | A trading floor, a clearing house, a claims office — paperwork and process, not a stock handshake. |
| Healthcare | A ward, a pharmacy, an ambulance bay. |
| Manufacturing | A production line, a factory floor, a quality-control bench. |
| Agriculture | A field under work, a grain store, a co-op auction. |
| Retail, e-commerce | A distribution centre, a shop floor, a fulfilment line. |
| Energy, utilities | A grid substation, a control room, a wind farm. |

None of these is Aardling's own subject — Aardling writes about the domain, so the photo is
always the client's world, not ours.

### What disqualifies a photo

Same instinct as `web.md`'s "no cliché metaphors" rule for icons: a handshake for
partnership, a lightbulb for an idea, a laptop keyboard close-up for "software", a meeting
room of people pointing at a whiteboard. These are stock, posed and interchangeable — they
picture the idea of work rather than the work itself. A real port, shot documentary-style,
beats a posed one every time, even at lower production value.

### Selecting and treating one

- **Documentary over staged.** A candid, working shot beats a posed, lit one — even a
  lower-resolution one.
- **Real colour.** No brand-colour tint, no duotone, no filter forcing it toward the palette.
  A photograph earns its place by being real; forcing it into the brand's colours undoes that.
- **Landscape, and croppable to 3:2.** The framing below assumes a wide source; a square or
  portrait source fights every container this brand puts a photo in.
- **Licensed for the use.** Editorial and commercial licences are not interchangeable — check
  before publishing, not after.

### Framing

The same container language as the rest of imagery, so a photograph slots into a hero, a card
or an article body without a bespoke rule.

| Setting | Value |
| --- | --- |
| Aspect ratio | 3:2, `object-fit: cover` — the ratio card media already uses. |
| Corners | `--radius-md`, or square where it's already full-bleed to a card's edge. |
| Border | 1px `--border-hairline` when the photo sits directly on the page or a raised surface — a straight photo edge disappears against Snow White without one. Skipped inside a card, where the card's own edge already does that job. |
| Caption | Optional for an aside; required, and numbered, for a content-critical image — see "Two ways to use an image in an article" below. `--font-size-small`, `--text-secondary`, `--space-1` below the image. |

A photograph follows every rule already in this file and in `layout.md`: never text on top of
it, not even a caption overlaid on the frame — the caption sits below, on the page ground. And
like an illustration, it takes no heading or mark knocked out of it; that licence is for
gradients only.

### Where they live

`assets/images/`, alongside the illustrations — full size for web, `webp` with a `png`
fallback. There's no photograph in the package yet; the first one ships when an article needs
it, sized and licensed for that use, not stockpiled ahead of need.

## Two ways to use an image in an article

Long-form text wants the occasional image, and there are two different jobs one can do.
Confusing them is why an image in an article ends up either too small to read or so large it
breaks the argument's pace.

### Illustrative aside

Breaks up a long run of text. Adds nothing the words don't already say — if removing it would
lose information, it's the content-critical pattern below, not this one.

| Setting | Value |
| --- | --- |
| Width | About a third of the text column, never more than half. |
| Placement | Floats left or right; text wraps beside it. Alternate sides rather than stacking two in a row on the same one. |
| Below `--breakpoint-sm` | The float drops. Full width, above or below the paragraph it illustrates. |
| Caption | Optional, unnumbered. Skip it, or spend it on a credit — a photographer, a source, who's pictured — not on describing the obvious. |

This is text flowing *beside* an image in the document flow, not the overlay the "never text
on top of an image" rule in `layout.md` forbids. That rule is about type set into the image
itself; a float is two things side by side.

### Content-critical

Carries information the text doesn't restate — a diagram, a chart, a screenshot the argument
depends on.

| Setting | Value |
| --- | --- |
| Width | Sized to what's legible, not to the column. A simple diagram stays small and centred; a dense one fills the column, or breaks out wider still. Never floated, never stretched past what it needs. |
| Aspect ratio | Its own — never cropped to 3:2 like a photograph. |
| Caption | Required, short, prefixed "Fig. N" — numbered in order through the article, and named at least once in the body text ("see Fig. 1"). |
| Web | Click to enlarge: a real button with an accessible name ("Enlarge: …"), opens the image full-screen over a dark scrim, pannable and zoomable, closes on Escape or a click outside it, and returns focus to the trigger on close. |
| Print | May take a full page — turned to landscape where that fits the content better — when the content needs more room than the page's text width gives it. |

The print exception never reaches the illustrative aside above: it's small by definition and
never needs the room.

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
