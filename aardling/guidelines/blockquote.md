# Blockquote

A verbatim quotation — someone's own words, set apart from the text around them. Not a
caveat, a prerequisite or a warning; that is a callout, and `components.md` already owns it.
Two shapes: **inline**, a quotation inside running prose, and **card**, a testimonial with an
attribution.

## Anatomy

| Part | Setting |
| --- | --- |
| Quote mark | `assets/icons/quote.svg`, `--icon-lg`, `--colour-ocean-blue` — the pair `colour.md` already approves for icons and rules. Always present; it is the one part of this component that is never optional. |
| Quote text | General Sans, `--font-weight-light`, `--font-size-h6`, `--line-height-body`, `text-wrap: balance` — `typography.md` already puts a pull quote in the balance group. |
| Name | `--text-primary`, `--font-weight-semibold`, `--font-size-small`. Optional — omitted when there is no one to name. |
| Role | `--text-secondary`, `--font-size-small`, `--font-weight-regular`, following the name. Optional. Requires a name. |
| Company | `--text-secondary`, `--font-size-small`, joined to the role with ", " or, with no role, to the name with " · ". Optional. Requires a name. Dropped when a company logo is present — see *Company logo* below. |
| Photo | A small square avatar. See *Photo* below. Optional. Requires a name. |
| Company logo | The company's own mark, in its own colours. See *Company logo* below. Optional. Requires a name. |

Name, role, company and photo are independent toggles once a name exists — a quote can carry
just a name, a name and a company with no title, a photo with no company, and so on. What
does not vary is the mark and the text: every blockquote in this brand opens the same way.

## Which shape

**Inline** sits inside a column of running prose — an article, a case study, a long-form
page. **Card** is a testimonial: it sits in a grid with others, on the ground `components.md`
already gives a card, and it is where the fuller attributions belong — a name on its own reads
fine inline; a photo and a company logo want the room a card gives them.

## Ground

**Inline** sits on `--surface-page`, exactly like the prose around it. **Card** takes the card
`components.md` already specifies: `--surface-raised`, `--radius-md`, `--space-4` padding,
`--shadow-raised` — not a second container, the same one a case study or an event card uses.
On a pastel card, everything in it is `--text-primary`, per the existing card-on-a-pastel
rule — which includes the quote mark and the rule: see *Colour* below.

## Colour

The mark, and the inline rule beside the text, are `--colour-ocean-blue` — already approved
for "icons... and rules" in both themes, so nothing new is added to `colour.md`.

**On a pastel ground, the mark and the rule are `--text-primary`, not Ocean Blue.** `colour.md`
approves Ocean Blue only on white, Snow White and Night Blue; the four pastels take Night Blue
as their only approved foreground, and a blockquote is not an exception a card-on-a-pastel
already forbids for everything else in it.

Name, role and company text are roles throughout — `--text-primary` and `--text-secondary` —
and already correct in both themes and inside `data-surface="light"` or `"dark"` without a
special case.

## Typography

The quote text is one setting wherever the component appears: General Sans at
`--font-weight-light`, the standfirst's weight, because a blockquote is doing the same job a
standfirst does — a short passage set apart from the body copy around it, not a heading and
not running text. `--font-size-h6` holds at any width the component appears; it does not move
to a larger step the way a heading does, because a testimonial in a three-card row has no room
to grow into.

Name is separated from role and company by weight and colour, not by size — the same device
the hero eyebrow and the footer's group headings already use.

## Photo

Square, `--radius-sm`, `object-fit: cover`, sized to `--control-height-sm` — 44px, the same
box an icon button already uses, rather than a new size invented for this one component.
**Never a circle.** `web.md` withdrew the brand's decorative circle family — sparkles, stars,
ovals — and a circular avatar is that family creeping back in through a side door.

A 1px `--border-hairline` outlines it, always — inline or in a card. `imagery.md` skips a
photograph's border inside a card because the card's own edge already separates the image
from the page; an inset 44px avatar never touches that edge, sits mid-card surrounded by the
card's own ground on every side, and needs its own edge to read against a surface close to
its own tone.

## Company logo

The company's own mark, not Aardling's, so it is never recoloured — set in whatever colours
the company supplies, at a height matching `--icon-lg` (24px) with the width left to follow.
Ask the company for a variant that reads on a dark ground when the page might show one; a
mark drawn for white with nothing else supplied stays on the light theme's card only.

Every logo carries an accessible name — `alt="Acme"` — the same rule an icon-only control
already follows. **The typed company name is dropped when the logo is present**, the same
rule `imagery.md` already gives a card whose media is a generated Cover: the logo already
says the company, and setting the words a second time repeats what the reader just read.

## Width

**Full width is the default:** the measure of the text column it sits in for an inline
blockquote, no wider — the same rule the callout panel already gives in `components.md` — or
the card's own width in whatever grid it sits in.

**Half width** is for a shorter quote that does not need the full measure to make its point.
An inline blockquote at half width sits centred in the column, breaking the paragraph either
side of it rather than floating with text wrapped alongside — a quote mark, several lines and
a citation are too tall to float the way `imagery.md`'s illustrative aside floats a single
image. **It drops to full width below `--breakpoint-sm`**, the same rule that aside already
follows: at 360px, half the column leaves too little room for the mark, the text and the
citation to breathe.

A testimonial card needs no separate half-width rule of its own: two cards side by side is
already half width, by way of `components.md`'s "Cards together" grid; one card spanning the
row is already full width. Nothing new to specify there.

## At 360px

Check the quote text wraps to no more than four or five lines before the citation feels
distant from what it is citing, and that protected terms inside the quotation hold whole, the
same as anywhere else.

## Before this ships

- 360px first, then the half-width column, then a three-card row.
- Both themes, and inside a pastel card — mark and rule fall back to `--text-primary` there.
- Protected terms whole inside the quotation, in a single `nowrap` span.
- Every colour a role except the one deliberate Ocean Blue, and that only off a pastel ground.
- No circular photo, and no spacing value that is not a step on the ladder.
- A company logo never stands without an accessible name, and never stands beside the typed
  name it already replaces.
