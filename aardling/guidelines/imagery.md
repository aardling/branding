# Imagery

Aardling has two kinds of picture, and they follow different rules.

## Gradients

Three, in `assets/images/`. They are **SVG** — a few kilobytes each, sharp at any size, and
they carry their own grain through an SVG filter rather than a baked-in texture.

| File | What it is | Use for |
| --- | --- | --- |
| `gradient-dawn.svg` | Pink through Ocean Blue into deep indigo, lit from the top right. | The warm option. Social cards, event artwork, a title slide. |
| `gradient-meridian.svg` | Night Blue to a lighter indigo, one Ocean Blue highlight and a faint Lime Green. | The quiet one. Behind a slide of content, or a section band that must not compete. |
| `gradient-bloom.svg` | Snow White into Violet, with Lime Green and Pink blooms. | The light option, and the only one that takes Night Blue text-adjacent panels well. |

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

## The one thing that may sit on a gradient

The icon logo, knocked out. White on Dawn or Meridian, Night Blue on Bloom. That is the
social avatar treatment, and it is the brand's own lettering rather than running text.

**Nothing else goes on top.** No headlines over a gradient, no body copy over an
illustration, no captions over either, and no scrim or blur to make it work. The rule is in
`layout.md` and imagery does not get an exception from it. Text goes beside the image, or on
a solid panel next to it.

## Where the masters are

Vector logo masters, the icon set in six colourways, the illustration masters and the print
files are in the **Aardling - Brand** shared Google Drive. This package carries the versions
meant for building things; Drive carries the originals.
