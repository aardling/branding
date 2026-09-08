# Components

Four things nearly every Aardling page is made of: a hero, cards, callouts and the footer.
Each is assembled from tokens that already exist — this file adds no colour, no spacing step
and no radius. Where a rule already lives elsewhere it is referenced rather than restated:
approved pairs in `colour.md`, the spacing ladder, the radii and the button in `layout.md`,
the scale and the two faces in `typography.md`, and breakpoints, states, elevation, dark mode
and motion in `web.md`.

Navigation, forms and the page grid are not here. They are their own specifications, and this
file leaves a hole where each of them will go rather than guessing at it: the hero's action row
defers to the button rule in `layout.md`, the card grid sizes itself intrinsically until the
grid is written, and the footer carries a newsletter slot with no form in it.

Everything below is described phone first, as `web.md` requires. A width in a table is the
width at which something changes; below it, the row above still holds.

## Hero

The first screen of a page: what this page is, in one heading, on flat ground.

### Which hero

| Hero | Where | Top | Bottom |
| --- | --- | --- | --- |
| Page hero | Home, a landing page, the top of an index | `--space-8`, `--space-12` from 960px | the same |
| Detail hero | An article, an event, a course, a person | `--space-8`, `--space-18` from 960px | `--space-8`, `--space-12` from 960px |
| Cover | A title card, event artwork, a social image | see below | see below |

The detail hero's deeper top is the one place `--space-18` is used. A detail page opens under
the site header with nothing above the title but air, and 144px is what makes that read as
deliberate rather than as a gap.

### Anatomy

Eyebrow, heading, standfirst, actions, artwork — in that order on the phone, and in that order
in the markup at every width. From 960px the artwork may move beside the text column; it never
moves above it.

| Part | Setting |
| --- | --- |
| Eyebrow | `--font-size-small`, uppercase, `letter-spacing: 0.12em`, `--font-weight-semibold`. `--text-secondary` on `--surface-page`; `--text-primary` on a pastel. Optional. |
| Heading | The page's h1, and its one Voyage setting. `--font-size-h1`, `--line-height-display`, `text-wrap: balance`. |
| Standfirst | `--font-size-h6` at `--font-weight-light`, `--line-height-body`, `text-wrap: pretty`. Two or three sentences. Optional. |
| Actions | Buttons per `layout.md`. One primary, at most one secondary beside it. A flex row, `--space-2` gap, wrapping rather than stretching. Optional. |
| Artwork | Its own container, `--radius-md`, a declared `aspect-ratio`, `object-fit: cover`. A gradient, an illustration or a photograph. Optional. |

| Between | Gap |
| --- | --- |
| Eyebrow and heading | `--space-2` |
| Heading and standfirst | `--space-3` |
| Standfirst and actions | `--space-4` |
| Text column and artwork, below 960px | `--space-6` |
| Text column and artwork, from 960px | the grid gutter: `--space-3`, `--space-4` from 1400px |

The text column is at most `--container-md` wide, whatever the container around it is. A
standfirst measured across 1300px is a line nobody finishes.

### Ground

`--surface-page`, or one flat pastel: Violet, Yellow or Pink.

**Not Lime Green.** Its one approved job is the primary button. A hero on Lime Green leaves the
button nothing to be, and the call to action disappears into the ground it sits on.

On a pastel, everything in the hero is Night Blue — there is no approved grey on any pastel, so
the eyebrow is `--text-primary` too, separated by size, weight and case rather than by colour.
A pastel hero on a dark page carries `data-surface="light"`.

### The heading never sits on artwork

Not on a photograph, not on an illustration, not on a gradient.

The first two are the rule in `layout.md`, and no scrim rescues them. The gradient is the
narrower case: `imagery.md` licenses a single heading on a gradient, and licenses it for the
body face at `--font-size-h3` or larger, because the grain interferes with exactly the
hairlines Voyage is drawn in. A page hero's h1 is the page's Voyage setting. So the licence and
the hero heading never meet, and a hero with artwork puts the artwork beside the text or below
it.

### Cover

The exception, and it is not a page hero. A title card, event artwork, a social image: a
full-bleed gradient carrying one heading and nothing else. Every constraint comes from
`imagery.md` — General Sans at `--font-weight-heading`, `--font-size-h3` or larger, at most
half the width, set to one side, and never on the same gradient as a mark.

No eyebrow, no standfirst and no buttons on the artwork. If the cover needs them, they sit on
flat ground below it. Never a photograph or an illustration.

### At 360px

The heading is 36px inside `--page-margin`. Check it wraps to no more than three lines, that
the protected terms hold whole, and that the artwork is no taller than 4:3 — a square crop
pushes the standfirst off the screen.

## Cards

A card is one of several: a course, an event, a case, an article. A single thing on a page that
happens to have a border is a panel, and it does not need to look like a card.

| Property | Value |
| --- | --- |
| Ground | `--surface-raised` |
| Radius | `--radius-md` |
| Padding | `--space-4` |
| Elevation | `--shadow-raised` — which is `none` on the dark ground, where `--surface-raised` does that job instead |
| Text | `--text-primary`; metadata `--text-secondary` |
| Border | None. The ground, the radius and the padding are what separate a card |

### Anatomy

| Part | Setting |
| --- | --- |
| Media | Full bleed to the card's edge, top corners `--radius-md`, a declared `aspect-ratio` — 3:2 — and `object-fit: cover`. A photograph, an illustration or a gradient. Optional. |
| Eyebrow | `--font-size-small`, uppercase, `letter-spacing: 0.12em`, `--font-weight-semibold`, `--text-secondary`. Optional. |
| Title | General Sans at `--font-weight-heading`, `--font-size-h5`, `--line-height-display`, `text-wrap: balance`. |
| Body | `--font-size-body`, `text-wrap: pretty`. Three lines is plenty. Optional. |
| Metadata | `--font-size-small`, `--text-secondary`. Date, duration, place. Sits at the foot. Optional. |

Gaps are `--space-2` between the eyebrow, the title and the body, and `--space-3` above the
metadata. The metadata takes `margin-top: auto` in a flex column, so the feet of a row of cards
line up whatever the titles do.

**A card title is never Voyage.** Voyage is spent once on a page, and cards arrive in threes
and fours; four Voyage titles in a row spend it four times and turn the display face into
decoration.

### A card on a pastel

Violet, Yellow or Pink — not Lime Green, for the reason the hero gives.

**Every word on a pastel card is Night Blue.** No grey is approved on any pastel, so the
eyebrow and the metadata are `--text-primary` as well, distinguished by size, weight and case.
If a card genuinely needs grey secondary text, it is a `--surface-raised` card; choose the
ground from what the card carries rather than the other way round.

**No shadow on a pastel card.** It is a coloured region, not a raised one, and Night Blue
shadow under a pastel reads as a smudge.

Inside a dark band or on a dark page, a pastel card carries `data-surface="light"` — otherwise
its focus ring inherits Snow White and measures 1.69 against Violet.

### A card that is a link

The whole card is the hit area. The title carries the `<a>`, and a stretched pseudo-element
covers the card:

```css
.card { position: relative; }
.card a::after { content: ""; position: absolute; inset: 0; }
```

**Hover changes the title's underline and nothing else** — 1px to 3px at `--duration-fast`,
which is the link rule in `colour.md`. The card does not lift, grow, or change ground: `web.md`
rules out movement, and there is no approved hover ground for a card.

Focus draws the ring around the card rather than around the title:

```css
.card:has(a:focus-visible) { outline: 3px solid var(--focus-ring); outline-offset: 2px; }
.card a:focus-visible { outline: none; }
```

That is the one shape `outline: none` is allowed to take: the replacement is in the same block
and in view.

Anything else clickable inside the card sits above the stretched element with `position:
relative`. A card that needs two destinations usually needs one.

### Cards together

- Equal columns, `align-items: stretch`, so a row is one height.
- Gutter `--space-3`, `--space-4` from 1400px — the grid gutter in `layout.md`.
- Column counts per breakpoint belong to the page grid, which is not written yet. Until it is,
  size the track by the content: `repeat(auto-fit, minmax(280px, 1fr))`. `web.md` already
  prefers that to a new breakpoint.
- One row, one ground. A pastel card among white ones is a promotion, so promote exactly one or
  none.
- A card never contains another card.

### At 360px

A 280px card leaves 216px of text between its `--space-4` sides. Check the title wraps to no
more than three lines and that the protected terms hold.

## Callouts

A passage that has to be read differently from the one above it — a caveat, a prerequisite,
what a page assumes of its reader. Two shapes, and the difference between them is width.

### The panel

Inline, in the flow of a column.

| Property | Value |
| --- | --- |
| Ground | `--colour-violet`. `colour.md` gives Violet the callout; Yellow and Pink are section grounds and cards |
| Radius | `--radius-md` |
| Padding | `--space-4` |
| Width | The measure of the column it interrupts, and no wider |
| Text | Night Blue, as `--text-primary` under `data-surface="light"` |
| Elevation | None |
| Icon | Optional. One mark from `assets/icons/` at `--icon-lg`, on the title's line, `--space-1` from it. Recolour by setting `color`, never a `fill` attribute |

A title is `--font-size-h6` at `--font-weight-heading`; the body is `--font-size-body`; the gap
between them is `--space-2`. Links inside a callout are the link rule unchanged — Night Blue,
underlined, thickening on hover, at 9.21 against Violet.

**No grey inside a callout.** `--text-secondary` is not approved on Violet, so there is no fine
print, no caption and no metadata in one. A callout that needs fine print is too long to be a
callout.

**`data-surface="light"` is not optional.** Violet is the same colour in both themes, so what
sits on it has to be too, and the roles cannot work that out on their own. Without the
attribute, a focus ring inside the callout is Snow White on Violet: 1.69, invisible.

**One at a time.** Two callouts in a row are a list. Set them as one.

### The band

A coloured section spanning the page.

| Property | Value |
| --- | --- |
| Ground | Violet, Yellow or Pink — or Night Blue, via `data-surface="dark"` |
| Vertical padding | `--space-6`, `--space-10` from 720px, `--space-12` from 960px |
| Horizontal | `--page-margin` below 540px, the container above it |
| Radius | None. A band is the width of the page; a radius belongs to something inset from it |
| Text | Night Blue on a pastel; the roles under `data-surface="dark"` on Night Blue |

- **Never two coloured bands touching.** Put a `--surface-page` section between them.
  Consecutive bands read as a colour chart, and then neither one is emphasis.
- A pastel band on a dark page carries `data-surface="light"`, for the reason the panel does.
- Cards inside a pastel band are `--surface-raised`. White on a pastel is a ground against a
  ground — it needs the radius and the padding to read as a card, exactly as
  `--colour-dark-surface` does on Night Blue.

## Footer

One footer, on every page, and it declares its own ground:

```html
<footer data-surface="dark"> … </footer>
```

That is the entire mechanism. The attribute sets all nine roles to their dark values, so the
footer is the same in both themes and nothing inside it hand-sets a colour.

| Property | Value |
| --- | --- |
| Ground | `--surface-page` — Night Blue, under the attribute |
| Vertical padding | `--space-6`, `--space-10` from 720px, `--space-12` from 960px |
| Horizontal | `--page-margin` below 540px, the container above it |
| Text | `--text-primary`; group headings and the legal line `--text-secondary`, at 6.57 |

### Order, which is the phone's order

1. The logotype
2. One sentence saying what Aardling does — two lines at most
3. The newsletter signup
4. Link groups
5. A hairline rule
6. The legal line

Gaps: `--space-4` between the logotype and the sentence, `--space-6` before the link groups,
`--space-6` above the rule, `--space-3` below it.

From 720px the link groups sit in columns — `repeat(auto-fit, minmax(180px, 1fr))` at the grid
gutter. From 960px the logotype block and the link groups sit side by side, the logotype block
no wider than `--container-sm`.

**The newsletter is a slot here, not a specification.** Its field, its label, its help text and
its validation are the form specification's, and this file does not pre-empt them. What the
footer fixes is where it goes and that it comes before the links.

### The logotype

Inline `assets/logos/aardling-logotype.svg` and set `color: var(--text-primary)`. The master is
drawn in `currentColor`, so it takes Snow White from the role. A lockup is for places that
cannot set `color`; a web page can.

Not below 96px wide — its flat-ground floor in `logos.md`. 160px to 200px is the comfortable
range for a footer. Clear space on all four sides is the height of the icon logo, which at
180px wide is about 31px. Nothing sits inside it.

### Links

- Rest, hover and focus are the link rule in `colour.md`, unchanged: `--text-primary`,
  underlined, the underline thickening to 3px. A footer link is a link.
- Whether a *navigation* link keeps its underline is the navigation specification's question.
  Until that is answered the footer follows the prose rule rather than inventing a second one.
- Every link is at least 44px high: `min-height: 44px`, and centre the label in it. An 18px
  link at 1.5 line height with `--space-1` above and below measures 43px — near enough to be
  wrong. Set the minimum; do not compute it.
- Group headings are `--font-size-small`, uppercase, `letter-spacing: 0.12em`,
  `--font-weight-semibold`, `--text-secondary`. A group heading is not a link.
- An icon-only link — a social account — carries an accessible name and sits in a 44px box,
  with the mark at `--icon-lg` in `--text-primary`.

### The rule and the legal line

The rule is 1px of `--border-hairline`, which under the dark roles is `--colour-dark-hairline-grey`
at 1.65 — a seam, not a line to read.

The legal line is `--font-size-small` in `--text-secondary`: the company name, the VAT number,
the year. Links inside it — privacy, terms — are `--text-primary` and underlined, so they stay
visible as links against the grey.

### What the footer does not do

- No pastel panel without `data-surface="light"`.
- No shadow. `--shadow-raised` is `none` on the dark ground, and nothing in a footer floats.
- No dark section directly above it. Two dark regions meeting produce one long dark region with
  an invisible seam; put a `--surface-page` section between them, or let that section be the
  footer.

## Before any of this ships

- 360px first, then 540, then 960 (`web.md`).
- Both themes, switched at the operating system — and every pastel region carrying
  `data-surface="light"`.
- Keyboard only: every link, button and card reachable, the ring visible on each, and nothing
  reachable by hover alone.
- Protected terms whole, in a single `nowrap` span (`layout.md`).
- Every colour a role, never a palette colour.
- No spacing value that is not a step on the ladder.
