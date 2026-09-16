# Tables

1. Use a table for values compared within a column: a schedule, a price list, a comparison.
2. A list read rather than compared is a card list or a bulleted list.

## Anatomy

| Part | Setting |
| --- | --- |
| Caption | Optional. General Sans, never Voyage (see `typography.md`). `--font-size-h6` at `--font-weight-heading`, `--text-primary`. `--space-3` above the table. |
| Header row | `--font-size-small` at `--font-weight-semibold`, `--text-primary`, on the table's own ground. No fill. |
| Body row | `--font-size-body` at `--font-weight-regular`, `--text-primary`. Every other row in `--surface-page`. |
| Row hover / focus | Yellow wash. See *Colour*. |
| Footer row | Optional, for a total or summary. Separated by a hairline, not the stripe. |

## Ground

1. A table normally sits inside the card from `components.md`: `--surface-raised`, `--radius-md`,
   `--space-4` padding, `--shadow-raised`. Not a second container.
2. Set it flat on `--surface-page` only where there is no surrounding card.
3. A table has no radius or shadow of its own.

## Colour

1. The stripe is `--surface-page` on every other row: Snow White in a white card, Night Blue in
   a dark one. No theme special case.
2. Hover and focus-within wash the row in Yellow: Night Blue on Yellow, the pair `colour.md`
   approves for section grounds and cards.
3. The wash is the table's only accent. The header stays on the table's own ground.
4. The wash hard-sets a palette colour instead of a role, like the primary button in
   `colour.md`. The row re-points its light-only roles locally, as `[data-surface="light"]`
   does:

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

5. No grey inside the wash. `--text-secondary` is not approved on any pastel; a secondary column
   takes `--text-primary` and is distinguished by size.
6. A control boundary needs 3:1 against its ground. Muted Grey on Yellow is 4.08:1.
7. Violet (2.91:1) and Pink (2.95:1) fail, so they never carry a row hover.
8. Lime Green passes (4.12:1) but stays off tables; its one job is the primary button.

## Header row

1. Column labels: `--font-size-small` at `--font-weight-semibold`.
2. Not uppercase, no tracking: `Start date`, not `DATE`.
3. A header cell aligns with its column: left for text, right for numbers.

## Body cells

1. Padding: `--space-2` vertical, `--space-3` horizontal, on every cell, including the first and
   last column. Never zero it to sit flush with a container edge.
2. Right-align numbers. Left-align everything else.
3. Never centre running text. Centre only a short status mark or a single icon.

## Protected terms

1. A protected term in a cell (any of the six in `layout.md`, e.g. `Domain-Driven Design`,
   `EventStorming`) never breaks: one `white-space: nowrap` span around the whole term.
2. If it does not fit, widen the column or drop a less important one.

## Row links

1. The link is a real `<a>` on the row's primary cell, styled per `colour.md`: `--text-primary`,
   underlined in `--link-underline`, full strength on hover and focus, colour unchanged.
2. The row washes Yellow at the same time.
3. If the whole row is the target, the row is the hit area and the anchor is what keyboard and
   screen reader land on, as with the checkbox row in `forms.md`.

## Sorting

1. The label sits inside a `<button>`. `aria-sort` (`none`, `ascending`, `descending`) sits on
   the `<th>`.
2. No underline at rest. Hover and focus add the underline at full `--text-primary`, as on a
   link. Same exception as the navigation item in `web.md`.
3. The active column shows `chevron-up` or `chevron-down` at `--icon-sm`, `--space-1` from the
   label, in the label's colour, pointing the current sort direction.
4. Inactive columns show no arrow. Never mark the active column by colour alone.

## Row selection

1. Use the checkbox from `forms.md` unchanged: 24px box, 1px `--border-control` at rest, filled
   `--text-primary` with a `--surface-raised` check when ticked, in a 44px-tall cell.
2. The header cell holds "select all", with `indeterminate` set when some rows are checked.
3. The stripe needs no change. The wash's role re-point (see *Colour*) keeps the box legible.

## Footer

1. Optional. Separated by a hairline; it takes no stripe.
2. It may stack lines: subtotal, tax, total.
3. Only the last line is `--font-weight-semibold`. The lines above are `--text-secondary`.

## Narrow screens

1. Never shrink text below `--font-size-small`. Never truncate a value. See `layout.md`.
2. Wrap a wide table in its own `overflow-x: auto` container. Check at 360px, per `web.md`.
3. The scroll wrapper has no border or shadow.
4. If a reader loses the row label while scrolling, pin the first column: `position: sticky;
   left: 0`, with an explicit `background` set to the row's own role.

## Loading and empty states

1. Loading: a `role="status"` message where the rows will be ("Loading…"). Never a spinner
   alone. See `web.md`.
2. Empty: one row spanning every column, in `--text-secondary`, saying what is missing and, if
   there is one, what to do.
3. Neither state carries the stripe.

## Dark mode

1. The Yellow hover wash is the one hard-set colour. Everything else is a role.
2. The table is correct under `prefers-color-scheme` and inside `[data-surface="dark"]` with no
   extra code.
3. A table never sits directly on Violet, Yellow or Pink as its ground.

## Checklist

1. At 360px every column is readable, or the table scrolls. See `web.md`.
2. Checked in both themes and inside a dark band.
3. Sortable headers, row links and row checkboxes reachable by keyboard, ring visible on each.
4. Protected terms whole, in a single `nowrap` span.
5. Every colour a role except the Yellow hover. No second hand-set colour.
6. No cell padding zeroed. No spacing value off the scale.
