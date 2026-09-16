# Layout

## Spacing

| Token | Value | Use for |
| --- | --- | --- |
| `--space-1` | 8px | Gap inside a control: icon to label. |
| `--space-2` | 16px | Closely related things: label and field, list items. |
| `--space-3` | 24px | Grid gutter up to 1400px. Paragraph rhythm in prose. |
| `--space-4` | 32px | Grid gutter above 1400px. Card padding. |
| `--space-6` | 48px | Coloured section vertical padding, below 720px. |
| `--space-8` | 64px | Hero top and bottom, below 960px. |
| `--space-10` | 80px | Coloured section vertical padding, from 720px. |
| `--space-12` | 96px | Coloured section vertical padding, from 960px. |
| `--space-18` | 144px | Detail-page hero top, from 960px. |

1. The scale is 8px steps. Use only these nine.
2. Page side margins are `--page-margin` below `--breakpoint-sm`, and the container above it.
3. Containers are in `tokens.json` under `container`, up to 1696px.
4. `--container-xl` and the 1140px breakpoint are retired. See `web.md` for the six that
   remain; every query is `min-width`.
5. `--page-margin` is 28px, the one published value off the 8px ladder. Use the token, not the
   literal. It is a candidate to normalise to `--space-4` when the grid is next opened.
6. When two steps look plausible, take the larger.
7. Lay sibling groups out with flex or grid and `gap`. Not margins on children, not whitespace
   in the source.

## Radii

| Token | Value | Use for |
| --- | --- | --- |
| `--radius-sm` | 8px | Tooltips, tags, swatches, form controls. |
| `--radius-md` | 24px | Cards, panels, section blocks, image containers. |
| `--radius-pill` | 60px | Buttons and pills. |

1. Three radii. No others.

## Controls

| Size | Height | Side padding | Label | Icon |
| --- | --- | --- | --- | --- |
| Small | `--control-height-sm` 44px | `--space-2` 16px | `--font-size-small` | `--icon-sm` 16px |
| Medium | `--control-height-md` 52px | `--space-3` 24px | `--font-size-body` | `--icon-lg` 24px |
| Large | `--control-height-lg` 60px | `--space-4` 32px | `--font-size-body` | `--icon-lg` 24px |

1. A button is `--radius-pill`, `--space-1` between icon and label, `--space-1` vertical
   padding, and a height from the `--control-height-*` ladder.
2. 44px is the minimum for anything tappable, not a target to design down to.
3. Medium is the default. Large: a hero call to action. Small: a toolbar, a card footer, or
   beside dense content.
4. Set the height with `min-height`, so a label that wraps to two lines keeps its padding.
5. Button labels take `--line-height-h6` (1.3), not `--line-height-body`.
6. On one line the height token governs at every breakpoint: a medium button's content is 39.4px
   inside 52px, 44.6px at the widest step. The heights are exact.

### Icon buttons

1. Square: 44, 52 or 60px a side. `--radius-pill` makes it a circle.
2. The icon is `--icon-lg`, or `--icon-sm` at the small size. Set it on the height; the width
   follows.
3. An icon-only button always carries an accessible name. See `icons.md`, including the marks
   whose meaning survives losing their label.

### Groups

1. Gap is `--space-2`.
2. The primary comes first in the source and stays first on screen.
3. At most one primary per group.
4. Below `--breakpoint-sm`, a group in a hero stacks and every button fills the column.
5. An action is a `<button>`; a destination is an `<a>`. They look identical.
6. Never a `div` with `role="button"`.
7. A link that is a call to action is a button. See `colour.md`.

### Form controls

1. 12px vertical padding, `--space-2` horizontal, `--radius-sm`.
2. Spacing between label, field and fieldset, and everything else a form does: see `forms.md`.

## Text on images

1. Never set text on top of an image: not over photographs, not over illustrations, not with a
   scrim, blur or gradient overlay.
2. Alternatives, in order of preference: text beside the image; text on a solid panel adjacent
   to it; the image reduced to an accent.
3. The website's `.hero-default--img` (h1 over a cover photograph) and several mockups in the
   original brand guide break this. Those layouts are wrong and change.
4. Nothing may sit on a photograph or an illustration.
5. Two things may sit on gradient artwork: a mark (the logotype or the icon logo, knocked out),
   or a single heading.
6. A heading on a gradient: the body face, never Voyage; `--font-size-h3` or larger; at most
   half the width; set to one side; never on the same gradient as a mark.
7. Running text is never set on an image, gradient included.
8. Knockout colours, heading colours and minimum sizes: see `imagery.md`.

## Protected terms

- Domain-Driven Design
- EventStorming
- Event Sourcing
- Team Topologies
- Data Mesh
- Aardling

1. A protected term sits entirely on one line. Suppress every break opportunity inside it, at
   spaces and at hyphens.
2. Not "Domain-" then "Driven Design"; not "Domain-Driven" then "Design".
3. In markup, wrap the whole term in one span with `white-space: nowrap`:

   ```html
   Scaling <span class="nowrap">Domain-Driven Design</span> to 800 engineers
   ```

4. In plain text, use U+00A0 between the words *and* U+2011 for the hyphen.
5. Prefer the span wherever markup exists. U+2011 is missing from many fonts, Voyage included,
   and falls back to a different face mid-word.
6. The single-word terms are listed so a future hyphenation setting cannot split them.
7. If a term does not fit the line, change the line: reflow the text, widen the column, or set
   the type smaller. Never break the term.
