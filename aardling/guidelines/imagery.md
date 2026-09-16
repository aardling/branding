# Imagery

## Gradients

| File | What it is | Use for |
| --- | --- | --- |
| `gradient-vesper.svg` | Near-black to deep violet, a Pink glow low left, Ocean Blue in the far corner. | Quiet dark ground: behind a slide of content, a section band that must not compete. |
| `gradient-understory.svg` | The darkest field: Ocean Blue at one corner, Lime Green at the other, near-black between. | Dark ground meant to be looked at: a cover, a full-bleed ground under a lot of white text. Never behind something else that matters. |
| `gradient-bloom.svg` | Snow White into Violet, with Lime Green and Pink blooms. | Light ground. The only one that takes Night Blue text-adjacent panels well. |
| `gradient-harvest.svg` | Snow White into Yellow, a second Yellow bloom low, Pink opposite, a Lime Green highlight. | Warm ground: social cards, event artwork, a title slide. |

1. All four are SVG, in `assets/images/`.
2. Each is authored at 1600×1000 with `preserveAspectRatio="xMidYMid slice"`. Give it a
   container with a real aspect ratio and let it crop.
3. Bloom and Harvest carry grain, drawn as an SVG filter, not a baked-in texture.
4. Vesper and Understory carry no grain. With grain, white on Vesper falls from 6.57:1 to
   5.20:1 at worst, and on Understory to 4.60:1 — under the 5.07:1 floor for dark gradients.
5. Vesper and Understory are dark throughout; Bloom and Harvest are light throughout.
6. A gradient whose ramp spans the luminance range takes no mark. A new colourway stays at one
   end of the range or does not ship.
7. Gradients are artwork, not colour. Never sample a pixel into the palette; the palette is in
   `colour.md`.
8. Never recolour a gradient ad hoc. A new colourway is drawn and added here.

### Measurement

1. Every ratio in this file: the SVG rendered at 1600×1000, sRGB linearised, WCAG relative
   luminance per pixel, contrast against the knockout colour.
2. The worst pixel is the brightest where white knocks out, the darkest where Night Blue does.

## Illustrations

| File | Subject |
| --- | --- |
| `illustration-workshop` | A workshop in progress. |
| `illustration-coaching` | One-to-one coaching. |
| `illustration-event` | A conference or event. |

1. In `assets/images/`, as `webp` with a `png` beside each.
2. They are painterly and stay raster.
3. Shipped at 1600px: enough for a full-width web block or a slide.
4. For print, use the full-resolution masters (5000×5000, plus CMYK TIFFs) from the Google Drive
   brand folder.

## Photographs

1. Use a photograph only when the article has a concrete, real subject: a specific domain such
   as logistics, healthcare, finance, retail, manufacturing or agriculture.
2. Photograph the domain the software models, never the software.
3. A general engineering or process topic (testing strategy, team structure, an internal
   retrospective) gets an illustration, a gradient, or no image.
4. Test: could the photograph run under a different headline, about a different company, in the
   same domain, and still be correct? If yes, it is stock and does not belong.
5. The photograph is always the client's world, never Aardling's own.

### Subjects

The list is not exhaustive; the same test applies to any other domain.

| Article is about… | Photograph |
| --- | --- |
| Logistics, supply chain | A port, a container yard, a warehouse floor, a fleet in a depot. |
| Finance, banking, insurance | A trading floor, a clearing house, a claims office — paperwork and process, not a stock handshake. |
| Healthcare | A ward, a pharmacy, an ambulance bay. |
| Manufacturing | A production line, a factory floor, a quality-control bench. |
| Agriculture | A field under work, a grain store, a co-op auction. |
| Retail, e-commerce | A distribution centre, a shop floor, a fulfilment line. |
| Energy, utilities | A grid substation, a control room, a wind farm. |

### Disqualifiers

1. No cliché metaphors (as in `icons.md`): a handshake for partnership, a lightbulb for an idea,
   a laptop keyboard close-up for "software", people pointing at a whiteboard.
2. No stock, posed or interchangeable shots. A real scene shot documentary-style wins, even at
   lower production value.

### Selection and treatment

1. Documentary over staged, even at lower resolution.
2. Real colour. No brand-colour tint, no duotone, no filter.
3. Landscape, croppable to 3:2.
4. Licensed for the use. Editorial and commercial licences are not interchangeable; check before
   publishing.

### Framing

| Setting | Value |
| --- | --- |
| Aspect ratio | 3:2, `object-fit: cover`. |
| Corners | `--radius-md`, or square where full-bleed to a card's edge. |
| Border | 1px `--border-hairline` directly on the page or a raised surface. None inside a card. |
| Caption | Optional for an aside; required and numbered for a content-critical image. `--font-size-small`, `--text-secondary`, `--space-1` below the image. |

1. Never text on top of a photograph, including a caption. The caption sits below, on the page
   ground.
2. A photograph takes no heading or mark knocked out of it.

### Files

1. `assets/images/`, full size for web, `webp` with a `png` fallback.
2. The package holds no photograph yet. Add one when an article needs it, sized and licensed for
   that use.

## No image

1. Never ship a flat background with the title set as text.
2. Find a real image first. A case study usually has one on the client's site or press kit.
   Propose a candidate.
3. When no suitable photograph exists, fall back in this order, plainest first:
   1. **No image.** A content page renders correctly without one.
   2. **A brand illustration.** Whichever of the three reads closest to the content.
   3. **A generated cover.** The card's media is a Cover: the content's own title as a heading
      on a gradient, under every constraint in "Headings on a gradient". No subtitle, eyebrow or
      metadata on the gradient; those stay on the card, below the media.
4. A card whose media is a Cover drops its own title line. Eyebrow and metadata stay.
5. Use the generated cover only when the title needs to carry the piece.

## Images in articles

### Illustrative aside

Breaks up long text and adds no information. If removing it loses information, it is
content-critical.

| Setting | Value |
| --- | --- |
| Width | About a third of the text column, never more than half. |
| Placement | Floats left or right; text wraps beside it. Alternate sides; never two in a row on the same side. |
| Below `--breakpoint-sm` | No float. Full width, above or below its paragraph. |
| Caption | Optional, unnumbered. Omit it, or use it for a credit (photographer, source, who is pictured), not a description. |

1. A float is text beside an image, not text on it. `layout.md`'s rule is not broken.

### Content-critical

Carries information the text does not restate: a diagram, a chart, a screenshot.

| Setting | Value |
| --- | --- |
| Width | Sized to legibility. A simple diagram small and centred; a dense one fills the column or breaks out wider. Never floated, never stretched. |
| Aspect ratio | Its own. Never cropped to 3:2. |
| Caption | Required, short, prefixed "Fig. N", numbered in order, named at least once in the body ("see Fig. 1"). |
| Web | Click to enlarge: a real button with an accessible name ("Enlarge: …"). Opens full-screen over a dark scrim, pannable and zoomable, closes on Escape or a click outside, returns focus to the trigger. |
| Print | May take a full page, turned to landscape where that fits better, when it needs more than the text width. |

1. The full-page print exception never applies to an illustrative aside.

## Marks on a gradient

| Gradient | Knockout | Field | Under the mark's ink |
| --- | --- | --- | --- |
| `gradient-vesper.svg` | White | 6.57:1 – 17.86:1 | 7.09:1 |
| `gradient-understory.svg` | White | 5.71:1 – 18.56:1 | 7.00:1 |
| `gradient-bloom.svg` | Night Blue | 7.35:1 – 15.29:1 | 8.08:1 |
| `gradient-harvest.svg` | Night Blue | 9.62:1 – 15.00:1 | 10.33:1 |

1. Either mark may be knocked out of a gradient: the logotype or the icon logo.
2. White on Vesper and Understory; Night Blue on Bloom and Harvest.
3. The same licence covers the social avatar and a title card carrying the full name.
4. "Under the mark's ink" is the worse of the two marks, in all four cases the logotype.
5. Minimum sizes, on all four gradients:

   | Mark | Not below |
   | --- | --- |
   | Logotype | 380px wide |
   | Icon logo | 64px wide |

6. Below those widths, use a flat approved ground. The favicon is the one exception.
7. Ready-made lockups of both marks on all four gradients: `assets/logos/lockups/`. See
   `logos.md`.

## Headings on a gradient

1. One heading, nothing else.
2. The heading takes the knockout colour of that gradient: white on Vesper and Understory, Night
   Blue on Bloom and Harvest.
3. The body face, never Voyage. Voyage's hairline serifs lose to the grain.
4. `--font-size-h3` (35px) or larger.
5. At most half the width, and inside the gradient's region in the table below.
6. Two or three lines, balanced.
7. A gradient carries a mark or a heading, never both.
8. Nothing else on top: no body copy, captions, labels, lists or buttons.
9. No scrim or blur anywhere, on anything.
10. Illustrations take no text at all: no heading, no caption. Put text beside an illustration or
    on a solid panel next to it.

| Gradient | Region | Origin | Contrast across it |
| --- | --- | --- | --- |
| `gradient-vesper.svg` | Upper right | 840, 120 | 6.57:1 – 9.48:1 |
| `gradient-understory.svg` | Lower left | 60, 540 | 14.41:1 – 18.29:1 |
| `gradient-bloom.svg` | Right, vertically centred | 840, 360 | 7.65:1 – 11.54:1 |
| `gradient-harvest.svg` | Lower right | 840, 480 | 10.20:1 – 13.75:1 |

1. Each region is the 660×400 box with the smallest contrast swing. Origins are in the artwork's
   1600×1000 coordinates.
2. Full width across the middle, a heading runs 6.65:1 to 16.25:1 on Vesper and 5.87:1 to
   17.33:1 on Understory. Inside the region it swings 2.91 and 3.88.
3. Half the width alone is not enough: Understory's right half still swings 10.41.
4. Read the pair of numbers, not the difference: a swing high up the scale costs less than the
   same swing near 4.5:1.

## Favicon

| Decision | Value | Why |
| --- | --- | --- |
| Crop | The gradient's own `xMidYMid slice` centre square | A tighter crop into Bloom's lightest corner lands in the Lime Green bloom and turns the tile mint. |
| Corner radius | 22% of the tile | `--radius-*` tokens are absolute. 22% matches iOS, Android and macOS app tiles. |
| Mark size | 82% of the tile width | At 74% the hairlines drop out at 16px. |
| Mark stroke | 0.8 units, in the mark's own colour | Thickens the hairlines without redrawing the letterform. |

1. The icon logo in Night Blue on a rounded tile cut from `gradient-bloom.svg`.
2. `assets/favicons/favicon.svg` is the source; every raster in `assets/favicons/` is generated
   from it.
3. The mark measures 9.66:1 against the tile at its thinnest strokes (3:1 required).
4. The tile measures 1.37:1 against light browser chrome and 10.59:1 against dark.
5. The favicon has no grain. Below about 64px the filter renders as coloured blotch.
6. This exception is for the favicon only. Anything that reproduces Bloom or Harvest keeps the
   grain.
7. The 16 and 32 bitmaps in `favicon.ico` use a heavier cut: mark at 86%, stroke 1.5. Browsers
   that support SVG favicons use `favicon.svg` instead.
8. `apple-touch-icon.png` is full-bleed and square, without rounded corners. iOS applies its own
   mask.

## Masters

1. Vector logo masters, the icon set in six colourways, illustration masters and print files are
   in the **Aardling - Brand** shared Google Drive.
2. The package carries the versions for building things.
