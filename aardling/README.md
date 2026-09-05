# @aardling/aardling

Brand guidelines, design tokens and assets for the **Aardling** brand.

## Install

```sh
npm install @aardling/aardling
```

```css
@import "@aardling/aardling/assets/fonts/fonts.css";
@import "@aardling/aardling/tokens/tokens.css";
```

```js
import tokens from "@aardling/aardling/tokens/tokens.json" with { type: "json" };
```

## Layout

| Path | Contents |
| --- | --- |
| `tokens/tokens.json` | Design tokens as data: colour, typography, spacing, radii, breakpoints. |
| `tokens/tokens.css` | The same tokens as CSS custom properties, with the responsive type scale. |
| `guidelines/colour.md` | The palette, the accepted foreground/background pairs, and what each is for. |
| `guidelines/typography.md` | The two faces, the scale, weights, and the font licence position. |
| `guidelines/layout.md` | Spacing scale in use, radii, and the protected terms. |
| `guidelines/imagery.md` | The gradients and illustrations, and what may sit on them. |
| `guidelines/naming.md` | How the brand name and the company names are written. |
| `guidelines/voice.md` | Register, person, and do/don't examples. |
| `assets/logos/` | The logotype and the icon logo, both SVG, both `currentColor`. |
| `assets/icons/` | The 18-mark icon set, SVG, `currentColor`. |
| `assets/favicons/` | `favicon.svg` and the raster set generated from it. |
| `assets/fonts/` | Variable General Sans and Voyage as `woff2`, plus `fonts.css`. |
| `assets/images/` | Three SVG gradients, and three illustrations as WebP with PNG beside. |
| `skills/aardling-brand/` | Claude Code skill teaching agents to apply this brand. |

## Marks

`assets/logos/aardling-logotype.svg` is the full logotype, 195×40, transparent, filled with
`currentColor` — set `color` on the parent to recolour it.

`assets/logos/aardling-icon.svg` is the icon logo: the double-A ligature, cut from the
logotype's own outline. Use it for small touchpoints — favicon, social thumbnail.

Both are drawn in capitals. That is lettering; the name is written **Aardling**. See
`guidelines/naming.md`.

## Imagery

`assets/images/` carries three SVG gradients — `gradient-dawn`, `gradient-meridian`,
`gradient-bloom` — a few kilobytes each, with their grain drawn as an SVG filter. The icon
logo may be knocked out of one for a social avatar. Nothing else goes on top of them: see
`guidelines/imagery.md`.

## Using the skill

Copy or symlink the skill into a consuming project:

```sh
ln -s ../../node_modules/@aardling/aardling/skills/aardling-brand .claude/skills/aardling-brand
```

## Rules

This package contains **only** Aardling. It never references or imports another brand.
