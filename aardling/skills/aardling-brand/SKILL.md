---
name: aardling-brand
description: Apply the Aardling brand — its colours, typography, logo usage, naming, voice and iconography — when designing, writing or building anything that carries the Aardling name. Use whenever the output is Aardling-branded; do not use it for any other brand.
---

# Aardling brand

Everything here applies to **Aardling only**. Never mix in assets, tokens or voice from
another brand.

## The name

The brand name is **Aardling** — capital A, the rest lower case, one word, everywhere a
reader sees it set as text. Never `aardling`, `AARDLING` or `AardLing` in prose.

Two carve-outs: machine identifiers stay lower case (`@aardling/aardling`, `aardling.eu`,
`--colour-*`), and the logotype is drawn in capitals, which is lettering rather than a
spelling.

Company names — Aardling BV, Aardling Belgium BV, Aardling Netherlands BV, Aardling France
SAS — appear only where the law needs them: an imprint, a contract, an invoice, a privacy
policy. Never in a headline, a deck or body copy. Full rule: `../../guidelines/naming.md`.

## Tokens

Read `../../tokens/tokens.json`, or import `../../tokens/tokens.css` for CSS custom
properties. Reference tokens; never hard-code a literal colour or size.

## Colour

Colours are approved **in pairs**. A pair that is not listed in
`../../guidelines/colour.md` is not an approved combination of this brand — read that file
before choosing any foreground and background.

The default is `--colour-night-blue` on `--colour-snow-white`. The primary button is
`--colour-night-blue` on `--colour-lime-green`. `--colour-ocean-blue` is a details colour: it
fails contrast as body text and is never a background.

## Typography

`--font-display` (Voyage) for titles and big text; `--font-body` (General Sans) for
everything else. General Sans is a variable font covering 200–700 in upright and italic; Voyage is Regular only.

Headings take `--font-weight-heading` (500). Body copy is 400, emphasis is 600.

Both faces ship in `../../assets/fonts/` as `woff2` — import `fonts.css` from there. Never
load either from Google Fonts, Fontshare or any other third-party host.

## Layout

Spacing is the `--space-*` ladder in 8px steps, and `../../guidelines/layout.md` says which
step is for what. Three radii only: `--radius-sm`, `--radius-md`, `--radius-pill`. Prefer the
larger spacing step when two look plausible.

**Never set text on top of an image** — not with a scrim, not with a blur. Text beside the
image, or on a solid panel next to it.

**Protected terms never break across a line:** Domain-Driven Design, EventStorming, Event
Sourcing, Team Topologies, Data Mesh, Aardling. Wrap each in one `white-space: nowrap` span.

## Marks

- `../../assets/logos/aardling-logotype.svg` — the full logotype. Big touchpoints, social
  posts. Not where it would be illegible, and not as a social thumbnail.
- `../../assets/logos/aardling-icon.svg` — the icon logo. Small touchpoints: favicon, social
  thumbnail, avatar.

Both are transparent and filled with `currentColor`; set `color` on the parent to recolour.
They sit on Snow White, white or Night Blue, and nothing else. Clear space on all four sides
is the height of the icon logo. Minimum size: logotype 96px wide, icon logo 16px.

## Icons

`../../assets/icons/` holds 18 marks — sparkles, stars, spheres, orbits, ovals — all
`currentColor`, all from the brand's own set. Use them; do not substitute an off-the-shelf
icon library, and never use emoji as icons.

## Imagery

Three SVG gradients in `../../assets/images/` — `gradient-dawn` (warm), `gradient-meridian`
(quiet, for use behind content), `gradient-bloom` (light). Three painterly illustrations as
WebP with a PNG beside each.

The gradients are artwork, not colour: never sample a pixel from one into the palette. The
icon logo knocked out of a gradient is the social avatar, and it is the only thing that goes
on top of one. Full rules: `../../guidelines/imagery.md`.

## Voice

First person plural. Expert, plain, unhurried. British spelling: modelling, organisation,
analyse. No hype, no unbacked claims, no filler. The reader is a busy technical leader whose
CFO may read it next. Do/don't examples: `../../guidelines/voice.md`.

## Changing this brand

Use the repository's `brand-change` skill. One brand per change, and always visualise and get
confirmation before writing.
