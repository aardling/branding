# Typography

Two faces, used in very unequal measure. **General Sans** sets nearly everything — body copy,
most headings, buttons, subtitles, navigation, captions. **Voyage** is the display face, spent
sparingly: typically one short title on a page, at 24px or larger.

| Role | Token | Family |
| --- | --- | --- |
| Display | `--font-display` | Voyage, Georgia, "Times New Roman", serif |
| Body | `--font-body` | "General Sans", "Helvetica Neue", Helvetica, Arial, sans-serif |

## The files

Both faces are in `assets/fonts/` as `woff2`, self-hosted. Import them:

```css
@import "@aardling/aardling/assets/fonts/fonts.css";
```

Never a `<link>` or `@import` to Google Fonts, Fontshare or any other third-party host.
Aardling's typography does not depend on a network it does not control.

General Sans is a **variable font** — one file per style spanning `wght` 200 to 700, so every
weight in the table below is available without loading a file per cut. Voyage has no variable
cut and ships as its single static instance.

## Weights

General Sans covers 200 to 700, upright and italic. Voyage is Regular only.

| Token | Value | Use for |
| --- | --- | --- |
| `--font-weight-extralight` | 200 | Very large display settings only. It disappears at body sizes. |
| `--font-weight-light` | 300 | Large introductory paragraphs, where Regular reads heavy. |
| `--font-weight-regular` | 400 | Body copy, buttons, captions. The default. |
| `--font-weight-medium` | 500 | Headings. Also available as `--font-weight-heading`. |
| `--font-weight-semibold` | 600 | Emphasis inside running text, active states, table headers. |
| `--font-weight-bold` | 700 | Rare. Only where 600 genuinely fails to separate. |

Headings are **500**. The website's stylesheet has asked for 500 since it was built and
silently rendered 400, because only two cuts were loaded; the Medium cut is here now and the
original intent stands. Use `--font-weight-heading` rather than the literal, so the decision
lives in one place.

Italics exist at every weight. Use them for what italics are for — the title of a work, a term
being introduced, a genuine aside. Not for emphasis; that is what 600 is for.

## Scale

Base sizes, at 960px and above:

| Step | Token | Size | Line height |
| --- | --- | --- | --- |
| h1 | `--font-size-h1` | 55px | 1.2 |
| h2 | `--font-size-h2` | 45px | 1.2 |
| h3 | `--font-size-h3` | 35px | 1.2 |
| h4 | `--font-size-h4` | 30px | 1.2 |
| h5 | `--font-size-h5` | 25px | 1.2 |
| h6 | `--font-size-h6` | 22px | 1.3 |
| body | `--font-size-body` | 18px | 1.5 |
| small | `--font-size-small` | 14px | 1.5 |

`tokens.css` redefines these at three breakpoints: every heading step drops to 0.8 below
960px, and the whole scale rises at 1728px and again at 1920px. Body copy stays at 18px until
1728px.

The website's own CSS intends a further step down below 720px and never applies it — the
`max-width: 719.98px` block is emitted before the `max-width: 959.98px` block at equal
specificity, so the later rule wins. That step is not reproduced here; if a smaller phone size
is wanted, it needs adding deliberately.

## Which face, where

Voyage is used sparingly — typically once on a page, on one short title. Normally that is the
h1: the page hero, or the one heading a reader is meant to carry away. A second Voyage setting
on the same page is an exception and needs a reason.

Everything else is General Sans, including headings that look like they want the display face:
h2 and h3, card titles, call-to-action headings, pull quotes, form section labels, table
captions, sidebar headers. A page set almost entirely in General Sans is the normal case, not
a compromise.

Keep the Voyage title short — one line, a handful of words. The face has one weight, no italic
and no variable axis. It holds a phrase; it does not hold a paragraph.

Voyage below about 24px loses its detail and reads as a generic serif, so it never sets
anything small. If a title needs to be smaller than that, it is not the Voyage title on that
page — use General Sans.

**Voyage never sets a heading on artwork.** A heading placed on a gradient is General Sans at
the heading weight, whatever its size. Voyage's hairlines and its thick-to-thin contrast are
exactly what the gradients' grain interferes with. See `imagery.md`.

## Letter-spacing

None, at any size, in either face, with one exception: uppercase labels take `0.12em` to
`0.14em`, because capitals set at their default fit are too tight to read.

## Wrapping

Headings, taglines, pull quotes, buttons and captions take `text-wrap: balance`. Body copy
takes `text-wrap: pretty`. Protected terms never break — see `layout.md`.
