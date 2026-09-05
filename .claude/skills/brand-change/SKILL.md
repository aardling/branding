---
name: brand-change
description: Add or change anything inside a brand in this repository — colours, typography, logos, icons, images, tokens, guidelines or brand skills. Enforces one-brand isolation and the visualise-then-confirm rule. Use before writing any file under aardling/, dddeu/, dml/, ncrafts/ or dddacademy/.
---

# Making a brand change

Two rules govern every change in this repository. They are not optional.

1. **One brand at a time.** A change touches exactly one brand directory. Never read from,
   copy from, or reference a second brand in the same change.
2. **Visualise, then confirm.** Never write a brand addition or change before the user has
   seen it rendered and said yes.

## Procedure

### 1. Identify the brand

Determine which of `aardling`, `dddeu`, `dml`, `ncrafts`, `dddacademy` the change belongs to.
If the request is ambiguous, ask — do not guess. If it genuinely spans two brands, split it
into two separate changes, each with its own visualisation and its own confirmation.

### 2. Build the visualisation

Produce something the user can *look at*, matched to what is changing:

| Change | Visualisation |
| --- | --- |
| Colours | Swatches with hex/token names, plus applied examples (button, heading, background pairs) and contrast ratios. |
| Typography | The actual faces at real sizes — a type scale, headings, body copy, a paragraph in situ. |
| Logo or icons | The mark at several sizes, on light and dark grounds, with clear-space shown. |
| Images | The images themselves, at usable size. |
| Guidelines / voice | The prose rendered, with before/after examples where it changes existing wording. |
| Structure only | A file tree diff — no artifact needed. |

For anything visual, publish an HTML **Artifact** (load the `artifact-design` skill first),
or use the `design` skill when a design canvas fits better. Show current-vs-proposed
side by side when replacing something that already exists.

### 3. Ask, and stop

Present the visualisation, state plainly what files would be written, and ask for
confirmation. **Stop there.** Do not write brand files in the same turn as the proposal.

### 4. Write — only after a yes

Write only inside that one brand's directory. Keep the pair in sync:
`tokens/tokens.json` (data) and `tokens/tokens.css` (custom properties). Update the brand's
`skills/<brand>-brand/SKILL.md` so agents consuming the package learn the new rule, and the
brand's `README.md` if the layout changed.

Bump the brand package's `version` when its published content changes. Do not commit unless
the user asks.

## What never happens

- No `shared/`, `common/` or `core/` package. Brands stay strictly separated, even when
  they duplicate a value.
- No brand file references another brand's path.
- No brand content written without a confirmed visualisation.
