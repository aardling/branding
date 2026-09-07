# @aardling/brand-aardling

Brand guidelines, design tokens and assets for the **Aardling** brand.

## Install

These packages are published to **GitHub Packages**, not the public npm
registry. That needs two things in the consuming project.

**1. Point the** **`@aardling`** **scope at GitHub and supply a token.** In that project's `.npmrc`:

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

### Getting a token

With the `gh` CLI:

```sh
gh auth refresh -h github.com -s read:packages
export GITHUB_TOKEN=$(gh auth token)
```

By hand: open
[github.com/settings/tokens/new](https://github.com/settings/tokens/new?scopes=read:packages&description=GitHub%20Packages%20read)
— or **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate
new token (classic)** — tick `read:packages`, set an expiry, and generate. Copy the value
straight away; GitHub shows it once.

GitHub Packages accepts classic tokens only; fine-grained tokens do not work on its npm
registry. In GitHub Actions you need no personal token — use the workflow's own
`GITHUB_TOKEN` with `permissions: packages: read`.

Then:

```sh
npm install @aardling/brand-aardling
```

```css
@import "@aardling/brand-aardling/assets/fonts/fonts.css";
@import "@aardling/brand-aardling/tokens/tokens.css";
```

```js
import tokens from "@aardling/brand-aardling/tokens/tokens.json" with { type: "json" };
```

## Layout

| Path                       | Contents                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `tokens/tokens.json`       | Design tokens as data: colour, typography, spacing, radii, breakpoints.                                            |
| `tokens/tokens.css`        | The same tokens as CSS custom properties, with the responsive type scale.                                          |
| `guidelines/colour.md`     | The palette, the accepted foreground/background pairs, and what each is for.                                       |
| `guidelines/typography.md` | The two faces, the scale, weights, and the font licence position.                                                  |
| `guidelines/layout.md`     | Spacing scale in use, radii, and the protected terms.                                                              |
| `guidelines/imagery.md`    | The gradients and illustrations, and what may sit on them.                                                         |
| `guidelines/logos.md`      | Masters and lockups, clear space, which pairs carry a mark, minimum sizes.                                         |
| `guidelines/naming.md`     | How the brand name and the company names are written.                                                              |
| `guidelines/voice.md`      | Register, person, and do/don't examples.                                                                           |
| `assets/logos/`            | The logotype and the icon logo, both SVG, both `currentColor`.                                                     |
| `assets/logos/lockups/`    | 22 flattened mark-on-ground files, generated from the two masters.                                                 |
| `assets/icons/`            | The 18-mark icon set, SVG, `currentColor`.                                                                         |
| `assets/favicons/`         | The icon logo knocked out of a rounded Bloom tile. `favicon.svg` is the source; the rasters are generated from it. |
| `assets/fonts/`            | Variable General Sans and Voyage as `woff2`, plus `fonts.css`.                                                     |
| `assets/images/`           | Four SVG gradients, and three illustrations as WebP with PNG beside.                                               |
| `skills/aardling-brand/`   | Claude Code skill teaching agents to apply this brand.                                                             |
| `aardling-brand-guide-v*.pdf` | The whole brand as a printable A4 document, generated from everything above.                                    |

## The brand guide

`aardling-brand-guide-v0.7.0.pdf` is 25 A4 pages carrying the palette, the type scale, the
marks, the imagery rules, the spacing ladder and the voice — set in the brand, with the fonts
and artwork embedded. The version in the filename is the package version, and it appears on
the cover, in every page footer and on the last page.

It is generated, not maintained by hand:

```sh
npm run build:guide --workspace @aardling/brand-aardling
```

The source is nine chapter fragments in `scripts/guide/`, plus `head.html` for the shared
type and layout. `scripts/build-brand-guide.mjs` fills each with the version from
`package.json`, inlines every asset as a data URI, prints it with headless Chrome, and merges
the chapters into one document. A chapter is only re-rendered when the HTML it would produce
has actually changed — `scripts/guide/manifest.json` records the hash it was last built from,
so editing one chapter costs a couple of seconds rather than rebuilding all 25 pages. The
rendered chapters are cached in `.guide-cache/`, which is not committed.

```sh
node scripts/build-brand-guide.mjs --status   # what is stale, and why. Renders nothing.
node scripts/build-brand-guide.mjs --force    # rebuild every chapter
```

The contents page numbers itself: `{{FOLIO:colour}}` resolves to the page a chapter starts on,
so adding a page cannot leave the contents lying. Chrome's path comes from `CHROME` if set,
and defaults to the macOS location. Unlike `build:lockups`, a rerun is not byte-identical:
Chrome stamps a creation time into the PDF.

`npm publish` refuses to ship a stale guide — `prepublishOnly` runs the same hash check and
fails with the command to run. It never renders on your behalf.

**When a guideline changes, rebuild the guide.** The template quotes the guidelines rather
than importing them, so the two can drift; the files under `guidelines/` are the source of
truth and the PDF is a view of them.

## Marks

`assets/logos/aardling-logotype.svg` is the full logotype, 623×131, transparent, filled with
`currentColor` — set `color` on the parent to recolour it.

`assets/logos/aardling-icon.svg` is the icon logo: the double-A ligature, cut from the
logotype's own outline at 1:1. Use it for small touchpoints — favicon, social thumbnail.

Both are drawn in capitals. That is lettering; the name is written **Aardling**. See
`guidelines/naming.md`.

`assets/logos/lockups/` carries both marks flattened onto each ground they are approved on —
nine flat pairs and four gradients — with the clear space built in. Use a lockup where you
cannot set `color` or supply a ground: an avatar upload, a slide master, a print file. They
are generated from the two masters by `scripts/build-lockups.mjs` and never edited by hand.
See `guidelines/logos.md`.

## Imagery

`assets/images/` carries four SVG gradients — two dark, `gradient-vesper` and
`gradient-understory`, and two light, `gradient-bloom` and `gradient-harvest` — a few
kilobytes each. The light pair carry grain as an SVG filter; the dark pair carry none, because
in a dark field the filter's bright pixels are the worst ones. Either mark may be knocked out
of any of them. Nothing else goes on top: see `guidelines/imagery.md`.

## Using the skill

Copy or symlink the skill into a consuming project:

```sh
ln -s ../../node_modules/@aardling/brand-aardling/skills/aardling-brand .claude/skills/aardling-brand
```

## Rules

This package contains **only** Aardling. It never references or imports another brand.
