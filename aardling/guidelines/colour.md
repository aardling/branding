# Colour

Aardling's palette is seven brand colours and four functional ones. The brand colours come
from Hartstikke's original brand guide; the functional colours were in the website's CSS
without ever having been approved, and are kept here because each does a job the brand
colours cannot.

Colours are approved **in pairs**. A pair that is not in the table below is not an approved
combination of this brand. Ratios are WCAG 2.x contrast, computed from the two values.

## Brand colours

| Token | Hex | Guide name |
| --- | --- | --- |
| `--colour-night-blue` | `#181C2F` | Night Blue |
| `--colour-snow-white` | `#F6F6F6` | Snow White |
| `--colour-white` | `#FFFFFF` | — |
| `--colour-violet` | `#B9BBF4` | Violet |
| `--colour-lime-green` | `#C5EEB3` | Lime Green |
| `--colour-ocean-blue` | `#4B7BC3` | Ocean Blue |
| `--colour-yellow` | `#F8E181` | Yellow |
| `--colour-pink` | `#F3B0B0` | Pink |

`--colour-white` is not in the brand guide. It is listed because cards and panels sit on it,
and a ground that carries text has to be an approved half of a pair.

## Functional colours

| Token | Hex | What it is for |
| --- | --- | --- |
| `--colour-hover-green` | `#98DE7E` | The hover and focus state of the primary button. |
| `--colour-muted-grey` | `#6B6B6B` | Secondary text: dates, captions, metadata. |
| `--colour-hairline-grey` | `#D7D7D7` | Hairline rules and the border of an unchecked control. |
| `--colour-error-red` | `#CF1322` | Form error messages. |

`--colour-muted-grey` is set where it clears 4.5:1 on both white and Snow White. A lighter
grey does not, however good it looks.

## Accepted combinations

| Foreground | Background | Ratio | Use for |
| --- | --- | --- | --- |
| `--colour-night-blue` | `--colour-snow-white` | 15.60 | The default. Page ground and all long-form reading. |
| `--colour-night-blue` | `--colour-white` | 16.85 | Cards and panels lifted off the page ground. |
| `--colour-snow-white` | `--colour-night-blue` | 15.60 | Inverted sections, the footer, dark buttons. |
| `--colour-night-blue` | `--colour-lime-green` | 13.05 | The primary button. |
| `--colour-night-blue` | `--colour-hover-green` | 10.50 | The primary button, hover and focus. |
| `--colour-night-blue` | `--colour-yellow` | 12.90 | Section grounds and cards. |
| `--colour-night-blue` | `--colour-pink` | 9.35 | Section grounds and cards. |
| `--colour-night-blue` | `--colour-violet` | 9.21 | Section grounds and callouts. |
| `--colour-muted-grey` | `--colour-white` | 5.33 | Secondary text on a card. |
| `--colour-muted-grey` | `--colour-snow-white` | 4.93 | Secondary text on the page ground. |
| `--colour-error-red` | `--colour-white` | 5.57 | Form error messages on a card. |
| `--colour-error-red` | `--colour-snow-white` | 5.16 | Form error messages on the page ground. |
| `--colour-ocean-blue` | `--colour-white` | 4.27 | Large display text at 24px and above, icons, rules. Never body text. |
| `--colour-ocean-blue` | `--colour-snow-white` | 3.95 | The same, on the page ground. |
| `--colour-hairline-grey` | `--colour-white` | 1.44 | Hairline rules only. Never text, and never the only cue for a boundary that matters. |
| `--colour-hairline-grey` | `--colour-snow-white` | 1.33 | The same, on the page ground. |

## What is not approved

**`--colour-ocean-blue` as body text.** It measures 4.27:1 on white and 3.95:1 on Snow White.
It is a details colour: large display text, icons and rules. The website uses it as the link
hover colour at 18px, which fails; links hover to `--colour-night-blue` instead.

**`--colour-ocean-blue` as a background.** Night Blue on it is 3.95:1 and Snow White on it is
3.95:1 — there is no readable text colour for that ground, so it is never a ground.

**The four pastels as text.** Violet, Lime Green, Yellow and Pink are grounds and details.
Night Blue is the only foreground approved on any of them.

**Any pair not in the table.** Including pastel on pastel, and any of the greys on a pastel.

## Which pairs carry a mark

Nine of the pairs above are also approved for the logotype and the icon logo. The rest are
not: a pair approved for secondary text, form errors or hairline rules is approved for that,
and a mark is none of those things. `logos.md` lists the nine and says which mark each takes —
`--colour-ocean-blue` is the logotype only, and not below 141px.

## Notes on the source

The brand guide holds two colour tables that overlap and disagree with each other. Ocean Blue
is tagged *Details* in one and *Backgrounds, Details* in the other; this file resolves that as
details only, on the contrast evidence. The guide also instructs "Dark Mode: use Grey for
titles & body text" while defining no colour called Grey — that instruction is not carried
over.

The guide states CMYK values alongside each colour. They do not match a standard conversion
from the same hex and name no profile, so they are not reproduced here. Get CMYK from your
printer against a named profile, not from the guide.
