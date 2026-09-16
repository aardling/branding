# Icons

1. The marks in `assets/icons/` are stroked SVG in `currentColor`.
2. Recolour a mark by setting `color` on a parent. Never edit a file; never add a `fill`
   attribute.
3. One family: interface marks, 16×16, stroke 1.25, butt caps, no fill, for use in controls.
4. No mark is decoration. A section that wants an accent takes space, a rule or a ground colour.

## Curve

1. Every arrowhead is the same cubic Bézier, at two scales, in every generated arrowhead and in
   `download`.
2. For the square a barb crosses, of side *s*: the stroke leaves its outer end perpendicular to
   the shaft, control point at 0.36364·*s* (4/11).
3. It arrives at the tip tangent to the shaft, control point 0.68182·*s* (7.5/11) back along it.
4. Build new marks from that curve: a ring is four of it closed, a rounded rectangle four at the
   corners, a chevron two meeting at a point.
5. Draw new interface marks on 16×16 at stroke 1.25.
6. `scripts/build-icons.mjs` generates the interface marks from the curve. It is deterministic:
   re-running is safe, and a diff after a run means an input changed.
7. Redraw in the script, not in a file.

## Groups

1. `assets/icons/groups.json` places every mark in exactly one group, named for what the mark
   does, in the order the printed guide shows them.
2. It ships in the package. Anything offering a choice of marks can use the same grouping.
3. Add a new mark to a group in the same change that adds the mark.
4. The guide build refuses a mark no group names, a group naming a mark with no file, a mark in
   two groups, and a mark the brand skill does not name.
5. `npm publish` runs that check, so an ungrouped mark cannot be published.

## Aliases

1. **back**, **forward** and **next** are `arrow-left` and `arrow-right` under other names.
2. They have no asset files. Do not add any.

## Refresh

1. `refresh` is the one mark whose point is not made from the brand curve.
2. Its head is a right-angle bracket and its gap sits on the right, both from a supplied
   reference. The arc is still the brand ring.
3. Do not move the gap to the top. Do not swap the bracket for a barbed head. Both have been
   tried: the brand arrowhead throws the mass backwards at the end of an arc, and its inner barb
   merges with the ring.
4. The source of the composition is a Streamline icon. Check its licence before publishing this
   package anywhere it has not been published already.

## Sizes

| Token | Value | Use for |
| --- | --- | --- |
| `--icon-sm` | 16px | Inline with `--font-size-small`; dense controls. |
| `--icon-md` | 20px | Inline with body copy. The default. |
| `--icon-lg` | 24px | Buttons, navigation items, list bullets. |

1. No size above 24px. A large standalone graphic is imagery. See `imagery.md`.
2. Set `height` and leave `width: auto`. Not every mark is square.
3. `download` is not on the 16×16 grid: it carries its own intrinsic dimensions. At the same
   pixel height it looks lighter than its neighbours. Start from the sizes above, place it
   beside its text and adjust by eye.
4. Every other mark, including all four `arrow-*` marks, shares the grid and scales together.

## Not allowed

1. An icon is never the only label. An icon-only control needs an accessible name.
2. If the meaning is not obvious to someone outside our field, add visible text as well. See
   `voice.md` on jargon.
3. Only these marks may stand alone on a control: `close`, `menu`, `search`, `plus`,
   `chevron-*`, `arrow-left`, `arrow-right`, `more-horizontal`, `more-vertical`, `play`,
   `pause`, `download`, `upload`. Everything else takes a visible label.
4. A tooltip does not replace a label: a thumb cannot hover.
5. No emoji as icons. An emoji does not take `currentColor`, does not match the stroke weight,
   and renders differently per platform. Where the set has no mark, use text.
6. No cliché metaphors. Draw functional marks only — an action or a thing: back, download,
   search, a file, a clock.
7. Never a picture standing in for an abstract concept: a lightbulb for an idea or a strategy, a
   rocket for a launch, a gear for engineering, a target for a goal, a handshake for a
   partnership, a puzzle piece for fit, a compass or a chess piece for strategy. The concept
   stays in the words.
