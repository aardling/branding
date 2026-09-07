# Colour

Aardling's palette is seven brand colours and four functional ones, plus four more functional
colours that exist only on the dark ground. The brand colours come from Hartstikke's original
brand guide; the functional colours were in the website's CSS without ever having been
approved, and are kept here because each does a job the brand colours cannot.

Colours are approved **in pairs**. A pair that is not in the tables below is not an approved
combination of this brand. Ratios are WCAG 2.x contrast, computed from the two values.

## Two tiers

The palette names colours. A second, smaller set names **jobs** and points at the palette:
`--surface-page`, `--text-primary`, `--border-control` and five more. Components reference the
job, never the colour, and a theme re-points the jobs without the palette moving at all.

`--colour-snow-white` is always Snow White, in every theme. `--text-primary` is Night Blue on
a light ground and Snow White on a dark one. In a stylesheet, write `var(--text-primary)`.

| Role | Light | Dark |
| --- | --- | --- |
| `--surface-page` | `--colour-snow-white` | `--colour-night-blue` |
| `--surface-raised` | `--colour-white` | `--colour-dark-surface` |
| `--text-primary` | `--colour-night-blue` | `--colour-snow-white` |
| `--text-secondary` | `--colour-muted-grey` | `--colour-dark-muted-grey` |
| `--text-error` | `--colour-error-red` | `--colour-dark-error-red` |
| `--border-control` | `--colour-muted-grey` | `--colour-dark-muted-grey` |
| `--border-hairline` | `--colour-hairline-grey` | `--colour-dark-hairline-grey` |
| `--focus-ring` | `--colour-night-blue` | `--colour-snow-white` |

Eight roles, and no more without a reason. A ninth role is a request to add a colour, and goes
through the same approval as one.

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
| `--colour-muted-grey` | `#6B6B6B` | Secondary text — dates, captions, metadata — and the boundary of a form control. |
| `--colour-hairline-grey` | `#D7D7D7` | Hairline rules. Never a control boundary; it does not measure. |
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
| `--colour-muted-grey` | `--colour-white` | 5.33 | Secondary text on a card, and the border of a control on one. |
| `--colour-muted-grey` | `--colour-snow-white` | 4.93 | The same, on the page ground. |
| `--colour-error-red` | `--colour-white` | 5.57 | Form error messages on a card. |
| `--colour-error-red` | `--colour-snow-white` | 5.16 | Form error messages on the page ground. |
| `--colour-ocean-blue` | `--colour-white` | 4.27 | Large display text at 24px and above, icons, rules. Never body text. |
| `--colour-ocean-blue` | `--colour-snow-white` | 3.95 | The same, on the page ground. |
| `--colour-hairline-grey` | `--colour-white` | 1.44 | Hairline rules only. Never text, and never the only cue for a boundary that matters. |
| `--colour-hairline-grey` | `--colour-snow-white` | 1.33 | The same, on the page ground. |

## The focus ring

**Every focusable thing has a visible ring, and it is the same ring everywhere.** Three pixels
solid in `--focus-ring`, offset two pixels, on `:focus-visible` — so it appears for a keyboard
and not under a mouse click. Never `outline: none` without a replacement in the same rule.

`--focus-ring` is Night Blue on every light ground and Snow White on every dark one. Night
Blue is the only palette colour that clears 3:1 against all eight approved grounds; Ocean Blue
was the brand-flavoured candidate and fails on Violet at 2.33, Pink at 2.37 and Hover Green at
2.66. These are WCAG 1.4.11 non-text ratios — the ring is a boundary, not a letterform.

| Ring | Ground | Ratio |
| --- | --- | --- |
| `--colour-night-blue` | `--colour-snow-white` | 15.60 |
| `--colour-night-blue` | `--colour-white` | 16.85 |
| `--colour-night-blue` | `--colour-lime-green` | 13.05 |
| `--colour-night-blue` | `--colour-hover-green` | 10.50 |
| `--colour-night-blue` | `--colour-yellow` | 12.90 |
| `--colour-night-blue` | `--colour-pink` | 9.35 |
| `--colour-night-blue` | `--colour-violet` | 9.21 |
| `--colour-snow-white` | `--colour-night-blue` | 15.60 |
| `--colour-snow-white` | `--colour-dark-surface` | 13.21 |

The two-pixel offset matters on the primary button: the ring sits outside the pill rather than
on it, so the button's own colour is not what the ring has to contrast against.

## Links

A link in running text is `--text-primary` — the same colour as the words around it — and
**always underlined**. There is no approved second text colour on the page ground, so the
underline is not decoration; it is the only thing distinguishing a link, and removing it
removes the link.

| State | Treatment |
| --- | --- |
| Rest | `--text-primary`, underline 1px, `text-underline-offset: 0.18em`. |
| Hover | Unchanged colour, underline thickens to 3px. |
| Focus | The focus ring, plus the hover underline. |
| Visited | Not distinguished. |

Colour never changes on hover, at any size. The website hovers links to Ocean Blue at 18px,
which measures 3.95 against the page ground and fails; that is why the change is carried by
the underline instead.

Visited links are not styled. There is no approved pair for a third text colour, and on a site
of this kind the distinction tells a reader nothing they need.

A link that is a button — a call to action — is a button, and takes the button rules in
`layout.md`. The underline rule is for links inside prose.

## Controls and forms

**A control boundary is `--border-control`, one pixel.** That is `--colour-muted-grey` on a
light ground: 5.33 on white, 4.93 on Snow White. WCAG 1.4.11 holds a user-interface component
boundary to 3:1, and `--colour-hairline-grey` measures 1.44 and 1.33 — it never borders a
control. It rules a section off, and that is all it does.

This corrects an earlier version of this file, which gave hairline grey the job of bordering
an unchecked control while also warning that it must never be the only cue for a boundary that
matters. The warning was right and the job contradicted it.

| Part | Colour |
| --- | --- |
| Field border | `--border-control`, 1px. |
| Field ground | `--surface-raised`. |
| Label and value | `--text-primary`. |
| Placeholder and help text | `--text-secondary`. |
| Error message and border | `--text-error`. |
| Focus | The focus ring, outside the field. |

**An error is never signalled by colour alone.** A red border with no message is not an error
state; write what went wrong and how to fix it, in `--text-error`, next to the field.

**A disabled control is `--text-secondary` on `--surface-page`,** at 4.93, and carries
`aria-disabled` or `disabled`. It is not a lighter grey: a control a reader cannot read is
worse than one they cannot press. If a disabled control needs explaining, explain it in text
rather than dimming it further.

## The dark ground

Night Blue is the dark page ground, and Snow White on it is a pair this brand has always had.
Four more colours exist so the rest of the interface has somewhere to go. Nothing in the light
palette crosses over: `--colour-muted-grey` measures 3.16 on Night Blue and is too faint to
read, and `--colour-hairline-grey` measures 11.71, which is far too loud for a hairline.

| Token | Hex | What it is for |
| --- | --- | --- |
| `--colour-dark-surface` | `#242942` | Cards and panels lifted off the dark ground. |
| `--colour-dark-muted-grey` | `#9BA1B8` | Secondary text, and the boundary of a form control. |
| `--colour-dark-hairline-grey` | `#3A4059` | Hairline rules. Never a control boundary. |
| `--colour-dark-error-red` | `#EF7A7A` | Form error messages. |

`--colour-error-red` is not among them. It measures 3.03 on Night Blue, below the 4.5 a
message has to clear, so the dark ground needs its own red.

### Accepted combinations on the dark ground

| Foreground | Background | Ratio | Use for |
| --- | --- | --- | --- |
| `--colour-snow-white` | `--colour-night-blue` | 15.60 | The dark page ground. All long-form reading. |
| `--colour-snow-white` | `--colour-dark-surface` | 13.21 | Cards and panels lifted off the dark ground. |
| `--colour-dark-muted-grey` | `--colour-night-blue` | 6.57 | Secondary text, and control boundaries. |
| `--colour-dark-muted-grey` | `--colour-dark-surface` | 5.56 | The same, on a card. |
| `--colour-dark-error-red` | `--colour-night-blue` | 6.21 | Form error messages. |
| `--colour-dark-error-red` | `--colour-dark-surface` | 5.26 | The same, on a card. |
| `--colour-dark-hairline-grey` | `--colour-night-blue` | 1.65 | Hairline rules only. Never text, never a control boundary. |
| `--colour-dark-hairline-grey` | `--colour-dark-surface` | 1.40 | The same, on a card. |
| `--colour-ocean-blue` | `--colour-night-blue` | 3.95 | Large display text at 24px and above, icons, rules. Never body text. |

`--colour-dark-surface` on `--colour-night-blue` is 1.18. That is a surface against a surface,
not a text pair, and 1.18 is enough to separate two grounds when a radius separates them too.
It is not enough to be the only cue that a card exists; give the card padding as well.

### The pastels do not change

Violet, Lime Green, Yellow and Pink are grounds, and the only foreground approved on any of
them is Night Blue. That pair measures the same on a dark page as on a light one — 9.21 to
13.05 — so **a pastel section is identical in both themes**, and so is the primary button.
They are light panels on a dark page, and that is correct rather than a compromise.

A focus ring inside a pastel section is Night Blue, not Snow White. The ring contrasts against
the ground it sits on, which there is the pastel.

## What is not approved

**`--colour-ocean-blue` as body text.** It measures 4.27:1 on white, 3.95:1 on Snow White and
3.95:1 on Night Blue. It is a details colour: large display text, icons and rules, in either
theme.

**`--colour-ocean-blue` as a background.** Night Blue on it is 3.95:1 and Snow White on it is
3.95:1 — there is no readable text colour for that ground, so it is never a ground.

**The four pastels as text.** Violet, Lime Green, Yellow and Pink are grounds and details.
Night Blue is the only foreground approved on any of them, in either theme. Pink is close
enough to a light red to be tempting as the dark error colour, and it is still not text.

**Any grey on the wrong ground.** `--colour-muted-grey` and `--colour-hairline-grey` are light
only; `--colour-dark-muted-grey` and `--colour-dark-hairline-grey` are dark only. Use
`--text-secondary` and `--border-hairline` and the theme picks.

**Any pair not in the tables above.** Including pastel on pastel, and any of the greys on a
pastel.

## Which pairs carry a mark

Nine of the light pairs above are also approved for the logotype and the icon logo. The rest
are not: a pair approved for secondary text, form errors or hairline rules is approved for
that, and a mark is none of those things. `logos.md` lists the nine and says which mark each
takes — `--colour-ocean-blue` is the logotype only, and not below 141px.

No mark is approved on `--colour-dark-surface`. A mark on a dark card takes the Night Blue
ground it already has a lockup for.

## Notes on the source

The brand guide holds two colour tables that overlap and disagree with each other. Ocean Blue
is tagged *Details* in one and *Backgrounds, Details* in the other; this file resolves that as
details only, on the contrast evidence.

The guide also instructs "Dark Mode: use Grey for titles & body text" while defining no colour
called Grey. That instruction is still not carried over — there was no value in it to carry.
The dark ground here is Night Blue with Snow White text, and its four supporting colours were
measured for this file rather than taken from the guide.

The guide states CMYK values alongside each colour. They do not match a standard conversion
from the same hex and name no profile, so they are not reproduced here. Get CMYK from your
printer against a named profile, not from the guide.
