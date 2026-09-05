# @aardling/aardling

Brand guidelines, design tokens and assets for the **Aardling** brand.

## Install

These packages are published to **GitHub Packages**, not the public npm
registry. That needs two things in the consuming project.

**1. Point the `@aardling` scope at GitHub and supply a token.** In that project's `.npmrc`:

```
@aardling:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**2. Put a token in the environment.** A classic personal access token with the
`read:packages` scope is enough:

```sh
export GITHUB_TOKEN=ghp_...
```

GitHub Packages requires authentication for every install, including public packages — there
is no anonymous read. Commit the `.npmrc` (it names the registry, not the secret) and keep
the token in the environment or in CI secrets, never in the file.

Then:

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
| `guidelines/logos.md` | Masters and lockups, clear space, which pairs carry a mark, minimum sizes. |
| `guidelines/naming.md` | How the brand name and the company names are written. |
| `guidelines/voice.md` | Register, person, and do/don't examples. |
| `assets/logos/` | The logotype and the icon logo, both SVG, both `currentColor`. |
| `assets/logos/lockups/` | 22 flattened mark-on-ground files, generated from the two masters. |
| `assets/icons/` | The 18-mark icon set, SVG, `currentColor`. |
| `assets/favicons/` | The icon logo knocked out of a rounded Bloom tile. `favicon.svg` is the source; the rasters are generated from it. |
| `assets/fonts/` | Variable General Sans and Voyage as `woff2`, plus `fonts.css`. |
| `assets/images/` | Three SVG gradients, and three illustrations as WebP with PNG beside. |
| `skills/aardling-brand/` | Claude Code skill teaching agents to apply this brand. |

## Marks

`assets/logos/aardling-logotype.svg` is the full logotype, 623×131, transparent, filled with
`currentColor` — set `color` on the parent to recolour it.

`assets/logos/aardling-icon.svg` is the icon logo: the double-A ligature, cut from the
logotype's own outline at 1:1. Use it for small touchpoints — favicon, social thumbnail.

Both are drawn in capitals. That is lettering; the name is written **Aardling**. See
`guidelines/naming.md`.

`assets/logos/lockups/` carries both marks flattened onto each ground they are approved on —
nine flat pairs and three gradients — with the clear space built in. Use a lockup where you
cannot set `color` or supply a ground: an avatar upload, a slide master, a print file. They
are generated from the two masters by `scripts/build-lockups.mjs` and never edited by hand.
See `guidelines/logos.md`.

## Imagery

`assets/images/` carries three SVG gradients — `gradient-meridian`, `gradient-bloom` and
`gradient-harvest` — a few kilobytes each, with their grain drawn as an SVG filter. Either
mark may be knocked out of one. Nothing else goes on top of them: see `guidelines/imagery.md`.

## Using the skill

Copy or symlink the skill into a consuming project:

```sh
ln -s ../../node_modules/@aardling/aardling/skills/aardling-brand .claude/skills/aardling-brand
```

## Rules

This package contains **only** Aardling. It never references or imports another brand.
