# Fonts

Aardling's two faces, self-hosted. Import `fonts.css` alongside the tokens:

```css
@import "@aardling/aardling/assets/fonts/fonts.css";
@import "@aardling/aardling/tokens/tokens.css";
```

Never load either face from Google Fonts, Fontshare, or any other third-party host. The
brand's typography does not depend on a network Aardling does not control.

## What is here

| File | Family | Axis | Style |
| --- | --- | --- | --- |
| `general-sans-variable.woff2` | General Sans | `wght` 200–700 | upright |
| `general-sans-variable-italic.woff2` | General Sans | `wght` 200–700 | italic |
| `voyage-regular.woff2` | Voyage | — | upright, 400 only |

Three files, about 100 KB in total.

General Sans is a **variable font**: one file spans the whole weight range in each style, so
any weight between 200 and 700 is available — including the 500 that headings use — without
loading a separate file per cut. Voyage has no variable cut and ships as a single static
instance, which is the only weight the face offers.
