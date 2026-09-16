# Components

1. Four components: hero, cards, callouts, footer.
2. All are built from existing tokens. This file adds no colour, spacing step or radius.
3. Approved pairs: `colour.md`. Spacing, radii, button: `layout.md`. Scale and faces:
   `typography.md`. Breakpoints, states, elevation, dark mode, motion: `web.md`.
4. Navigation, forms and the page grid are separate specifications, not yet written. The hero's
   actions defer to the button in `layout.md`; the card grid sizes itself intrinsically; the
   footer has an empty newsletter slot.
5. Everything is phone first. A width in a table is where a setting changes; below it, the row
   above holds.

## Hero

The first screen of a page: one heading, on flat ground.

### Which hero

| Hero | Where | Top | Bottom |
| --- | --- | --- | --- |
| Page hero | Home, a landing page, the top of an index | `--space-8`, `--space-12` from 960px | the same |
| Detail hero | An article, an event, a course, a person | `--space-8`, `--space-18` from 960px | `--space-8`, `--space-12` from 960px |
| Cover | A title card, event artwork, a social image | see Cover | see Cover |

1. The detail hero's top is the only use of `--space-18`.

### Anatomy

| Part | Setting |
| --- | --- |
| Eyebrow | `--font-size-small`, uppercase, `letter-spacing: 0.12em`, `--font-weight-semibold`. `--text-secondary` on `--surface-page`; `--text-primary` on a pastel. Optional. |
| Heading | The page's h1 and its one Voyage setting. `--font-size-h1`, `--line-height-display`, `text-wrap: balance`. |
| Standfirst | `--font-size-h6`, `--font-weight-light`, `--line-height-body`, `text-wrap: pretty`. Two or three sentences. Optional. |
| Actions | Buttons per `layout.md`. One primary, at most one secondary beside it. Flex row, `--space-2` gap, wrapping, not stretching. Optional. |
| Artwork | Own container, `--radius-md`, declared `aspect-ratio`, `object-fit: cover`. A gradient, illustration or photograph. Optional. |

| Between | Gap |
| --- | --- |
| Eyebrow and heading | `--space-2` |
| Heading and standfirst | `--space-3` |
| Standfirst and actions | `--space-4` |
| Text column and artwork, below 960px | `--space-6` |
| Text column and artwork, from 960px | grid gutter: `--space-3`, `--space-4` from 1400px |

1. Order on the phone, and in the markup at every width: eyebrow, heading, standfirst, actions,
   artwork.
2. From 960px the artwork may move beside the text column. Never above it.
3. The text column is at most `--container-md` wide, whatever its container.

### Ground

1. `--surface-page`, or one flat pastel: Violet, Yellow or Pink.
2. Never Lime Green. It is reserved for the primary button.
3. On a pastel, everything in the hero is Night Blue, the eyebrow included (`--text-primary`).
   Separate it by size, weight and case. No grey is approved on any pastel.
4. A pastel hero on a dark page carries `data-surface="light"`.

### Heading and artwork

1. The heading never sits on artwork: not a photograph, illustration or gradient.
2. Photographs and illustrations: the rule in `layout.md`. No scrim.
3. Gradients: `imagery.md` licenses one heading in the body face at `--font-size-h3` or larger.
   The hero h1 is Voyage, so the licence does not apply.
4. Put artwork beside the text or below it.

### Cover

1. A cover is not a page hero: a full-bleed gradient carrying one heading and nothing else.
2. Constraints from `imagery.md`: General Sans at `--font-weight-heading`, `--font-size-h3` or
   larger, at most half the width, set to one side, never on the same gradient as a mark.
3. No eyebrow, standfirst or buttons on the artwork. If needed, put them on flat ground below.
4. Never a photograph or an illustration.

### At 360px

1. The heading is 36px inside `--page-margin`. It wraps to at most three lines.
2. Protected terms hold whole.
3. Artwork is no taller than 4:3.

## Cards

1. A card is one of several: a course, an event, a case, an article.
2. A single bordered thing on a page is a panel, not a card.

| Property | Value |
| --- | --- |
| Ground | `--surface-raised` |
| Radius | `--radius-md` |
| Padding | `--space-4` |
| Elevation | `--shadow-raised` (`none` on the dark ground, where `--surface-raised` separates instead) |
| Text | `--text-primary`; metadata `--text-secondary` |
| Border | None |

### Anatomy

| Part | Setting |
| --- | --- |
| Media | Full bleed to the card edge, top corners `--radius-md`, `aspect-ratio` 3:2, `object-fit: cover`. Photograph, illustration or gradient. Optional. |
| Eyebrow | `--font-size-small`, uppercase, `letter-spacing: 0.12em`, `--font-weight-semibold`, `--text-secondary`. Optional. |
| Title | General Sans, `--font-weight-heading`, `--font-size-h5`, `--line-height-display`, `text-wrap: balance`. Omitted when the media is a generated Cover with the same title; see "No image" in `imagery.md`. |
| Body | `--font-size-body`, `text-wrap: pretty`. At most three lines. Optional. |
| Metadata | `--font-size-small`, `--text-secondary`. Date, duration, place. At the foot. Optional. |

1. Gaps: `--space-2` between eyebrow, title and body; `--space-3` above the metadata.
2. The card is a flex column; the metadata takes `margin-top: auto`, so a row's feet line up.
3. A card title is never Voyage.

### Card on a pastel

1. Violet, Yellow or Pink. Never Lime Green.
2. Every word is Night Blue: eyebrow and metadata are `--text-primary`, distinguished by size,
   weight and case.
3. A card that needs grey secondary text is a `--surface-raised` card. Choose the ground from the
   content.
4. No shadow.
5. In a dark band or on a dark page, carry `data-surface="light"`. Without it the focus ring is
   Snow White, 1.69 against Violet.

### Linked card

1. The whole card is the hit area. The title carries the `<a>`; a stretched pseudo-element
   covers the card:

```css
.card { position: relative; }
.card a::after { content: ""; position: absolute; inset: 0; }
```

2. Hover changes only the title's underline: `--link-underline` to full `--text-primary` at
   `--duration-fast`, per the link rule in `colour.md`.
3. The card does not lift, grow or change ground. There is no approved hover ground.
4. Focus rings the card, not the title:

```css
.card:has(a:focus-visible) { outline: 3px solid var(--focus-ring); outline-offset: 2px; }
.card a:focus-visible { outline: none; }
```

5. This is the only allowed use of `outline: none`: the replacement is in the same block.
6. Anything else clickable in the card takes `position: relative` to sit above the stretched
   element.
7. Prefer one destination per card.

### Card grid

1. Equal columns, `align-items: stretch`: one height per row.
2. Gutter `--space-3`, `--space-4` from 1400px (the grid gutter in `layout.md`).
3. Until the page grid is written, size tracks by content:
   `repeat(auto-fit, minmax(280px, 1fr))`.
4. One ground per row. A pastel card among white ones is a promotion: promote one or none.
5. A card never contains another card.

### At 360px

1. A 280px card leaves 216px of text between its `--space-4` sides.
2. The title wraps to at most three lines.
3. Protected terms hold whole.

## Callouts

A passage read differently from the one above it: a caveat, a prerequisite, an assumption about
the reader. Two shapes: a panel interrupts a column, a band spans the page.

### Panel

| Property | Value |
| --- | --- |
| Ground | `--colour-violet`. Yellow and Pink are for section grounds and cards |
| Radius | `--radius-md` |
| Padding | `--space-4` |
| Width | The measure of its column, no wider |
| Text | Night Blue, as `--text-primary` under `data-surface="light"` |
| Elevation | None |
| Icon | Optional. One mark from `assets/icons/` at `--icon-lg`, on the title's line, `--space-1` from it. Recolour with `color`, never a `fill` attribute |

1. Title `--font-size-h6` at `--font-weight-heading`; body `--font-size-body`; `--space-2`
   between them.
2. Links follow the link rule unchanged: Night Blue, underlined, full-strength underline on
   hover. 9.21 against Violet.
3. No grey: no fine print, caption or metadata. `--text-secondary` is not approved on Violet.
4. Always carry `data-surface="light"`. Without it the focus ring is Snow White on Violet, 1.69.
5. One at a time. Set two consecutive callouts as one.

### Band

| Property | Value |
| --- | --- |
| Ground | Violet, Yellow or Pink, or Night Blue via `data-surface="dark"` |
| Vertical padding | `--space-6`, `--space-10` from 720px, `--space-12` from 960px |
| Horizontal | `--page-margin` below 540px, the container above |
| Radius | None |
| Text | Night Blue on a pastel; the `data-surface="dark"` roles on Night Blue |

1. Never two coloured bands touching. Put a `--surface-page` section between them.
2. A pastel band on a dark page carries `data-surface="light"`.
3. Cards inside a pastel band are `--surface-raised`, with the radius and padding.

## Footer

1. One footer on every page. It declares its own ground:

```html
<footer data-surface="dark"> … </footer>
```

2. The attribute sets all ten roles to their dark values. The footer is identical in both
   themes; nothing inside it hand-sets a colour.

| Property | Value |
| --- | --- |
| Ground | `--surface-page` (Night Blue under the attribute) |
| Vertical padding | `--space-6`, `--space-10` from 720px, `--space-12` from 960px |
| Horizontal | `--page-margin` below 540px, the container above |
| Text | `--text-primary`; group headings and legal line `--text-secondary`, 6.57 |

### Order

1. The logotype
2. One sentence saying what Aardling does, two lines at most
3. The newsletter signup
4. Link groups
5. A hairline rule
6. The legal line

Layout:

1. Gaps: `--space-4` between logotype and sentence; `--space-6` before the link groups;
   `--space-6` above the rule; `--space-3` below it.
2. From 720px, link groups sit in columns: `repeat(auto-fit, minmax(180px, 1fr))` at the grid
   gutter.
3. From 960px, the logotype block and link groups sit side by side; the logotype block is no
   wider than `--container-sm`.
4. The newsletter is a slot only. Its field, label, help text and validation belong to the form
   specification. The footer fixes its position: before the links.

### Logotype

1. Inline `assets/logos/aardling-logotype.svg` and set `color: var(--text-primary)`. The master
   uses `currentColor`.
2. Use a lockup only where `color` cannot be set.
3. Minimum 96px wide (the flat-ground floor in `logos.md`). 160px to 200px in a footer.
4. Clear space on all four sides: the height of the icon logo, about 31px at 180px wide.

### Links

1. Rest, hover and focus follow the link rule in `colour.md`: `--text-primary`, underlined,
   full-strength underline on hover.
2. Whether a navigation link keeps its underline is for the navigation specification. Until
   then, follow the prose rule.
3. Every link is at least 44px high: set `min-height: 44px` and centre the label. Do not
   compute it from padding (18px at 1.5 with `--space-1` either side is 43px).
4. Group headings: `--font-size-small`, uppercase, `letter-spacing: 0.12em`,
   `--font-weight-semibold`, `--text-secondary`. Not links.
5. An icon-only link (a social account) has an accessible name and a 44px box; the mark is
   `--icon-lg` in `--text-primary`.

### Rule and legal line

1. The rule is 1px `--border-hairline`: under the dark roles `--colour-dark-hairline-grey`, 1.65.
2. The legal line is `--font-size-small`, `--text-secondary`: company name, VAT number, year.
3. Links in the legal line (privacy, terms) are `--text-primary` and underlined.

### Not approved

1. A pastel panel without `data-surface="light"`.
2. A shadow. `--shadow-raised` is `none` on the dark ground.
3. A dark section directly above the footer. Put a `--surface-page` section between them.

## Checks

1. 360px first, then 540, then 960 (`web.md`).
2. Both themes, switched at the operating system.
3. Every pastel region carries `data-surface="light"`.
4. Keyboard only: every link, button and card reachable, the ring visible on each, nothing
   reachable by hover alone.
5. Protected terms whole, in a single `nowrap` span (`layout.md`).
6. Every colour a role, never a palette colour.
7. Every spacing value a step on the ladder.
