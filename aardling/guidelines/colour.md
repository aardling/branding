# Colour

Aardling's palette is seven brand colours and five functional ones, plus five more functional
colours that exist only on the dark ground. The brand colours come from Hartstikke's original
brand guide; the functional colours were in the website's CSS without ever having been
approved, and are kept here because each does a job the brand colours cannot.

Colours are approved **in pairs**. A pair that is not in the tables below is not an approved
combination of this brand. Ratios are WCAG 2.x contrast, computed from the two values.

## Two tiers

The palette names colours. A second, smaller set names **jobs** and points at the palette:
`--surface-page`, `--text-primary`, `--border-control` and seven more. Components reference the
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
| `--text-success` | `--colour-success-green` | `--colour-dark-success-green` |
| `--border-control` | `--colour-muted-grey` | `--colour-dark-muted-grey` |
| `--border-hairline` | `--colour-hairline-grey` | `--colour-dark-hairline-grey` |
| `--focus-ring` | `--colour-night-blue` | `--colour-snow-white` |
| `--link-underline` | `rgba(24, 28, 47, 0.5)` | `rgba(246, 246, 246, 0.5)` |

Ten roles, and no more without a reason. An eleventh role is a request to add a colour, and
goes through the same approval as one.

`--text-success` was the ninth, added with the two greens below. It went through exactly that
approval: the palette could say a thing failed and had no approved way to say it passed.

`--link-underline` is the tenth, and the one role that is not a palette colour: `--text-primary`
at 50% opacity, the rest-state link underline the Links section below measures. It is a
translucent value rather than a flattened grey so that it sits at half strength on a raised
surface as well as on the page ground, and it exists so that no consumer has to derive the
tint for itself — every derivation is a different colour. Hover and focus are `--text-primary`
and need no role of their own.

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
| `--colour-success-green` | `#38761E` | Confirmation messages. |

`--colour-muted-grey` is set where it clears 4.5:1 on both white and Snow White. A lighter
grey does not, however good it looks.

`--colour-success-green` sits at hue 102, between Lime Green at 101.7 and Hover Green at
103.8. It is the brand's own green darkened until it reads as text, not a signal green
borrowed from elsewhere, and it was set to land on the red's numbers rather than merely to
pass: 5.56 against Error Red's 5.57 on white, 5.14 against 5.16 on Snow White. A confirmation
and a rejection then carry the same weight on the page, and neither shouts over the other.
Lime Green and Hover Green are grounds — Night Blue sits on them, they never sit on
anything — so neither could do this job.

## Accepted combinations

| Foreground | Background | Ratio | Use for |
| --- | --- | --- | --- |
| `--colour-night-blue` | `--colour-snow-white` | 15.60 | The default. Page ground and all long-form reading. |
| `--colour-night-blue` | `--colour-white` | 16.85 | Cards and panels lifted off the page ground. |
| `--colour-snow-white` | `--colour-night-blue` | 15.60 | Inverted sections, the footer, dark buttons. |
| `--colour-night-blue` | `--colour-lime-green` | 13.05 | The primary button. |
| `--colour-night-blue` | `--colour-hover-green` | 10.50 | The primary button, hover and focus. |
| `--colour-night-blue` | `--colour-yellow` | 12.90 | Section grounds and cards. Also a table row's hover and focus wash — `tables.md`. |
| `--colour-night-blue` | `--colour-pink` | 9.35 | Section grounds and cards. |
| `--colour-night-blue` | `--colour-violet` | 9.21 | Section grounds and callouts. |
| `--colour-muted-grey` | `--colour-white` | 5.33 | Secondary text on a card, and the border of a control on one. |
| `--colour-muted-grey` | `--colour-snow-white` | 4.93 | The same, on the page ground. |
| `--colour-error-red` | `--colour-white` | 5.57 | Form error messages on a card. |
| `--colour-error-red` | `--colour-snow-white` | 5.16 | Form error messages on the page ground. |
| `--colour-success-green` | `--colour-white` | 5.56 | Confirmation messages on a card. |
| `--colour-success-green` | `--colour-snow-white` | 5.14 | Confirmation messages on the page ground. |
| `--colour-ocean-blue` | `--colour-white` | 4.27 | Large display text at 24px and above, icons, and rules — including the navigation accent rule. Never body text. |
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
| Rest | `--text-primary` text, underline 1px, `text-underline-offset: 0.18em`, in `--link-underline` — `--text-primary` at 50% opacity, 3.22 against Snow White, 4.84 against Night Blue. |
| Hover | Text unchanged; underline goes to full `--text-primary`, same 1px, same offset. |
| Focus | The focus ring, plus the hover underline. |
| Visited | Not distinguished. |

Text colour never changes on hover, at any size. The website hovers links to Ocean Blue at
18px, which measures 3.95 against the page ground and fails; that is why the state change is
carried by the underline instead — by its opacity, not its thickness, so it reads as a colour
change like every other state in the brand.

Visited links are not styled. There is no approved pair for a third text colour, and on a site
of this kind the distinction tells a reader nothing they need.

A link that is a button — a call to action — is a button, and takes the button rules in
`layout.md`. The underline rule is for links inside prose.

**A navigation item is neither.** Not prose, so it is not underlined at rest; not a button, so
it takes no pill. Its states are a rule in `--colour-ocean-blue` drawn under the label — 1px
on hover and focus, 3px on the current section, and no change of weight. `web.md` specifies
them, with the measurements that rule out every other colour: the marker has to clear 3:1 on
both the light bar and the dark one, and Ocean Blue is the only colour in this palette that
does.

## Buttons

Three tiers, and no fourth. Geometry and sizes are in `layout.md`; the colours are here.

**Hover always promotes.** A ghost button hovered looks like a secondary at rest; a secondary
hovered becomes the dark button this file has always approved. Nothing moves, grows or lifts —
every state change is a colour change at `--duration-fast`, and **the pressed state is the
hover state**, as `web.md` says.

| Tier and state | Foreground | Background | Light | Dark |
| --- | --- | --- | --- | --- |
| Primary, rest | `--colour-night-blue` | `--colour-lime-green` | 13.05 | 13.05 |
| Primary, hover and pressed | `--colour-night-blue` | `--colour-hover-green` | 10.50 | 10.50 |
| Secondary, rest — 1px border and label | `--text-primary` | `--surface-page` | 15.60 | 15.60 |
| Secondary, rest on a card | `--text-primary` | `--surface-raised` | 16.85 | 13.21 |
| Secondary, hover and pressed | `--surface-page` | `--text-primary` | 15.60 | 15.60 |
| Ghost, rest and hover | `--text-primary` | `--surface-page` | 15.60 | 15.60 |
| Disabled, label and border | `--text-secondary` | transparent | 4.93 | 6.57 |

The secondary hover takes `--surface-page` for its label and not `--surface-raised`: Snow White
on Night Blue is an approved pair, plain White on Night Blue is not, so a secondary button on a
card would otherwise hover into a combination this file does not list.

The ghost button's border exists at rest as `1px solid transparent`, so revealing it changes a
colour and not a box.

**The primary is the one component that names palette colours instead of roles.** That is
deliberate and it is the only exception: the pastels do not move between themes, and neither
does this button.

**There is no tertiary tier.** A quieter label would be `--text-secondary`, which is exactly
the disabled appearance defined below — not a near miss, the same rule. A quieter border would
be `--border-control`, which is exactly a form field. Emphasis below ghost is carried by size:
a small ghost button is quieter than a medium one and collides with nothing.

### On a pastel ground

**A pastel section takes the Night Blue primary, not the Lime Green one.** As a shape against
its ground, Lime Green measures 1.01 on Yellow, 1.42 on Violet and 1.40 on Pink. The label
still passes at 13.05, but the button has no edge and does not read as a button. On the page
ground and on the dark ground Lime Green measures 1.20 and 13.05, and stays the primary there.

| On a pastel | Foreground | Background | Ratio |
| --- | --- | --- | --- |
| Primary, rest | `--colour-snow-white` | `--colour-night-blue` | 15.60 |
| Primary, hover and pressed | `--colour-night-blue` | `--colour-lime-green` | 13.05 |

**A pastel section carries one button.** A second action there is a ghost — bare Night Blue
label, hovering to a Night Blue outline — and never a secondary, whose rest and hover states
would both collide with the primary's. If a callout seems to need two equal actions, it has one
too many.

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
| Help text | `--text-secondary`. |
| Error message and border | `--text-error`. |
| Confirmation message and border | `--text-success`. |
| Focus | The focus ring, outside the field. |

**An error is never signalled by colour alone.** A red border with no message is not an error
state; write what went wrong and how to fix it, in `--text-error`, next to the field. The
border also doubles to 2px, so the state survives without colour at all.

**Nor is a success.** A green border with no message is not a confirmation; say what passed, in
`--text-success`, next to the field. Confirm only what the reader could not already see — a
value that was checked against something, an action that completed. Repeating a field back
because it is well-formed is noise, and a form that congratulates every entry teaches the
reader to stop looking at the green.

**There is no placeholder row above,** because there are no placeholders. An earlier version of
this file gave placeholder text `--text-secondary`; `forms.md` removed the placeholder itself,
and what it would have said is help text now.

**A disabled control has no fill.** Its ground is transparent, its boundary is
`--border-control` at 1px, and its label is `--text-secondary` — 4.93 on the page ground, 5.33
on a card, 6.57 on the dark one. It carries `aria-disabled` or `disabled`.

An earlier version of this file gave the disabled ground as `--surface-page`. That is wrong on
a card: a Snow White box inside a White panel reads as a stray surface rather than a dead
control. Transparent lets the border do the work, and the border already measures.

It is not a lighter grey: a control a reader cannot read is worse than one they cannot press.
If a disabled control needs explaining, explain it in text rather than dimming it further.

**Prefer not to disable at all.** A submit button disabled until a form is complete tells the
reader nothing about what is missing. Let it submit, and answer with validation that names the
field and the fix.

## The dark ground

Night Blue is the dark page ground, and Snow White on it is a pair this brand has always had.
Five more colours exist so the rest of the interface has somewhere to go. Nothing in the light
palette crosses over: `--colour-muted-grey` measures 3.16 on Night Blue and is too faint to
read, and `--colour-hairline-grey` measures 11.71, which is far too loud for a hairline.

| Token | Hex | What it is for |
| --- | --- | --- |
| `--colour-dark-surface` | `#242942` | Cards and panels lifted off the dark ground. |
| `--colour-dark-muted-grey` | `#9BA1B8` | Secondary text, and the boundary of a form control. |
| `--colour-dark-hairline-grey` | `#3A4059` | Hairline rules. Never a control boundary. |
| `--colour-dark-error-red` | `#EF7A7A` | Form error messages. |
| `--colour-dark-success-green` | `#5AB234` | Confirmation messages. |

Neither `--colour-error-red` nor `--colour-success-green` is among them. Both measure 3.03 on
Night Blue — the same number by coincidence — below the 4.5 a message has to clear, so the dark
ground needs its own red and its own green.

### Accepted combinations on the dark ground

| Foreground | Background | Ratio | Use for |
| --- | --- | --- | --- |
| `--colour-snow-white` | `--colour-night-blue` | 15.60 | The dark page ground. All long-form reading. |
| `--colour-snow-white` | `--colour-dark-surface` | 13.21 | Cards and panels lifted off the dark ground. |
| `--colour-dark-muted-grey` | `--colour-night-blue` | 6.57 | Secondary text, and control boundaries. |
| `--colour-dark-muted-grey` | `--colour-dark-surface` | 5.56 | The same, on a card. |
| `--colour-dark-error-red` | `--colour-night-blue` | 6.21 | Form error messages. |
| `--colour-dark-error-red` | `--colour-dark-surface` | 5.26 | The same, on a card. |
| `--colour-dark-success-green` | `--colour-night-blue` | 6.30 | Confirmation messages. |
| `--colour-dark-success-green` | `--colour-dark-surface` | 5.34 | The same, on a card. |
| `--colour-dark-hairline-grey` | `--colour-night-blue` | 1.65 | Hairline rules only. Never text, never a control boundary. |
| `--colour-dark-hairline-grey` | `--colour-dark-surface` | 1.40 | The same, on a card. |
| `--colour-ocean-blue` | `--colour-night-blue` | 3.95 | Large display text at 24px and above, icons, and rules — including the navigation accent rule. Never body text. |

`--colour-dark-surface` on `--colour-night-blue` is 1.18. That is a surface against a surface,
not a text pair, and 1.18 is enough to separate two grounds when a radius separates them too.
It is not enough to be the only cue that a card exists; give the card padding as well.

### The pastels do not change

Violet, Lime Green, Yellow and Pink are grounds, and the only foreground approved on any of
them is Night Blue. That pair measures the same on a dark page as on a light one — 9.21 to
13.05 — so **a pastel section is identical in both themes**, and so is the primary button.
They are light panels on a dark page, and that is correct rather than a compromise.

A focus ring inside a pastel section is Night Blue, not Snow White — the ring contrasts
against the ground it sits on, which there is the pastel. Snow White on Violet is 1.69 and
would be invisible. The roles do not work this out on their own: a pastel section on a dark
page carries `data-surface="light"`, which puts all ten roles back to their light values.
That is the one place a container has to declare its own surface, and `web.md` says when.

## What is not approved

**`--colour-ocean-blue` as body text.** It measures 4.27:1 on white, 3.95:1 on Snow White and
3.95:1 on Night Blue. It is a details colour: large display text, icons and rules, in either
theme.

**`--colour-ocean-blue` as a background.** Night Blue on it is 3.95:1 and Snow White on it is
3.95:1 — there is no readable text colour for that ground, so it is never a ground.

**Snow White or White text on Violet, explicitly forbidden.** Violet is the pastel most
likely to be mistaken for light enough to carry light text. It is not: Snow White on Violet
measures 1.69:1 and White measures barely more — both fail even the 3:1 floor for large
text, let alone the 4.5:1 floor for body copy. Night Blue is the only approved foreground on
Violet, in any theme.

**The four pastels as text.** Violet, Lime Green, Yellow and Pink are grounds and details.
Night Blue is the only foreground approved on any of them, in either theme. Pink is close
enough to a light red to be tempting as the dark error colour, and it is still not text; Lime
Green is close enough to a light green to tempt the same way as the success colour, and it is
still not text either.

**Either green on the wrong ground.** `--colour-success-green` measures 3.03 on Night Blue and
2.57 on Dark Surface; `--colour-dark-success-green` measures 2.67 on white and 2.47 on Snow
White. Use `--text-success` and the theme picks.

**Either green on a pastel.** `--colour-success-green` is 4.30 on Lime Green and 4.26 on
Yellow. Close is not approved, and a green message on a green ground would be poor signalling
even if it measured.

**Either green as a background.** They are message colours, like the reds. A confirmation sits
on the surface it is already on.

**Any grey on the wrong ground.** `--colour-muted-grey` and `--colour-hairline-grey` are light
only; `--colour-dark-muted-grey` and `--colour-dark-hairline-grey` are dark only. Use
`--text-secondary` and `--border-hairline` and the theme picks.

**Any pair not in the tables above.** Including pastel on pastel, and any of the greys on a
pastel.

## Which pairs carry a mark

Nine of the light pairs above are also approved for the logotype and the icon logo. The rest
are not: a pair approved for secondary text, form errors, confirmations or hairline rules is
approved for that, and a mark is none of those things. `logos.md` lists the nine and says which mark each
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
