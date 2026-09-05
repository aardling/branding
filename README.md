# branding

Brand guidelines, design tokens and assets for **aardling**, **dddeu**, **dml**,
**ncrafts** and **dddacademy**.

Every brand is a self-contained, independently publishable npm package. Brands are
**strictly separated**: nothing is shared between them, so a project can depend on exactly
one brand and get exactly one brand.

## Repository layout

```
branding/
├── package.json              private workspace root
├── CLAUDE.md                 rules for agents working in this repo
├── .claude/skills/
│   └── brand-change/         workflow skill: how to change a brand
├── aardling/
├── dddeu/
├── dml/
├── ncrafts/
└── dddacademy/
```

Each brand directory:

```
<brand>/
├── package.json              @aardling/<brand>
├── README.md
├── tokens/
│   ├── tokens.json           design tokens as data
│   └── tokens.css            the same tokens as CSS custom properties
├── assets/
│   ├── logos/
│   ├── icons/
│   ├── images/
│   ├── fonts/
│   │   └── fonts.css         @font-face declarations, local files only
│   └── favicons/
├── guidelines/               voice, usage rules, do/don't
│   ├── colour.md             accepted foreground/background pairs + when to use each
│   └── layout.md             spacing scale in use, protected terms
└── skills/<brand>-brand/     Claude Code skill for applying this brand
```

## Using a brand in another project

```sh
npm install @aardling/dddeu
```

```css
@import "@aardling/dddeu/tokens/tokens.css";
@import "@aardling/dddeu/assets/fonts/fonts.css";
```

```js
import tokens from "@aardling/dddeu/tokens/tokens.json" with { type: "json" };
```

Assets are plain files under `@aardling/dddeu/assets/…`.

To give agents in the consuming project the brand skill, symlink or copy it into that
project's skills directory:

```sh
ln -s ../../node_modules/@aardling/dddeu/skills/dddeu-brand .claude/skills/dddeu-brand
```

## Working in this repository

```sh
npm install    # links all five workspaces
```

Before adding or changing anything in a brand, read `CLAUDE.md` and use the
`brand-change` skill: **one brand per change, and always visualise and get confirmation
before writing.**

## Adding a brand

1. Copy the directory template above.
2. Add the directory name to `workspaces` in the root `package.json`.
3. Create `skills/<brand>-brand/SKILL.md`.
