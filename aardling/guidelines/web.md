# Web

What only a browser needs to know. The rules that hold in every medium stay where they are:
spacing, radii, protected terms and the image rule in `layout.md`, type sizes in
`typography.md`, approved colour pairs in `colour.md`. Nothing here contradicts those; it
says how they behave on a screen.

## Mobile first

**The naked value is the phone.** Everything `tokens.css` declares in `:root` — type sizes,
spacing, containers, the page margin — is what a 360px screen gets. Every media query in the
brand is `min-width`, and each one restates only what actually changes at that width.

This is a reversal. Until now `:root` held the desktop sizes and a `max-width` query shrank
them, which meant the phone was described as a subtraction from a screen nobody in the office
was designing on. The values did not change; the direction did.

**Write stylesheets the same way.** The base rule is the narrow layout. Wider screens add to
it. A `max-width` query in an Aardling stylesheet is a mistake unless it is switching off
something that genuinely only exists on large screens.

**Design at 360px before anything else.** Not 375, not 390 — 360px is the narrowest width in
common use, and a layout that survives it survives the rest. Check the hero, the navigation
and any table at that width before looking at a desktop viewport.

Anything tappable is at least 44px high, everywhere, on every screen. That rule is in
`layout.md` and it is not a phone rule; a pointer is not much more precise than a thumb.

## Breakpoints

Six, and each one has a reason to exist.

| Token | Value | What changes there |
| --- | --- | --- |
| `--breakpoint-sm` | 540px | h1 to h4 step up from the phone column. `--page-margin` gives way to the container. |
| `--breakpoint-md` | 720px | Vertical section padding goes from `--space-6` to `--space-10`. |
| `--breakpoint-lg` | 960px | The full desktop type scale. Section padding to `--space-12`, detail-page hero top to `--space-18`. |
| `--breakpoint-xxl` | 1400px | Grid gutter goes from `--space-3` to `--space-4`. |
| `--breakpoint-xxxl` | 1728px | Display step. The whole type scale rises, body to 20px. No layout change. |
| `--breakpoint-mega` | 1920px | Display step. Type rises again, body to 22px. No layout change. |

The last two are **display steps**: they exist so a 27-inch monitor does not set 18px body
copy across a wide column. They move type and nothing else. Do not hang a layout change on
them.

**A custom property cannot be read inside a media query.** `@media (min-width:
var(--breakpoint-lg))` does not work in any browser and fails silently. The
`--breakpoint-*` properties exist so the values can be read from JavaScript and so
`tokens.json` and `tokens.css` stay two views of one truth — not so they can be used in a
query. In a query, write the literal, and keep it equal to the token.

**1140px is retired.** It was declared as `xl` and never used by anything, and its container
`--container-xl` (1116px) went with it. A consumer that referenced either needs to move to
`--container-lg` or `--container-xxl`.

**Six is the whole set.** A layout that seems to need a seventh usually needs a different
layout — an intrinsic one, sized by its content rather than by the viewport. Reach for
`minmax()`, `auto-fit` and `clamp()` on the component before adding a breakpoint to the brand.

## States

Anything a reader can interact with has five states: rest, hover, focus, pressed and
disabled. `colour.md` holds the colours for all of them — the focus ring, the link table, the
form-control table. What follows is the behaviour.

**Focus is a requirement; hover is a courtesy.** Anything that reacts to a pointer reacts to
the keyboard the same way. A reader on a phone, a trackpad or a switch has to reach every
state a mouse can, and hover is the one state a touchscreen cannot produce at all — so no
information, no control and no navigation may exist only in a hover state.

**Never write `outline: none` without a replacement in the same rule.** The ring is three
pixels of `--focus-ring`, offset two, on `:focus-visible`. Using `:focus-visible` rather than
`:focus` is what keeps the ring off a mouse click while keeping it for a keyboard; the browser
decides, and it decides better than we would.

**A state change is a colour change, at `--duration-fast`.** Buttons, links and cards do not
move, grow or lift on hover. A link's underline stays 1px throughout; hover brings it from
`--link-underline`, a 50% tint of `--text-primary`, to full colour — see `colour.md`.

**The pressed state is the hover state.** The brand has one extra colour for interaction,
`--colour-hover-green`, and it serves hover and focus on the primary button. There is nothing
below it for `:active`, and a control that has visibly reacted twice already does not need a
third appearance.

**A form control has a sixth state: wrong.** When it appears is a question about time rather
than colour, and `forms.md` answers it — along with help text, fieldsets, error messages and
the newsletter signup.

## Elevation

Two shadows, and both are cast in Night Blue rather than black. A neutral black shadow over a
warm ground reads as dirt rather than depth.

| Token | Value | Use for |
| --- | --- | --- |
| `--shadow-raised` | `0 2px 8px rgba(24, 28, 47, 0.08)` | A card or panel at rest. |
| `--shadow-overlay` | `0 8px 32px rgba(24, 28, 47, 0.16)` | Something genuinely floating: a menu, a dialog, a sticky bar. |

**Two, and no more.** A third step is a request for a hierarchy the page does not have. If two
things need to be distinguished and neither is floating, distinguish them with ground colour,
radius and space — which is how `--surface-raised` already lifts a card off the page.

**On the dark ground `--shadow-raised` is `none`.** A shadow under a dark card on a dark page
is invisible, so `--colour-dark-surface` does that job instead. Only `--shadow-overlay`
survives into dark, deepened to `rgba(0, 0, 0, 0.48)` — the one place black is correct,
because nothing lighter is darker than the ground it falls on.

## Dark mode

**The reader's operating system decides.** One `prefers-color-scheme: dark` block re-points
the ten roles in `colour.md`, and that is the whole mechanism. There is no toggle in the
header, nothing to remember between visits, and no third state to test.

The palette does not move. `--colour-snow-white` is Snow White in both themes; it is
`--text-primary` that resolves differently. A component that references roles is already
correct in dark mode and needs no dark-mode CSS of its own. A component that references
palette colours directly is the bug.

**An inverted section is dark mode, scoped.** The footer and the dark bands that already exist
are the same ten roles set on a container rather than on `:root`, which `tokens.css` ships
as `[data-surface="dark"]`. Use it instead of hand-setting colours, and an inverted section
stays correct when the theme changes underneath it.

```html
<footer data-surface="dark"> … </footer>
```

**A pastel section on a dark page declares itself light.** The pastels are the same in both
themes, so what sits on them has to be too — and the roles cannot infer that, because the
container changed the ground without changing the theme. Left alone, a focus ring inside a
Violet callout on a dark page inherits Snow White and measures 1.69 against the Violet.

```html
<section data-surface="light"> … </section>
```

`light` and `dark` are the only two values `data-surface` takes, and it is the only attribute
this brand styles. It is not a place to add `data-surface="violet"`: a pastel is a background
on a section, not a surface role.

**Artwork does not have a dark variant.** The four gradients and the illustrations are the
same files in both themes, and the pastel sections are unchanged — Night Blue on Violet
measures 9.21 whatever surrounds it. `imagery.md` is unaffected by any of this.

**Check both themes before calling anything finished.** Switch the operating system setting;
do not rely on a browser devtools override, which misses the `[data-surface]` case entirely.

## Motion

Two durations and one easing. That is the entire vocabulary.

| Token | Value | Use for |
| --- | --- | --- |
| `--duration-fast` | 120ms | Colour changes: hover, focus, active. Anything that does not move. |
| `--duration-base` | 240ms | Anything that moves, resizes or fades — a disclosure, a drawer, a menu. |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Every transition, both durations. |

One easing curve, used everywhere, is what makes a set of unrelated components feel like one
site. It starts quickly and settles slowly, which reads as responsive rather than sluggish.

**Reduced motion is not optional.** `tokens.css` collapses both durations to `1ms` under
`prefers-reduced-motion: reduce`, so a transition written against the tokens already honours
it and needs no extra code. Anything that animates *without* the tokens — a keyframe
animation, a scroll-linked effect, an autoplaying video, a carousel that advances itself —
is not covered, and has to be stopped by hand in that query.

**The page arrives at rest.** Nothing fades or slides in on load, and nothing waits on a
scroll observer to become readable. A reader who lands mid-page, a screenshot and a slow
connection all get the same finished page.

**Animate `transform` and `opacity`, nothing else.** Width, height, `top` and `left` are laid
out on every frame and stutter on the phones our readers actually carry.

## Icons

The marks in `assets/icons/` are stroked SVG filled with `currentColor`. Recolour them by
setting `color` on a parent — never by editing a file, and never by adding a `fill` attribute.

One family. Every mark is an **interface** mark: 16×16, stroke 1.25, butt caps, no fill, drawn
for use in controls.

The brand once carried a second, decorative family — circles, ovals, sparkles and stars at
drawing scale, some of them filled, used as section accents. Those marks have been withdrawn
and will not come back. A section that seems to want an accent takes space, a rule or a ground
colour instead; nothing in this set is a decoration.

### The set has one curve

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

### Names without files behind them

**back**, **forward** and **next** are `arrow-left` and `arrow-right` under other names. There
are no assets for them: three more files would be three ways to say one thing and three chances
to drift apart.

### Where the curve is not used

`refresh` is the one mark whose point is not made from the brand curve. Its head is a
right-angle bracket and its gap sits on the right, both taken from a supplied reference; the arc
is still the brand ring. The brand's own arrowhead was tried there three times and does not
survive being put on a curve — its barbs leave perpendicular and arrive tangent, which reads as
swept on a straight shaft but throws the visual mass backwards at the end of an arc, and the
inner barb folds inside the ring and merges with it. Do not "correct" the gap onto the top or
swap the bracket for a barbed head; both have been tried.

The source of that composition is a Streamline icon. **Check what its licence allows before
this package is published anywhere it has not been published already.**

| Token | Value | Use for |
| --- | --- | --- |
| `--icon-sm` | 16px | Inline with `--font-size-small`, and inside dense controls. |
| `--icon-md` | 20px | Inline with body copy. The default. |
| `--icon-lg` | 24px | Buttons, navigation items, list bullets. |

**There is no size above 24px.** A `--icon-xl` step existed for a mark standing on its own as a
section accent, and nothing does that any more. A mark in this set sits beside text; if a
design wants a large graphic on its own, that is imagery, and `imagery.md` covers it.

**Set the height and let the width follow.** Not every mark is square — `download` is not —
so constraining the width distorts it or crops the container. Set `height` and leave
`width: auto`.

**One mark is not drawn on the common grid.** `download` predates the generator and carries
its own intrinsic dimensions, so set to the same pixel height as its neighbours it will not
have the same apparent weight. The sizes above are a starting point for it, not an answer: put
the mark beside the text it belongs to and adjust by eye until it matches. Everything else,
including all four `arrow-*` marks, is 16×16 at stroke 1.25 and scales together.

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

## Loading

**A busy state is never signalled by motion alone.** A visible `role="status"` message beside
the control says what is happening, in the brand's own words — "Sending…", then "Sent". Same
reasoning as `colour.md`'s rule that an error is never signalled by colour alone.

`spinner.svg` is three quarters of the brand ring with one quarter left out — the same ring
`search` and `clock` use. It ships as a plain path like every other mark: **the rotation is
CSS in the consumer, not baked into the file**, so everything in `assets/icons/` stays one kind
of object. One linear turn, and nothing else moves.

```css
.spinner { animation: aardling-spin var(--duration-base) linear infinite; }
@keyframes aardling-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }
```

The reduced-motion rule has to be written by hand. The token collapse above does not reach a
keyframe animation, and a spinner is exactly the case it misses. Stopped, the arc says nothing
on its own — which is why the status message is not optional.

**A loading button keeps its width and its focus.** The label stays in the DOM with
`visibility: hidden` so it holds the box, and the spinner is centred over it; nothing beside it
moves. The button takes `aria-busy="true"` and `aria-disabled="true"` — **never the `disabled`
attribute**, which drops keyboard focus and strands the person who just pressed it. The handler
ignores the click while busy.

## Navigation

One component, two shapes. The same markup, the same disclosure behaviour and the same
`aria-expanded` in both; only the layout of an open section changes. Below `--breakpoint-lg`
the sections stack inside a full-screen sheet; from 960px they sit in a row in the bar and
open a full-width panel beneath it.

That switch needs no seventh breakpoint. 960px is simply where the row fits: five section
words, the logotype at 160px and the call to action come to roughly 840px before gaps, and
below that the row has to break.

### Opening and closing

**Click and tap, never hover.** A panel opens on activation and on nothing else. This is where
the brand parts company with how most consultancy sites behave, and the reason is in *States*
above: hover is the one state a touchscreen cannot produce, so no navigation may live in it.
It also means the keyboard, the mouse and the thumb all do the same thing.

The trigger is a `<button>` carrying `aria-expanded` and `aria-controls`; the panel carries
`hidden`. One panel is open at a time. Escape closes it and returns focus to the trigger that
opened it, and so do pressing that trigger again and clicking outside.

**Move focus with `preventScroll`.** A panel or sheet that is still animating in sits outside
its scroll container, and focusing something inside it makes the browser scroll sideways to
chase it — the layout lurches and then settles back as the transition finishes. Focus with
`{ preventScroll: true }` and let the transition do the moving.

### The bar

Sticky at one height: `position: sticky; top: 0`, and no script. **The bar does not shrink,
condense or hide on scroll.** That would animate height, wait on a scroll observer and move
something — three things *Motion* forbids, for one flourish.

The ground is `--surface-page`, with a one-pixel `--border-hairline` along the bottom.

At 360px the bar carries the logotype and one control, and that is all it can carry.
`--page-margin` leaves 304px; the logotype at 120px, a menu button at 90px and the call to
action at 126px need 368px once their gaps are counted. **So the call to action moves into the
sheet**, where it sits at the foot of the list at full width. Reducing the menu button to a
bare icon saves 46px and still does not close the gap, so this is arithmetic rather than
taste.

### The panel

From 960px an open section is a full-width panel below the bar: `--surface-raised`,
`--shadow-overlay`, bottom corners at `--radius-md`, laid out in columns.

A column heading is itself a link to that section's own index. **No word in the bar is a
parent that only opens a menu** — every one of them leads somewhere on its own.

One featured item per panel, on a pastel ground carrying `data-surface="light"` so it stays
correct when the page around it is dark.

### The sheet

Below 960px the sections stack in a full-screen sheet over the page. It arrives on
`transform` at `--duration-base`; the disclosure panels inside it appear at once, because
opening one changes layout and layout is not animated. The `0fr`-to-`1fr` grid trick animates
`grid-template-rows` and is not used here.

### States

A navigation item is neither prose nor a button, so it takes neither the underline rule in
`colour.md` nor the button rules in `layout.md`. It has its own.

| State | Treatment |
| --- | --- |
| Rest | `--text-primary`, no rule. |
| Hover | A 1px `--colour-ocean-blue` rule under the label. |
| Focus | The focus ring, plus the hover rule. |
| Current section | The same rule at 3px. |

**Ocean Blue is the only colour that can do this.** As a WCAG 1.4.11 non-text indicator the
rule has to clear 3:1 against its ground, and the bar has two grounds. Ocean Blue measures
3.95 on Snow White and 3.95 on Night Blue, and 4.27 on the white panel. Every pastel clears it
on the dark ground and fails on the light one — Lime Green 1.20, Yellow 1.21, Pink 1.67,
Violet 1.69 — so none of them can mark anything in both themes. Ocean Blue passes because it
sits in the middle of the range, which is the same property that disqualifies it as body text.

This is not a new pair. Ocean Blue on Snow White, on white and on Night Blue are already
approved for rules; this names one of those rules.

**The rule is drawn on the label, not on the control.** Drawn on the control it runs the full
width of the item and passes under the chevron, which reads as a mistake. It sits at the foot
of the label's line box — as close to the word as the descenders allow, and no closer.

**The weight does not change.** What marks the current section is the presence of a rule
rather than its colour: at rest one item is ruled and the rest are bare, so a reader who
cannot separate Ocean Blue from Night Blue still sees which section they are in, and WCAG
1.4.1 is satisfied without spending a second cue on weight. Semibold also set the current word
wider than its neighbours, and with a rule sized to the word that made the marker wider too.

A link inside a panel takes the same 1px rule on hover and focus, at 4.27 on
`--surface-raised`.

**Only opacity animates.** The rule fades in at `--duration-fast`, and its thickness is fixed
per state, so nothing resizes. Hovering the current section changes nothing, because its rule
is already drawn.

Every trigger and every link in the navigation is at least 44px high, in the bar and in the
panel alike.
