# branding

Brand guidelines, design tokens and assets for five brands: **aardling, dddeu, dml,
ncrafts, dddacademy**. Each brand is an independently publishable npm package under the
`@aardling/` scope, consumed via npm workspaces from the repository root.

## Standing rules

**1. Brands are strictly separated.** A change touches exactly one brand directory. No file
in a brand may reference, import from, or copy out of another brand. There is deliberately
no shared/common package — duplication between brands is correct, coupling is not.

**2. Visualise and confirm before any brand addition or change.** Never write into a brand
directory before the user has seen the change rendered (an Artifact for anything visual, a
tree diff for structure) and explicitly approved it. Propose in one turn, write in the next.

Both rules are operationalised in the `brand-change` skill — invoke it before touching
anything under a brand directory.

## Brand directory layout

```
<brand>/
  package.json              @aardling/<brand>
  README.md
  tokens/tokens.json        tokens as data
  tokens/tokens.css         the same tokens as CSS custom properties
  assets/{logos,icons,images,fonts,favicons}/
    fonts/fonts.css         @font-face declarations, local files only
  guidelines/               written guidance: voice, usage, do/don't
    colour.md               accepted foreground/background pairs + when to use each
    layout.md               spacing scale in use, protected terms
  skills/<brand>-brand/     skill teaching agents to apply this brand
```

`tokens.json` and `tokens.css` are two views of one truth — change them together.

## Colour palettes

Every brand's palette obeys these rules.

**Text, not pictures.** A palette is defined in text — token names and values in
`tokens/tokens.json` and `tokens/tokens.css`. A swatch image, screenshot or design-tool
export is never the source of truth; it may only illustrate one.

**An allowlist of combinations.** Each brand lists its accepted (foreground, background)
pairs explicitly, in `guidelines/colour.md`, by token name. The list is exhaustive: a pair
that is not on it is not an approved combination of that brand. Colours are approved in
pairs, never individually.

**Guidance per combination.** For each accepted pair, `guidelines/colour.md` says what it
is for — body text, headings, primary buttons, page background, callouts, disabled states,
and so on. A pair with no stated purpose does not belong in the list.

## Graphics

**SVG by default.** Logos, icons, diagrams, marks, anything *drawn* is delivered as SVG.
Raster is for what SVG cannot express: photographs, and illustrations whose detail is
painterly or photographic.

**Convert bitmaps when feasible.** A bitmap that is simple enough — flat shapes, few
colours, hard edges — is traced to SVG, and the SVG becomes the source of truth. When it is
not simple enough, keep the bitmap; a faithful raster beats an autotraced mess.

**Transparent backgrounds where relevant.** Any mark that sits on a coloured ground — logo,
icon, favicon source — ships with a transparent background, never a baked-in white or brand
colour. Photographs are the obvious exception.

**Favicons in standard sizes.** A favicon change ships the whole set, in
`assets/favicons/`:

| File | Size |
| --- | --- |
| `favicon.svg` | vector source |
| `favicon.ico` | 16×16 and 32×32 embedded |
| `apple-touch-icon.png` | 180×180 |
| `icon-192.png` | 192×192 |
| `icon-512.png` | 512×512 |

The raster files are the deliberate exception to the SVG rule — browsers and platforms
still require them. They are generated from `favicon.svg`, which stays the source.

## Typography

**Variable by preference.** When a face offers a variable cut, use it — one file spanning
the weight and width range beats a pile of static instances. Fall back to static files only
for faces that have no variable cut. Delivery format is `woff2`.

**Self-hosted.** Font files live in the brand's `assets/fonts/`. Never a `<link>` or
`@import` to Google Fonts, Adobe Fonts or any other third-party font host — no brand's
typography depends on a network it does not control.

`assets/fonts/fonts.css` holds the `@font-face` declarations, pointing at the neighbouring
files with relative URLs so they resolve from `node_modules`. `tokens.json` and
`tokens.css` name the families and their fallback stacks; `@font-face` is not a token and
does not belong there.

A font is only added if its licence permits redistribution inside a published npm package —
these brands ship as packages, so every install redistributes the files. The licence text
ships beside the font files.

## Layout

**Spacing is specified, never implied.** Each brand carries a spacing scale as `--space-*`
tokens in `tokens.json` and `tokens.css`, and `guidelines/layout.md` says which step is used
for what — page margins, section rhythm, component padding, gaps between related and
unrelated things. "Some padding" is not an instruction; a named step is.

**Generous by default.** More padding and larger margins almost always look better than
less. When in doubt between two steps of the scale, take the larger one. Cramped is the
common failure; airy is rarely the complaint.

**Never text on top of images.** Not over photographs, not over illustrations, not with a
scrim or blur to rescue legibility. If asked for it, say why not and offer the alternative:
text beside the image, text on a solid panel adjacent to it, or the image reduced to an
accent. Push back before building it.

If the user insists anyway: tell them plainly that it will probably look bad and messy and
will not be very readable, ask once more whether they really want it — and if the answer is
still yes, build it, in a visibly disgruntled tone. The decision is theirs; the enthusiasm
is not required.

**Balanced wrapping.** Any short text that wraps — headings, taglines, pull quotes, buttons,
captions — is balanced across its lines rather than leaving a single orphaned word. In CSS
that is `text-wrap: balance`; the rule is the result, not the property.

**Protected terms are never split.** A protected term sits entirely on one line — every
break opportunity inside it is suppressed, at spaces and at hyphens alike. "Domain-Driven
Design" is one concept and has to look like one: not "Domain-" then "Driven Design", not
"Domain-Driven" then "Design". A term broken across lines reads as two things and looks
ugly. Each brand lists its own protected terms in `guidelines/layout.md`.

If the term does not fit the line, the line is wrong, not the term: reflow the text, widen
the column, or set the type smaller. Never break the term to make it fit.

Both break opportunities need suppressing, and a non-breaking space alone does not handle
the hyphen. In markup, wrap the whole term in a span with `white-space: nowrap` — one span
around all of it, which covers spaces and hyphens at once. In plain text, where there is no
markup, use U+00A0 non-breaking space between the words *and* U+2011 non-breaking hyphen;
prefer the span wherever markup exists, since U+2011 is missing from many fonts and falls
back to a different face mid-word.

## Adding a brand

Create the directory from the template above, add it to the root `package.json`
`workspaces` array, and give it its own `skills/<brand>-brand/SKILL.md`.
