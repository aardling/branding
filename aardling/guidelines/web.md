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

The eighteen marks in `assets/icons/` are stroked SVG filled with `currentColor`. Recolour
them by setting `color` on a parent — never by editing a file, and never by adding a `fill`
attribute.

| Token | Value | Use for |
| --- | --- | --- |
| `--icon-sm` | 16px | Inline with `--font-size-small`, and inside dense controls. |
| `--icon-md` | 20px | Inline with body copy. The default. |
| `--icon-lg` | 24px | Buttons, navigation items, list bullets. |
| `--icon-xl` | 32px | A section or feature mark standing on its own. |

**Set the height and let the width follow.** Several marks are not square —
`circle-overlap-multiple` is 160×290, `oval-vertical` is 88×144 — so constraining the width
distorts them or crops the container. Set `height` and leave `width: auto`.

**The set is not drawn on a common grid.** Some marks carry intrinsic dimensions at interface
scale with a 1.25 stroke; the rest are viewBox-only at drawing scale with a stroke of 2. Set
to the same pixel height they will not have the same apparent weight. The sizes above are a
starting point, not an answer: put the icon beside the text it belongs to and adjust by eye
until it matches. If a mark still fights its neighbours at every size, use a different mark.

**An icon is never the only label.** A control that carries an icon and no visible text needs
an accessible name — and if the meaning is not obvious to someone outside our field, it needs
visible text as well. That is the same judgement `voice.md` asks for about jargon.
