# Web

1. This file covers what only a browser needs.
2. Spacing, radii, protected terms and the image rule: see `layout.md`. Type sizes: see
   `typography.md`. Approved colour pairs: see `colour.md`.

## Mobile first

1. Everything `tokens.css` declares in `:root` — type sizes, spacing, containers, the page
   margin — is the value for a 360px screen.
2. Every media query is `min-width`, and restates only what changes at that width.
3. Write stylesheets the same way: the base rule is the narrow layout; wider screens add to it.
4. A `max-width` query is a mistake unless it switches off something that only exists on large
   screens.
5. Design at 360px first. Not 375, not 390.
6. Check the hero, the navigation and any table at 360px before a desktop viewport.
7. Anything tappable is at least 44px high, on every screen. See `layout.md`.

## Breakpoints

| Token | Value | What changes there |
| --- | --- | --- |
| `--breakpoint-sm` | 540px | h1 to h4 step up. `--page-margin` gives way to the container. |
| `--breakpoint-md` | 720px | Vertical section padding `--space-6` to `--space-10`. |
| `--breakpoint-lg` | 960px | Full desktop type scale. Section padding `--space-12`, detail-page hero top `--space-18`. |
| `--breakpoint-xxl` | 1400px | Grid gutter `--space-3` to `--space-4`. |
| `--breakpoint-xxxl` | 1728px | Display step. Type scale rises, body 20px. No layout change. |
| `--breakpoint-mega` | 1920px | Display step. Type rises again, body 22px. No layout change. |

1. Six is the whole set.
2. The display steps (1728px, 1920px) move type only. Never hang a layout change on them.
3. A custom property cannot be read in a media query: `@media (min-width:
   var(--breakpoint-lg))` fails silently. In a query, write the literal, equal to the token.
4. The `--breakpoint-*` properties exist to be read from JavaScript and to keep `tokens.json`
   and `tokens.css` in step.
5. 1140px (`xl`) and `--container-xl` (1116px) are retired. Use `--container-lg` or
   `--container-xxl`.
6. Before adding a breakpoint, size the component intrinsically: `minmax()`, `auto-fit`,
   `clamp()`.

## States

1. Anything interactive has five states: rest, hover, focus, pressed, disabled.
2. Colours for every state — focus ring, links, form controls — are in `colour.md`.
3. Anything that reacts to a pointer reacts to the keyboard the same way.
4. No information, control or navigation exists only in a hover state.
5. Never write `outline: none` without a replacement in the same rule.
6. The focus ring: 3px of `--focus-ring`, offset 2px, on `:focus-visible` (not `:focus`).
7. A state change is a colour change, at `--duration-fast`.
8. Buttons, links and cards do not move, grow or lift on hover.
9. A link's underline stays 1px. Hover brings it from `--link-underline` (a 50% tint of
   `--text-primary`) to full colour. See `colour.md`.
10. The pressed state is the hover state. `--colour-hover-green` serves hover and focus on the
    primary button; there is no separate `:active` colour.
11. A form control has a sixth state, wrong. See `forms.md` for when it appears, help text,
    fieldsets, error messages and the newsletter signup.

## Elevation

| Token | Value | Use for |
| --- | --- | --- |
| `--shadow-raised` | `0 2px 8px rgba(24, 28, 47, 0.08)` | A card or panel at rest. |
| `--shadow-overlay` | `0 8px 32px rgba(24, 28, 47, 0.16)` | Floating: a menu, a dialog, a sticky bar. |

1. Shadows are cast in Night Blue, never black.
2. Two steps, no third. To separate things that are not floating, use ground colour, radius and
   space, as `--surface-raised` does.
3. On the dark ground `--shadow-raised` is `none`; `--colour-dark-surface` lifts the card.
4. On the dark ground `--shadow-overlay` is `rgba(0, 0, 0, 0.48)`.

## Dark mode

1. The operating system decides. One `prefers-color-scheme: dark` block re-points the ten roles
   in `colour.md`.
2. No theme toggle, nothing remembered between visits.
3. The palette does not change between themes; the roles resolve differently.
4. Components reference roles, never palette colours. A component that needs its own dark-mode
   CSS is a bug.
5. An inverted section (the footer, dark bands) sets the roles on a container with
   `[data-surface="dark"]`. Never hand-set its colours.

   ```html
   <footer data-surface="dark"> … </footer>
   ```

6. A pastel section on a dark page carries `data-surface="light"`. Without it a focus ring in a
   Violet callout inherits Snow White and measures 1.69.

   ```html
   <section data-surface="light"> … </section>
   ```

7. `data-surface` takes only `light` and `dark`, and is the only attribute this brand styles.
   Never `data-surface="violet"`: a pastel is a section background, not a surface role.
8. Artwork has no dark variant. The four gradients, the illustrations and the pastel sections
   are the same in both themes. Night Blue on Violet measures 9.21 in both. `imagery.md` is
   unaffected.
9. Check both themes before calling anything finished, by switching the operating system
   setting. A devtools override misses `[data-surface]`.

## Motion

| Token | Value | Use for |
| --- | --- | --- |
| `--duration-fast` | 120ms | Colour changes: hover, focus, active. |
| `--duration-base` | 240ms | Anything that moves, resizes or fades: disclosure, drawer, menu. |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Every transition, both durations. |

1. Two durations and one easing. Nothing else.
2. `tokens.css` collapses both durations to `1ms` under `prefers-reduced-motion: reduce`.
3. Anything animating without the tokens — keyframes, scroll-linked effects, autoplaying video,
   self-advancing carousels — must be stopped by hand in that query.
4. The page arrives at rest. Nothing fades or slides in on load; nothing waits on a scroll
   observer to become readable.
5. Animate `transform` and `opacity` only. Never width, height, `top` or `left`.

## Loading

1. Never signal a busy state by motion alone. Show a visible `role="status"` message beside the
   control: "Sending…", then "Sent".
2. `spinner.svg` is three quarters of the brand ring, as in `search` and `clock`. It is a plain
   path.
3. The rotation is CSS in the consumer, never baked into the file. One linear turn.

   ```css
   .spinner { animation: aardling-spin var(--duration-base) linear infinite; }
   @keyframes aardling-spin { to { transform: rotate(360deg); } }
   @media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }
   ```

4. Write the reduced-motion rule by hand: the token collapse does not reach keyframes.
5. A loading button keeps its width and its focus. The label stays in the DOM with
   `visibility: hidden`; the spinner is centred over it.
6. The button takes `aria-busy="true"` and `aria-disabled="true"`. Never the `disabled`
   attribute: it drops keyboard focus.
7. The handler ignores clicks while busy.

## Navigation

1. One component, two shapes: same markup, same disclosure behaviour, same `aria-expanded`.
2. Below `--breakpoint-lg` the sections stack in a full-screen sheet.
3. From 960px they sit in a row in the bar and open a full-width panel beneath it.
4. 960px is where the row fits: five section words, the logotype at 160px and the call to
   action take roughly 840px before gaps. No extra breakpoint.
5. Every trigger and link is at least 44px high, in the bar and in the panel.

### Opening and closing

1. A panel opens on click or tap. Never on hover.
2. The trigger is a `<button>` with `aria-expanded` and `aria-controls`. The panel carries
   `hidden`.
3. One panel open at a time.
4. Escape, pressing the trigger again, or clicking outside closes it and returns focus to the
   trigger.
5. Move focus with `{ preventScroll: true }`, so an animating panel does not make the page
   scroll sideways.

### The bar

1. `position: sticky; top: 0`, no script, one height.
2. The bar never shrinks, condenses or hides on scroll.
3. Ground `--surface-page`, with a 1px `--border-hairline` along the bottom.
4. At 360px the bar carries the logotype and one control. `--page-margin` leaves 304px; logotype
   (120px), menu button (90px) and call to action (126px) need 368px with gaps.
5. So below 960px the call to action sits in the sheet, at the foot of the list, full width.
   An icon-only menu button saves 46px and still does not fit.

### The panel

1. From 960px: full width below the bar, `--surface-raised`, `--shadow-overlay`, bottom
   corners `--radius-md`, in columns.
2. A column heading links to that section's own index.
3. Every word in the bar leads somewhere on its own. None is a parent that only opens a menu.
4. One featured item per panel, on a pastel ground with `data-surface="light"`.

### The sheet

1. Below 960px: a full-screen sheet over the page.
2. The sheet arrives on `transform` at `--duration-base`.
3. Disclosure panels inside it appear at once; layout is not animated. Never the
   `0fr`-to-`1fr` `grid-template-rows` trick.

### States

A navigation item takes neither the link underline rule in `colour.md` nor the button rules in
`layout.md`.

| State | Treatment |
| --- | --- |
| Rest | `--text-primary`, no rule. |
| Hover | A 1px `--colour-ocean-blue` rule under the label. |
| Focus | The focus ring, plus the hover rule. |
| Current section | The same rule at 3px. |

1. The rule is Ocean Blue only. As a WCAG 1.4.11 indicator it needs 3:1 on both grounds.
2. Ocean Blue measures 3.95 on Snow White, 3.95 on Night Blue, 4.27 on the white panel.
3. Every pastel fails on the light ground: Lime Green 1.20, Yellow 1.21, Pink 1.67, Violet
   1.69.
4. This is not a new pair: Ocean Blue on Snow White, white and Night Blue are approved for
   rules.
5. Draw the rule on the label, not the control, so it does not run under the chevron. It sits
   at the foot of the label's line box.
6. The weight does not change. The presence of the rule marks the current section (WCAG
   1.4.1).
7. A link inside a panel takes the same 1px rule on hover and focus, at 4.27 on
   `--surface-raised`.
8. Only opacity animates: the rule fades in at `--duration-fast`. Thickness is fixed per state.
9. Hovering the current section changes nothing.
