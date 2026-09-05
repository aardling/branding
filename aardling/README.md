# @aardling/aardling

Brand guidelines, design tokens and assets for the **aardling** brand.

> Status: scaffold. No brand content yet.

## Install

```sh
npm install @aardling/aardling
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
| `skills/aardling-brand/` | Claude Code skill teaching agents to apply this brand. |

## Using the skill

Copy or symlink the skill into a consuming project:

```sh
ln -s ../../node_modules/@aardling/aardling/skills/aardling-brand .claude/skills/aardling-brand
```

## Rules

This package contains **only** aardling. It never references or imports another brand.
