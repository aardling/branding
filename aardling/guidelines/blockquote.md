# Blockquote

A verbatim quotation: someone's own words, set apart from the text around them. A caveat,
prerequisite or warning is a callout, not a blockquote. See `components.md`.

Two shapes: **inline**, a quotation inside running prose, and **card**, a testimonial with an
attribution.

## Anatomy

| Part | Setting |
| --- | --- |
| Quote mark | `assets/icons/quote.svg`, `--icon-lg`, `--colour-ocean-blue`. Always present. |
| Quote text | General Sans, `--font-weight-light`, `--font-size-h6`, `--line-height-body`, `text-wrap: balance`. |
| Name | `--text-primary`, `--font-weight-semibold`, `--font-size-small`. Optional. |
| Role | `--text-secondary`, `--font-size-small`, `--font-weight-regular`, after the name. Optional. Requires a name. |
| Company | `--text-secondary`, `--font-size-small`. Joined to the role with ", ", or to the name with " · " when there is no role. Optional. Requires a name. Dropped when a company logo is present. |
| Photo | Small square avatar. See *Photo*. Optional. Requires a name. |
| Company logo | The company's own mark, in its own colours. See *Company logo*. Optional. Requires a name. |

1. Once a name exists, role, company, photo and logo are independent toggles.
2. The mark and the quote text never vary.

## Which shape

1. Inline: inside a column of running prose — an article, a case study, a long-form page.
2. Card: a testimonial, in a grid with others. Use it for fuller attributions: photo, company
   logo.

## Ground

1. Inline sits on `--surface-page`, like the prose around it.
2. Card is the card from `components.md`: `--surface-raised`, `--radius-md`, `--space-4`
   padding, `--shadow-raised`. Not a second container.
3. On a pastel card, everything is `--text-primary`, including the mark and the rule.

## Colour

1. The mark, and the rule beside inline text, are `--colour-ocean-blue`. `colour.md` already
   approves it for icons and rules in both themes.
2. On a pastel ground, the mark and the rule are `--text-primary`. Ocean Blue is approved only
   on white, Snow White and Night Blue.
3. Name, role and company use the roles `--text-primary` and `--text-secondary`. No special
   case for either theme or for `data-surface="light"` / `"dark"`.

## Typography

1. The quote text has one setting everywhere: General Sans, `--font-weight-light`, the
   standfirst's weight.
2. `--font-size-h6` at every width. It does not step up like a heading.
3. Separate the name from role and company by weight and colour, not size.

## Photo

1. Square, `--radius-sm`, `object-fit: cover`.
2. Size: `--control-height-sm` (44px).
3. Never a circle.
4. Always a 1px `--border-hairline` outline, inline or in a card. The `imagery.md` exception
   for photographs in a card does not apply to the avatar.

## Company logo

1. Never recoloured. Use the colours the company supplies.
2. Height matches `--icon-lg` (24px); width follows.
3. Where the page may show a dark ground, ask the company for a variant that reads on dark. A
   logo drawn only for white stays on the light theme's card.
4. Always give it an accessible name: `alt="Acme"`.
5. Drop the typed company name when the logo is present. See `imagery.md` for the same rule on
   a generated Cover.

## Width

1. Full width is the default: the measure of the text column for inline, no wider (as the
   callout panel in `components.md`); the card's own width for a card.
2. Half width: for a shorter quote that does not need the full measure.
3. An inline half-width blockquote is centred in the column and breaks the paragraph either
   side. Never floated with text wrapped alongside.
4. Below `--breakpoint-sm`, half width drops to full width, as the illustrative aside in
   `imagery.md` does.
5. Cards take no half-width rule: two cards in a row are half width, one card spanning the row
   is full width. See "Card grid" in `components.md`.

## At 360px

1. The quote text wraps to no more than four or five lines.
2. Protected terms inside the quotation stay whole.

## Checklist

1. 360px first, then the half-width column, then a three-card row.
2. Both themes, and inside a pastel card: mark and rule fall back to `--text-primary`.
3. Protected terms whole inside the quotation, in a single `nowrap` span.
4. Every colour is a role, except Ocean Blue on the mark and rule, and that only off a pastel
   ground.
5. No circular photo. No spacing value off the ladder.
6. A company logo always has an accessible name and never stands beside the typed company name.
