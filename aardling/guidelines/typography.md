# Typography

| Role | Token | Family |
| --- | --- | --- |
| Display | `--font-display` | Voyage, Georgia, "Times New Roman", serif |
| Body | `--font-body` | "General Sans", "Helvetica Neue", Helvetica, Arial, sans-serif |

## Files

1. Both faces are self-hosted `woff2` files in `assets/fonts/`.
2. Import them with `@import "@aardling/brand-aardling/assets/fonts/fonts.css";`.
3. Never load a face from Google Fonts, Fontshare or any other third-party host.
4. General Sans is variable: one file per style, `wght` 200 to 700.
5. Voyage is a single static Regular: no italic, no variable axis.

## Weights

| Token | Value | Use for |
| --- | --- | --- |
| `--font-weight-extralight` | 200 | Very large display settings only. |
| `--font-weight-light` | 300 | Large introductory paragraphs. |
| `--font-weight-regular` | 400 | Body copy, buttons, captions. The default. |
| `--font-weight-medium` | 500 | Headings. Also `--font-weight-heading`. |
| `--font-weight-semibold` | 600 | Emphasis in running text, active states, table headers. |
| `--font-weight-bold` | 700 | Only where 600 fails to separate. |

1. Headings are 500. Use `--font-weight-heading`, not the literal.
2. Italics exist at every weight.
3. Use italics for the title of a work, a term being introduced, or an aside.
4. Never use italics for emphasis. Use 600.

## Scale

| Step | Token | Phone | 540px | 960px | 1728px | 1920px | Line height |
| --- | --- | --- | --- | --- | --- | --- | --- |
| h1 | `--font-size-h1` | 36px | 44px | 55px | 61px | 66px | 1.2 |
| h2 | `--font-size-h2` | 30px | 36px | 45px | 50px | 54px | 1.2 |
| h3 | `--font-size-h3` | 26px | 28px | 35px | 39px | 42px | 1.2 |
| h4 | `--font-size-h4` | 22px | 24px | 30px | 33px | 36px | 1.2 |
| h5 | `--font-size-h5` | 20px | 20px | 25px | 28px | 30px | 1.2 |
| h6 | `--font-size-h6` | 18px | 18px | 22px | 24px | 26px | 1.3 |
| body | `--font-size-body` | 18px | 18px | 18px | 20px | 22px | 1.5 |
| small | `--font-size-small` | 14px | 14px | 14px | 15px | 17px | 1.5 |

1. The phone sizes are the base, declared in `:root`. Larger steps are `min-width` queries.
   See `web.md`.
2. The 540px step changes h1 to h4 only.
3. There is no multiplier. Choose a new size by eye, not by scaling a neighbouring column.

## Which face, where

1. Use Voyage once per page, on one short title — normally the h1.
2. A second Voyage setting on a page needs a reason.
3. Keep the Voyage title to one line of a few words.
4. Never set Voyage below 24px. A smaller title is General Sans.
5. Never set Voyage on a gradient. A heading on a gradient is General Sans at the heading
   weight. See `imagery.md`.
6. Set everything else in General Sans: h2, h3, card titles, call-to-action headings, pull
   quotes, form section labels, table captions, sidebar headers.

## Letter-spacing

1. No letter-spacing, at any size, in either face.
2. Exception: uppercase labels take `0.12em` to `0.14em`.

## Wrapping

1. Headings, taglines, pull quotes, buttons and captions: `text-wrap: balance`.
2. Body copy: `text-wrap: pretty`.
3. Protected terms never break. See `layout.md`.
