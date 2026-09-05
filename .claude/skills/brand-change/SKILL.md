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
| Favicons | The whole set rendered at real size — 16, 32, 180 — on light and dark grounds. |
| Images | The images themselves, at usable size. |
| Layout / spacing | A real component or page section at real size with margins and padding visible, plus a heading rendered at two narrow widths showing balanced wrapping and protected terms staying whole. |
| Guidelines / voice | The prose rendered, with before/after examples where it changes existing wording. |
| Structure only | A file tree diff — no artifact needed. |

For anything visual, publish an HTML **Artifact** (load the `artifact-design` skill first),
or use the `design` skill when a design canvas fits better. Show current-vs-proposed
side by side when replacing something that already exists.

### 3. Ask, and stop

Present the visualisation, state plainly what files would be written, and ask for
confirmation. **Stop there.** Do not write brand files in the same turn as the proposal.

If the request puts text on top of an image, say why not and propose the alternative — text
beside the image, text on a solid panel, or the image as an accent — before visualising
anything. If the user insists, say plainly that it will probably look bad and messy and will
not be very readable, ask once more whether they really want it, and if they still do, build
it — in a visibly disgruntled tone. Their call, not your enthusiasm.

### 4. Write — only after a yes

Write only inside that one brand's directory. Keep the pair in sync:
`tokens/tokens.json` (data) and `tokens/tokens.css` (custom properties). Update the brand's
`skills/<brand>-brand/SKILL.md` so agents consuming the package learn the new rule, and the
brand's `README.md` if the layout changed.

A **colour** change is only finished when all three exist:

1. The values as text tokens in `tokens/tokens.json` and `tokens/tokens.css`. Never an
   image or design-tool export as the source of truth.
2. The accepted (foreground, background) combinations, listed exhaustively by token name
   in `guidelines/colour.md`. Colours are approved in pairs; a pair that is not listed is
   not approved.
3. For every listed pair, what it is for — body text, headings, primary buttons, page
   background, callouts, disabled states. A pair with no stated purpose is removed from
   the list, not left undocumented.

`guidelines/colour.md` is a table plus prose:

```markdown
| Foreground | Background | Use for |
| --- | --- | --- |
| `--colour-ink` | `--colour-paper` | Body text and all long-form reading. |
```

A **graphics** change is only finished when:

1. Anything drawn — logo, icon, mark, diagram — is SVG. Raster only for photographs and
   painterly illustration. A simple enough bitmap is traced to SVG first, and the SVG
   becomes the source; a bitmap too detailed to trace cleanly stays a bitmap.
2. Marks that sit on a coloured ground have transparent backgrounds — no baked-in white.
3. A favicon change ships the full set in `assets/favicons/` — `favicon.svg`,
   `favicon.ico` (16 + 32), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` —
   all generated from `favicon.svg`, never a single size.

A **typography** change is only finished when:

1. The `woff2` files are in `assets/fonts/` — the variable cut where the face offers one,
   static instances only where it does not.
2. `assets/fonts/fonts.css` declares them with `@font-face` and relative local URLs. No
   `<link>` or `@import` to a third-party font host, anywhere.
3. `tokens.json` and `tokens.css` name the families and their fallback stacks.

A **layout** change is only finished when:

1. The spacing scale exists as `--space-*` tokens in `tokens.json` and `tokens.css`.
2. `guidelines/layout.md` says which step is used for what — page margins, section rhythm,
   component padding, gaps. Never "some padding".
3. `guidelines/layout.md` lists the brand's protected terms, with the mechanism for keeping
   each one whole on a single line — one `white-space: nowrap` span around the entire term
   in markup, covering its spaces and hyphens alike; U+00A0 and U+2011 in plain text.

A **voice** change is only finished when `guidelines/voice.md` exists, sits inside the
repository's general voice rules rather than against them, and carries the brand's own
do/don't examples in its own register.

Bump the brand package's `version` when its published content changes. Do not commit unless
the user asks.

## What never happens

- No `shared/`, `common/` or `core/` package. Brands stay strictly separated, even when
  they duplicate a value.
- No brand file references another brand's path.
- No brand content written without a confirmed visualisation.
- No palette committed without its combinations list and its per-pair usage guidance.
- No bitmap where an SVG is possible, and no baked-in background on a mark.
- No favicon shipped as a single size.
- No font loaded from a third-party host, and no static family where a variable cut exists.
- No text set on top of an image — scrims and blurs do not make it acceptable. The one
  way past this is the user insisting twice, after being told both times.
- No spacing left unspecified, and no protected term broken across lines — not at a
  space, not at a hyphen. If it does not fit, the line changes, not the term.
- No brand voice that contradicts the general voice rules, and no copy shipped with
  filler, hype or unbacked claims.
