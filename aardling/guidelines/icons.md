# Icons

The marks in `assets/icons/` are stroked SVG filled with `currentColor`. Recolour them by
setting `color` on a parent — never by editing a file, and never by adding a `fill` attribute.

One family. Every mark is an **interface** mark: 16×16, stroke 1.25, butt caps, no fill, drawn
for use in controls. Nothing in this set is a decoration: a section that seems to want an
accent takes space, a rule or a ground colour instead.

## The set has one curve

Every arrowhead in the directory is the same cubic Bézier. Not a family of similar curves — the
identical curve, at two different scales, in every generated arrowhead and in `download`.

Take the square a barb crosses, of side *s*. The stroke leaves its outer end **perpendicular**
to the shaft, with its control point at **0.36364·s**. It arrives at the tip **tangent** to the
shaft, with its control point at **0.68182·s** back along it. Those are 4/11 and 7.5/11, and
they hold to five decimal places in every barb already drawn.

So a mark is slow to leave and fast to arrive: it turns away from its start gently and flattens
into the shaft. That asymmetry is what makes the set look drawn rather than plotted, and it is
what anything new is built from — a ring is four of that curve closed, a rounded rectangle is
four of it at the corners, a chevron is two of it meeting at a point.

**New interface marks are drawn on 16×16 at stroke 1.25.** `download` is not on that grid and
carries its own intrinsic dimensions, so set to the same pixel height as its neighbours it will
not have quite the same apparent weight. Everything else — including all four `arrow-*` marks —
shares the one grid and matches exactly.

`scripts/build-icons.mjs` generates the interface marks from the curve. It is deterministic, so
re-running is safe and a diff after a run means an input changed. Redraw there, not in a file.

## Groups

`assets/icons/groups.json` places every mark in exactly one group, named for what the mark does,
in the order the printed guide shows them. It ships in the package, so anything that offers a
choice of marks can use the same grouping.

**A new mark goes into a group in the same change that adds it.** The guide's build refuses a
mark that no group names, a group that names a mark with no file, and a mark in two groups —
and because `npm publish` runs that check, an ungrouped mark cannot be published. The build also
refuses a mark the brand skill does not name, so the list agents read cannot fall behind the set.

## Names without files behind them

**back**, **forward** and **next** are `arrow-left` and `arrow-right` under other names. There
are no assets for them: three more files would be three ways to say one thing and three chances
to drift apart.

## Where the curve is not used

`refresh` is the one mark whose point is not made from the brand curve. Its head is a
right-angle bracket and its gap sits on the right, both taken from a supplied reference; the arc
is still the brand ring. The brand's own arrowhead was tried there three times and does not
survive being put on a curve — its barbs leave perpendicular and arrive tangent, which reads as
swept on a straight shaft but throws the visual mass backwards at the end of an arc, and the
inner barb folds inside the ring and merges with it. Do not "correct" the gap onto the top or
swap the bracket for a barbed head; both have been tried.

The source of that composition is a Streamline icon. **Check what its licence allows before
this package is published anywhere it has not been published already.**

## Sizes

| Token | Value | Use for |
| --- | --- | --- |
| `--icon-sm` | 16px | Inline with `--font-size-small`, and inside dense controls. |
| `--icon-md` | 20px | Inline with body copy. The default. |
| `--icon-lg` | 24px | Buttons, navigation items, list bullets. |

**There is no size above 24px.** A mark in this set sits beside text; if a design wants a large
graphic on its own, that is imagery, and `imagery.md` covers it.

**Set the height and let the width follow.** Not every mark is square — `download` is not —
so constraining the width distorts it or crops the container. Set `height` and leave
`width: auto`.

**One mark is not drawn on the common grid.** `download` predates the generator and carries
its own intrinsic dimensions, so set to the same pixel height as its neighbours it will not
have the same apparent weight. The sizes above are a starting point for it, not an answer: put
the mark beside the text it belongs to and adjust by eye until it matches. Everything else,
including all four `arrow-*` marks, is 16×16 at stroke 1.25 and scales together.

## What a mark may not do

**An icon is never the only label.** A control that carries an icon and no visible text needs
an accessible name — and if the meaning is not obvious to someone outside our field, it needs
visible text as well. That is the same judgement `voice.md` asks for about jargon.

In practice that leaves a short list of marks that may stand alone on a control: `close`,
`menu`, `search`, `plus`, `chevron-*`, `arrow-left`, `arrow-right`, `more-horizontal`,
`more-vertical`, `play`, `pause`, `download` and `upload`. Everything else takes a visible
label. A tooltip does not rescue an icon-only control — a thumb cannot hover.

**No emoji as icons.** An emoji is not part of the set. It will not take `currentColor`, it
will not match the stroke weight of the marks beside it, and it renders differently on every
platform. Where a mark is needed and the set has none, use text.

**No cliché metaphors.** Functional marks are what the set is for — an arrow that means back,
a download that means download. What we do not draw is a picture standing in for an abstract
concept: a lightbulb for an idea or a strategy, a rocket for a launch, a gear for
engineering, a target for a goal, a handshake for a partnership, a puzzle piece for fit, a
compass or a chess piece for strategy. They are stock, and they carry no meaning the sentence
beside them is not already carrying. Every mark in this set names an action or a thing — back,
download, search, a file, a clock — so the concept stays in the words and the mark stays a
mark.
