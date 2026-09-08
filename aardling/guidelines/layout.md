# Layout

## Spacing

The scale is 8px steps. Nine of them are published, and every one has a job.

| Token | Value | Use for |
| --- | --- | --- |
| `--space-1` | 8px | Gap inside a control: between an icon and its label. |
| `--space-2` | 16px | Gap between closely related things: a label and its field, items in a list. |
| `--space-3` | 24px | Grid gutter up to 1400px. Paragraph rhythm in running prose. |
| `--space-4` | 32px | Grid gutter above 1400px. Padding inside a card. |
| `--space-6` | 48px | Vertical padding of a coloured section, below 720px. |
| `--space-8` | 64px | Top and bottom of a hero, below 960px. |
| `--space-10` | 80px | Vertical padding of a coloured section, from 720px. |
| `--space-12` | 96px | Vertical padding of a coloured section, from 960px. |
| `--space-18` | 144px | Top of a detail-page hero, from 960px. |

Page side margins are `--page-margin` below `--breakpoint-sm`, and the container above it.
Containers are in `tokens.json` under `container`, topping out at 1696px. `--container-xl`
was retired along with the 1140px breakpoint — `web.md` lists the six that remain, and the
convention that every query is `min-width`.

`--page-margin` is 28px, and it is the one published value in this brand that is not on the
8px ladder. It is inherited from the website and kept at 28px so nothing reflows; it is a
candidate to normalise to `--space-4` the next time the grid is opened. Until then, use the
token rather than the literal, so that decision has one place to happen.

Prefer the larger step when two look plausible. Cramped is the failure that keeps happening;
nobody has ever complained that an Aardling page had too much air.

Lay sibling groups out with flex or grid and `gap`. Not margins on children, and not
whitespace in the source.

## Radii

Three, and no more.

| Token | Value | Use for |
| --- | --- | --- |
| `--radius-sm` | 8px | Small surfaces: tooltips, tags, swatches, form controls. |
| `--radius-md` | 24px | Cards, panels, section blocks, image containers. |
| `--radius-pill` | 60px | Buttons and pills. |

## Controls

A button is `--radius-pill`, `--space-1` between an icon and its label, `--space-1` vertical
padding, and a height from the `--control-height-*` ladder. 44px is the minimum for anything
tappable, not a target to design down to.

| Size | Height | Side padding | Label | Icon |
| --- | --- | --- | --- | --- |
| Small | `--control-height-sm` 44px | `--space-2` 16px | `--font-size-small` | `--icon-sm` 16px |
| Medium | `--control-height-md` 52px | `--space-3` 24px | `--font-size-body` | `--icon-lg` 24px |
| Large | `--control-height-lg` 60px | `--space-4` 32px | `--font-size-body` | `--icon-lg` 24px |

Medium is the default. Large is for a hero call to action; small is for a toolbar, a card
footer, or anything sitting beside dense content.

Set the height with `min-height` and keep `--space-1` vertical padding, so a label that wraps
to two lines still breathes. On one line the height token governs at every breakpoint,
including the display steps where body copy reaches 22px: the label block is
`--line-height-h6` (1.3), which puts a medium button's content at 39.4px inside a 52px box and
44.6px at the widest step. The heights are therefore exact, not approximate.

**Button labels take `--line-height-h6`,** not `--line-height-body`. A button is one short
phrase, not a paragraph, and 1.5 leaves it loose in the pill.

### Icon buttons

Square: 44, 52 or 60 on a side, which `--radius-pill` renders as a circle. The icon is
`--icon-lg`, or `--icon-sm` at the small size, set on the height with the width left to
follow. An icon-only button always carries an accessible name — `web.md` holds that rule and
the short list of marks whose meaning survives losing their label.

### Groups

Gap is `--space-2`. The primary comes first in the source and stays first on screen, and there
is never more than one primary in a group. Below `--breakpoint-sm` a group in a hero stacks and
every button fills the column: a 44px pill with 24px of side padding does not fit two-up on a
360px screen without the labels wrapping.

**An action is a `<button>` and a destination is an `<a>`,** and they look identical. Never a
`div` with `role="button"`. `colour.md` says a link that is a call to action is a button; this
is the other half of it.

A form control takes the same 12px vertically, `--space-2` horizontally, and `--radius-sm`.
Which step separates a label from its field, a field from the next, and one fieldset from
another is in `forms.md`, along with everything else a form does.

## Never text on top of an image

Not over photographs, not over illustrations, and not with a scrim, a blur or a gradient
overlay to rescue it. The alternatives, in order of preference: text beside the image; text on
a solid panel adjacent to it; the image reduced to an accent.

The current website breaks this — `.hero-default--img` sets the h1 over a cover photograph —
and so do several mockups in the original brand guide. Those layouts are wrong and change; the
rule does not bend for them.

Two things may sit on gradient artwork, and nothing at all may sit on a photograph or an
illustration. The first is a mark — the logotype or the icon logo, knocked out. The second is
a single heading: the body face and never Voyage, `--font-size-h3` or larger, at most half the
width, set to one side, and never on the same gradient as a mark.

Running text is still never set on an image. A heading is one short phrase held inside a
measured region of a controlled field; body copy is neither, and no scrim, blur or gradient
overlay makes it acceptable. The knockout colours, the heading colours and the minimum sizes
are in `imagery.md`.

## Protected terms

A protected term sits entirely on one line. Every break opportunity inside it is suppressed,
at spaces and at hyphens alike.

- Domain-Driven Design
- EventStorming
- Event Sourcing
- Team Topologies
- Data Mesh
- Aardling

"Domain-Driven Design" is one concept and has to look like one — not "Domain-" then "Driven
Design", not "Domain-Driven" then "Design". Broken across lines it reads as two things.

In markup, wrap the whole term in a single span with `white-space: nowrap`. One span around
all of it covers the spaces and the hyphens at once:

```html
Scaling <span class="nowrap">Domain-Driven Design</span> to 800 engineers
```

In plain text, where there is no markup, use U+00A0 between the words *and* U+2011 for the
hyphen. Prefer the span wherever markup exists — U+2011 is missing from many fonts, including
Voyage, and falls back to a different face in the middle of the word.

The single-word terms have no break opportunity today. They are on the list so that a future
hyphenation setting cannot split them.

If a term does not fit the line, the line is wrong, not the term. Reflow the text, widen the
column, or set the type smaller. Never break the term to make it fit.
