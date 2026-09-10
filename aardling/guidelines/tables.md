# Tables

A table is for values that only make sense against their neighbours in the same column — a
schedule, a price list, a comparison. If a list of things is being presented for reading rather
than for comparing, it is a card list or a bulleted one; a table is a heavier form and earns
its keep only where the column relationships matter.

## Anatomy

| Part | Setting |
| --- | --- |
| Caption | Optional. General Sans — never Voyage, per `typography.md` — `--font-size-h6` at `--font-weight-heading`, `--text-primary`. `--space-3` above the table. |
| Header row | `--font-size-small` at `--font-weight-semibold`, `--text-primary`, on the table's own ground. No fill of its own — weight and size are what separate it. |
| Body row | `--font-size-body` at `--font-weight-regular`, `--text-primary`; every other row in `--surface-page`. |
| Row hover / focus | The one accent this component spends: a Yellow wash. See *Colour*. |
| Footer row | Optional, for a total or a summary. Separated by a hairline, not the stripe. |

## Ground

A table almost always sits inside a card — `--surface-raised`, `--radius-md`, `--space-4`
padding, `--shadow-raised` — the same card `components.md` already specifies, not a second
container. Set flat on `--surface-page` only where there is no surrounding card to give it
room. A table carries no radius or shadow of its own; whichever ground it's on supplies both.

## Colour

The stripe stays quiet on purpose. Every other row sits in `--surface-page` — Snow White
against a white card, Night Blue against a dark one — so it reads as structure, not as a
colour statement, and needs no special case for either theme: `var(--surface-page)` is already
correct wherever the table is.

One accent is held back for the moment that earns it. Hovering or focusing into a row washes
it in Yellow — Night Blue on Yellow, the pair `colour.md` already approves for "section
grounds and cards," doing a new job here. Nothing else on the table reaches for it: the header
stays on the table's own ground, told apart by weight and size alone, the same restraint the
brand already applies to an eyebrow beside a heading.

This is the same kind of exception `colour.md` makes for the primary button: hover hard-sets a
palette colour instead of a role, on purpose, everywhere the wash appears. Because of that, a
row under the hover wash re-points its light-only roles locally, exactly as
`[data-surface="light"]` does elsewhere in this brand:

```css
table.data tbody tr:hover,
table.data tbody tr:focus-within {
  --text-primary: var(--colour-night-blue);
  --text-secondary: var(--colour-night-blue);
  --border-control: var(--colour-muted-grey);
  --focus-ring: var(--colour-night-blue);
  background: var(--colour-yellow);
}
```

That is what keeps a checkbox or a focus ring legible the moment a row turns Yellow, on a light
page or a dark one. **No grey inside the wash** — `--text-secondary` is not approved on any
pastel, the same rule a callout already follows, so a secondary column takes `--text-primary`
there instead, distinguished by size rather than by a second colour.

A control boundary needs 3:1 to stay legible against its ground. Muted Grey on Yellow measures
4.08:1 — comfortably clear. Violet and Pink don't (2.91 and 2.95), which is why they stay
reserved for hero and card grounds and Yellow is the one pastel that carries a table's hover
state. Lime Green clears it too (4.12:1) but stays off the table regardless — its one approved
job is the primary button.

## Header row

Column labels, `--font-size-small` at `--font-weight-semibold` — the exact use
`typography.md` already names for that weight. Not uppercase: the eyebrow and the footer's
group headings spend 0.12em tracking on a short category word, and a header row is usually
more than one word per cell (`Start date`, not `DATE`) — that much tracking across a phrase
reads as shouting rather than structure. Weight and size are enough to separate the header
from the body without a second treatment on top.

A header cell aligns the way its column does: left for text, right for numbers.

## Body cells

Padding is `--space-2` vertical, `--space-3` horizontal, on **every** cell including the first
and the last column — never zeroed to flush against a container's edge. A table that hugs its
own edges reads as cramped regardless of what sits around it; the card or the page margin
already supplies the outer edge, and the cell padding is what makes the table itself feel
generous rather than gridded.

**Right-align numbers, left-align everything else.** A column of prices or counts reads by its
last digit, not its first; aligning it left scatters that digit across the column and a reader
has to hunt for it. Never centre a column of running text — a short status mark or a single
icon is the one thing centring suits.

## Protected terms

A cell holding a protected term — `Domain-Driven Design`, `EventStorming`, any of the six in
`layout.md` — never breaks it across two lines, the same rule as running text: one
`white-space: nowrap` span around the whole term. If the term doesn't fit the column, the
column is too narrow, not the term — widen it, or drop a less important column first.

## A row that links elsewhere

The destination lives on the row's primary cell, as a real `<a>`, styled with the link rule in
`colour.md`: `--text-primary`, underlined in `--link-underline`, hover and focus bringing it to full
strength, its own colour never changing. The row around it washes to Yellow at the same time,
so the whole row answers — not just the link's own text.

If the whole row needs to act as the target rather than just the one cell, the row is the hit
area and the anchor is what a keyboard and a screen reader land on — the same split `forms.md`
uses for a checkbox row, where the 44px row is clickable but the box and its label are the real
control.

## A sortable column

The label sits inside a `<button>`, and `aria-sort` (`none`, `ascending` or `descending`) sits
on the `<th>` around it. A sort control is not running text, so it does not start underlined —
the same exception `web.md` already makes for a navigation item. Hover and focus add the
underline, at full `--text-primary` strength exactly as a link's hover does; rest is bare.

The active column carries a small arrow beside its label — `chevron-up` or `chevron-down` at
`--icon-sm`, `--space-1` away, in the same colour as the label — pointing the way it is
currently sorted. An inactive column shows none. **Never colour alone:** it is the icon's
presence that says which column is active, the same reasoning `colour.md` gives an error or a
confirmation.

## Selecting rows

A selection column uses the checkbox from `forms.md` unchanged: a 24px box, 1px
`--border-control` at rest, filled with `--text-primary` and checked in `--surface-raised`
when ticked, inside a 44px-tall cell. The header cell carries the "select all" checkbox, with
`indeterminate` set when some but not all rows are checked — a third visual state a reader
reads correctly without a colour of its own. The stripe needs no special handling for this; the
hover wash's role re-point (*Colour*, above) is what keeps the box legible the instant a row
turns Yellow.

## Footer, for a total

Optional, and separated by a hairline rather than the stripe — a summary is a distinct zone,
not more data, so it stays off the zebra. It can stack more than one line — subtotal, tax,
total — with only the last line in `--font-weight-semibold`; the lines above it are
`--text-secondary`, so the eye lands on the number that closes the table.

## At 360px

A table wider than its column is not shrunk below `--font-size-small` and does not truncate a
value to make it fit — `layout.md`'s rule holds here too: the layout is what's wrong, not the
content. Wrap it in its own `overflow-x: auto` container and check it at 360px, per `web.md`.
The card's own edge already marks the boundary, so the scroll wrapper adds no border or shadow
of its own.

On a table wide enough that a reader loses the row's label while scrolling, keep the first
column in view with `position: sticky; left: 0` and an explicit `background`, set to the same
role the row already sits on — a sticky cell with no background of its own lets the columns
behind it show through as it slides underneath.

## Loading and empty

A table waiting on data shows a `role="status"` message where the rows will be — "Loading…" —
never a spinner alone, the same rule `web.md` gives any busy state. A table with nothing to
show is one row, spanning every column, in `--text-secondary`, saying what's missing and, where
there's one, what to do about it — an empty grid says nothing a reader can act on. Neither
state carries the stripe: there's no data yet to separate.

## Dark mode

The Yellow hover wash is the one deliberate exception in this component — a hard-set colour
rather than a role, the same exception `colour.md` already grants the primary button. The
stripe isn't an exception at all: it's `--surface-page`, already correct in both themes with no
extra code. Everything else — the checkbox, the focus ring, the header, the link — is a role,
so the whole table is already correct under `prefers-color-scheme` and inside a
`[data-surface="dark"]` container. It is not itself a pastel container: a table holds data, not
emphasis, so it never sits directly on Violet, Yellow or Pink as its own ground.

## Before this ships

- 360px first: every column readable or the table scrolls, per `web.md`.
- Both themes, and inside a dark band.
- Keyboard only: sortable headers, row links and row checkboxes all reachable, the ring
  visible on each.
- Protected terms whole, in a single `nowrap` span.
- Every colour a role except the one deliberate Yellow hover — never a second hand-set colour
  added beside it.
- No cell padding zeroed to flush an edge, and no spacing value that is not a step on the
  ladder.
