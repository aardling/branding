# @aardling/brand-ncrafts

Brand guidelines, design tokens and assets for the **ncrafts** brand.

> Status: scaffold. No brand content yet.

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
npm install @aardling/brand-ncrafts
```

## Layout

| Path | Contents |
| --- | --- |
| `tokens/tokens.json` | Design tokens as data (colours, type, spacing). |
| `tokens/tokens.css` | The same tokens as CSS custom properties. |
| `assets/logos/` | Logo files (SVG preferred). |
| `assets/icons/` | Icon set. |
| `assets/images/` | Photography, illustrations, patterns. |
| `assets/fonts/` | Webfonts, if licensing allows redistribution. |
| `guidelines/` | Written guidelines: voice, usage rules, do/don't. |
| `skills/ncrafts-brand/` | Claude Code skill teaching agents to apply this brand. |

## Using the skill

Copy or symlink the skill into a consuming project:

```sh
ln -s ../../node_modules/@aardling/brand-ncrafts/skills/ncrafts-brand .claude/skills/ncrafts-brand
```

## Rules

This package contains **only** ncrafts. It never references or imports another brand.
