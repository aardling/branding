# @aardling/dml

Brand guidelines, design tokens and assets for the **dml** brand.

> Status: scaffold. No brand content yet.

## Install

```sh
npm install @aardling/dml
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
| `skills/dml-brand/` | Claude Code skill teaching agents to apply this brand. |

## Using the skill

Copy or symlink the skill into a consuming project:

```sh
ln -s ../../node_modules/@aardling/dml/skills/dml-brand .claude/skills/dml-brand
```

## Rules

This package contains **only** dml. It never references or imports another brand.
