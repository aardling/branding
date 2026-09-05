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

## Layout

```
<brand>/
  package.json              @aardling/<brand>
  README.md
  tokens/tokens.json        tokens as data
  tokens/tokens.css         the same tokens as CSS custom properties
  assets/{logos,icons,images,fonts}/
  guidelines/               written guidance: voice, usage, do/don't
  skills/<brand>-brand/     skill teaching agents to apply this brand
```

`tokens.json` and `tokens.css` are two views of one truth — change them together.

## Adding a brand

Create the directory from the template above, add it to the root `package.json`
`workspaces` array, and give it its own `skills/<brand>-brand/SKILL.md`.
