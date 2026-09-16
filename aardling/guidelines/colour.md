# Colour

1. The palette is seven brand colours plus `--colour-white`, five functional colours, and five
   functional colours for the dark ground only.
2. Colours are approved in pairs. A pair not in the tables below is not approved.
3. Ratios are WCAG 2.x contrast, computed from the two values.

## Roles

1. Components reference a role, never a palette colour. Write `var(--text-primary)`.
2. A theme re-points the roles; the palette does not move. `--colour-snow-white` is Snow White in
   every theme.

| Role | Light | Dark |
| --- | --- | --- |
| `--surface-page` | `--colour-snow-white` | `--colour-night-blue` |
| `--surface-raised` | `--colour-white` | `--colour-dark-surface` |
| `--text-primary` | `--colour-night-blue` | `--colour-snow-white` |
| `--text-secondary` | `--colour-muted-grey` | `--colour-dark-muted-grey` |
| `--text-error` | `--colour-error-red` | `--colour-dark-error-red` |
| `--text-success` | `--colour-success-green` | `--colour-dark-success-green` |
| `--border-control` | `--colour-muted-grey` | `--colour-dark-muted-grey` |
| `--border-hairline` | `--colour-hairline-grey` | `--colour-dark-hairline-grey` |
| `--focus-ring` | `--colour-night-blue` | `--colour-snow-white` |
| `--link-underline` | `rgba(24, 28, 47, 0.5)` | `rgba(246, 246, 246, 0.5)` |

1. Ten roles. An eleventh role is a request to add a colour and needs the same approval.
2. `--link-underline` is the one role that is not a palette colour: `--text-primary` at 50%
   opacity, the link underline at rest. See Links.
3. `--link-underline` is translucent, not a flattened grey, so it sits at half strength on a
   raised surface too.
4. Use `--link-underline`; never derive the tint yourself.
5. Hover and focus use `--text-primary`. They have no role of their own.

## Brand colours

| Token | Hex | Guide name |
| --- | --- | --- |
| `--colour-night-blue` | `#181C2F` | Night Blue |
| `--colour-snow-white` | `#F6F6F6` | Snow White |
| `--colour-white` | `#FFFFFF` | — |
| `--colour-violet` | `#B9BBF4` | Violet |
| `--colour-lime-green` | `#C5EEB3` | Lime Green |
| `--colour-ocean-blue` | `#4B7BC3` | Ocean Blue |
| `--colour-yellow` | `#F8E181` | Yellow |
| `--colour-pink` | `#F3B0B0` | Pink |

1. `--colour-white` is not in the brand guide. It is approved as the ground for cards and panels.

## Functional colours

| Token | Hex | Use for |
| --- | --- | --- |
| `--colour-hover-green` | `#98DE7E` | Primary button, hover and focus. |
| `--colour-muted-grey` | `#6B6B6B` | Secondary text (dates, captions, metadata); form control boundary. |
| `--colour-hairline-grey` | `#D7D7D7` | Hairline rules. Never a control boundary. |
| `--colour-error-red` | `#CF1322` | Form error messages. |
| `--colour-success-green` | `#38761E` | Confirmation messages. |

1. `--colour-muted-grey` clears 4.5:1 on both White and Snow White. Never use a lighter grey.
2. `--colour-success-green` is the brand green darkened to text strength: hue 102, between Lime
   Green at 101.7 and Hover Green at 103.8.
3. `--colour-success-green` matches Error Red's weight: 5.56 against 5.57 on White, 5.14 against
   5.16 on Snow White.
4. Lime Green and Hover Green are grounds only. Night Blue sits on them; they sit on nothing.

## Accepted combinations

| Foreground | Background | Ratio | Use for |
| --- | --- | --- | --- |
| `--colour-night-blue` | `--colour-snow-white` | 15.60 | Default. Page ground, long-form reading. |
| `--colour-night-blue` | `--colour-white` | 16.85 | Cards and panels. |
| `--colour-snow-white` | `--colour-night-blue` | 15.60 | Inverted sections, footer, dark buttons. |
| `--colour-night-blue` | `--colour-lime-green` | 13.05 | Primary button. |
| `--colour-night-blue` | `--colour-hover-green` | 10.50 | Primary button, hover and focus. |
| `--colour-night-blue` | `--colour-yellow` | 12.90 | Section grounds, cards. Table row hover and focus wash — `tables.md`. |
| `--colour-night-blue` | `--colour-pink` | 9.35 | Section grounds, cards. |
| `--colour-night-blue` | `--colour-violet` | 9.21 | Section grounds, callouts. |
| `--colour-muted-grey` | `--colour-white` | 5.33 | Secondary text and control border, on a card. |
| `--colour-muted-grey` | `--colour-snow-white` | 4.93 | The same, on the page ground. |
| `--colour-error-red` | `--colour-white` | 5.57 | Form errors, on a card. |
| `--colour-error-red` | `--colour-snow-white` | 5.16 | Form errors, on the page ground. |
| `--colour-success-green` | `--colour-white` | 5.56 | Confirmations, on a card. |
| `--colour-success-green` | `--colour-snow-white` | 5.14 | Confirmations, on the page ground. |
| `--colour-ocean-blue` | `--colour-white` | 4.27 | Display text at 24px and above, icons, rules (including the navigation accent rule). Never body text. |
| `--colour-ocean-blue` | `--colour-snow-white` | 3.95 | The same, on the page ground. |
| `--colour-hairline-grey` | `--colour-white` | 1.44 | Hairline rules only. Never text; never the only cue for a boundary that matters. |
| `--colour-hairline-grey` | `--colour-snow-white` | 1.33 | The same, on the page ground. |

## Focus ring

1. Every focusable element has a visible ring, the same everywhere.
2. The ring is 3px solid `--focus-ring`, offset 2px, on `:focus-visible`.
3. Never `outline: none` without a replacement in the same rule.
4. `--focus-ring` is Night Blue on every light ground and Snow White on every dark one.
5. Night Blue is the only palette colour that clears 3:1 on all eight approved grounds. Ocean Blue
   fails on Violet (2.33), Pink (2.37) and Hover Green (2.66).
6. Ratios are WCAG 1.4.11 non-text contrast.

| Ring | Ground | Ratio |
| --- | --- | --- |
| `--colour-night-blue` | `--colour-snow-white` | 15.60 |
| `--colour-night-blue` | `--colour-white` | 16.85 |
| `--colour-night-blue` | `--colour-lime-green` | 13.05 |
| `--colour-night-blue` | `--colour-hover-green` | 10.50 |
| `--colour-night-blue` | `--colour-yellow` | 12.90 |
| `--colour-night-blue` | `--colour-pink` | 9.35 |
| `--colour-night-blue` | `--colour-violet` | 9.21 |
| `--colour-snow-white` | `--colour-night-blue` | 15.60 |
| `--colour-snow-white` | `--colour-dark-surface` | 13.21 |

7. On the primary button the offset puts the ring outside the pill. It contrasts with the ground,
   not the button.

## Links

1. A link in running text is `--text-primary` and always underlined.
2. The underline is the only thing that marks a link. Never remove it.

| State | Treatment |
| --- | --- |
| Rest | `--text-primary` text. Underline 1px, `text-underline-offset: 0.18em`, in `--link-underline`: 3.22 on Snow White, 3.27 on White, 4.84 on Night Blue, 4.49 on Dark Surface. |
| Hover | Text unchanged. Underline in full `--text-primary`, same 1px, same offset. |
| Focus | The focus ring, plus the hover underline. |
| Visited | Not distinguished. |

3. Text colour never changes on hover, at any size. Ocean Blue at 18px measures 3.95 on the page
   ground and fails.
4. Hover changes the underline's opacity, not its thickness.
5. CSS: `text-decoration-color: var(--link-underline)` at rest, `var(--text-primary)` on hover
   and focus.
6. Never `opacity` on the element: it fades the text.
7. Never a flattened grey such as `#878993`: on a card it no longer sits at half strength, and the
   ratios above no longer apply.
8. Never style visited links. There is no approved pair for a third text colour.
9. A link that is a call to action is a button. See `layout.md`.
10. A navigation item is neither link nor button: no underline at rest, no pill.
11. Navigation states are a rule in `--colour-ocean-blue` under the label: 1px on hover and focus,
    3px on the current section, no change of weight. See `web.md`.
12. The navigation marker must clear 3:1 on both the light and the dark bar. Ocean Blue is the
    only palette colour that does.

## Buttons

1. Three tiers: primary, secondary, ghost. No fourth. Geometry and sizes: `layout.md`.
2. Hover promotes. A hovered ghost looks like a resting secondary; a hovered secondary becomes the
   dark button.
3. Every state change is a colour change at `--duration-fast`. Nothing moves, grows or lifts.
4. The pressed state is the hover state. See `web.md`.

| Tier and state | Foreground | Background | Light | Dark |
| --- | --- | --- | --- | --- |
| Primary, rest | `--colour-night-blue` | `--colour-lime-green` | 13.05 | 13.05 |
| Primary, hover and pressed | `--colour-night-blue` | `--colour-hover-green` | 10.50 | 10.50 |
| Secondary, rest — 1px border and label | `--text-primary` | `--surface-page` | 15.60 | 15.60 |
| Secondary, rest on a card | `--text-primary` | `--surface-raised` | 16.85 | 13.21 |
| Secondary, hover and pressed | `--surface-page` | `--text-primary` | 15.60 | 15.60 |
| Ghost, rest and hover | `--text-primary` | `--surface-page` | 15.60 | 15.60 |
| Disabled, label and border | `--text-secondary` | transparent | 4.93 | 6.57 |

5. A hovered secondary labels in `--surface-page`, never `--surface-raised`: White on Night Blue
   is not an approved pair.
6. The ghost border exists at rest as `1px solid transparent`. Hover changes its colour, not the
   box.
7. The primary is the only component that names palette colours instead of roles. It does not
   change between themes.
8. There is no tertiary tier. A quieter label (`--text-secondary`) is the disabled state; a
   quieter border (`--border-control`) is a form field.
9. Carry emphasis below ghost with size: a small ghost button.

### On a pastel ground

1. A pastel section takes the Night Blue primary, not the Lime Green one.
2. As a shape, Lime Green measures 1.01 on Yellow, 1.42 on Violet and 1.40 on Pink: no edge. The
   label still passes at 13.05.
3. On the page ground (1.20) and the dark ground (13.05), Lime Green stays the primary.

| On a pastel | Foreground | Background | Ratio |
| --- | --- | --- | --- |
| Primary, rest | `--colour-snow-white` | `--colour-night-blue` | 15.60 |
| Primary, hover and pressed | `--colour-night-blue` | `--colour-lime-green` | 13.05 |

4. A pastel section carries one button.
5. A second action there is a ghost: bare Night Blue label, hovering to a Night Blue outline.
6. Never a secondary on a pastel: its rest and hover states collide with the primary's.
7. A callout that seems to need two equal actions has one too many.

## Controls and forms

1. A control boundary is `--border-control`, 1px: Muted Grey, 5.33 on White, 4.93 on Snow White.
   WCAG 1.4.11 requires 3:1.
2. `--colour-hairline-grey` (1.44, 1.33) never borders a control. It only rules sections off.

| Part | Colour |
| --- | --- |
| Field border | `--border-control`, 1px. |
| Field ground | `--surface-raised`. |
| Label and value | `--text-primary`. |
| Help text | `--text-secondary`. |
| Error message and border | `--text-error`. |
| Confirmation message and border | `--text-success`. |
| Focus | The focus ring, outside the field. |

3. Never signal an error by colour alone. Write what went wrong and how to fix it, in
   `--text-error`, next to the field.
4. An error border doubles to 2px.
5. Never signal a success by colour alone. Write what passed, in `--text-success`, next to the
   field.
6. Confirm only what the reader could not already see: a value checked against something, an
   action that completed. Never confirm a field for being well-formed.
7. There are no placeholders, so there is no placeholder colour. Use help text. See `forms.md`.
8. A disabled control has no fill: transparent ground, `--border-control` at 1px, label in
   `--text-secondary` — 4.93 on the page ground, 5.33 on a card, 6.57 on the dark ground.
9. A disabled control carries `aria-disabled` or `disabled`.
10. Never give a disabled control `--surface-page` as its ground: on a card it reads as a stray
    surface.
11. Never dim a disabled control to a lighter grey. If it needs explaining, explain it in text.
12. Prefer not to disable. Let the form submit, and answer with validation that names the field
    and the fix.

## Dark ground

1. Night Blue is the dark page ground. Snow White is its text.
2. No light functional colour crosses over. `--colour-muted-grey` is 3.16 on Night Blue (too
   faint), `--colour-hairline-grey` 11.71 (too loud), `--colour-error-red` and
   `--colour-success-green` both 3.03 (below 4.5).

| Token | Hex | Use for |
| --- | --- | --- |
| `--colour-dark-surface` | `#242942` | Cards and panels on the dark ground. |
| `--colour-dark-muted-grey` | `#9BA1B8` | Secondary text; form control boundary. |
| `--colour-dark-hairline-grey` | `#3A4059` | Hairline rules. Never a control boundary. |
| `--colour-dark-error-red` | `#EF7A7A` | Form error messages. |
| `--colour-dark-success-green` | `#5AB234` | Confirmation messages. |

### Accepted combinations on the dark ground

| Foreground | Background | Ratio | Use for |
| --- | --- | --- | --- |
| `--colour-snow-white` | `--colour-night-blue` | 15.60 | Dark page ground, long-form reading. |
| `--colour-snow-white` | `--colour-dark-surface` | 13.21 | Cards and panels. |
| `--colour-dark-muted-grey` | `--colour-night-blue` | 6.57 | Secondary text, control boundaries. |
| `--colour-dark-muted-grey` | `--colour-dark-surface` | 5.56 | The same, on a card. |
| `--colour-dark-error-red` | `--colour-night-blue` | 6.21 | Form errors. |
| `--colour-dark-error-red` | `--colour-dark-surface` | 5.26 | The same, on a card. |
| `--colour-dark-success-green` | `--colour-night-blue` | 6.30 | Confirmations. |
| `--colour-dark-success-green` | `--colour-dark-surface` | 5.34 | The same, on a card. |
| `--colour-dark-hairline-grey` | `--colour-night-blue` | 1.65 | Hairline rules only. Never text, never a control boundary. |
| `--colour-dark-hairline-grey` | `--colour-dark-surface` | 1.40 | The same, on a card. |
| `--colour-ocean-blue` | `--colour-night-blue` | 3.95 | Display text at 24px and above, icons, rules (including the navigation accent rule). Never body text. |

1. `--colour-dark-surface` on `--colour-night-blue` is 1.18: a surface pair, not a text pair.
2. 1.18 separates two grounds only together with a radius. Give a dark card padding as well.

### Pastels on the dark ground

1. Violet, Lime Green, Yellow and Pink are grounds. Night Blue is the only foreground on them, in
   both themes.
2. That pair measures the same in both themes, 9.21 to 13.05. A pastel section and the primary
   button are identical in both themes.
3. A focus ring inside a pastel section is Night Blue, not Snow White. Snow White on Violet is
   1.69.
4. A pastel section on a dark page carries `data-surface="light"`, which returns all ten roles to
   their light values.
5. This is the one place a container declares its own surface. See `web.md`.

## Not approved

1. `--colour-ocean-blue` as body text: 4.27 on White, 3.95 on Snow White, 3.95 on Night Blue. It is
   for large display text, icons and rules, in either theme.
2. `--colour-ocean-blue` as a background: Night Blue and Snow White both measure 3.95 on it.
3. Snow White or White text on Violet — explicitly forbidden. Snow White measures 1.69, White
   barely more; both fail even the 3:1 large-text floor. Night Blue is the only foreground on
   Violet, in any theme.
4. The four pastels as text, in either theme. Pink is not the dark error colour; Lime Green is not
   the success colour.
5. Either green on the wrong ground: `--colour-success-green` is 3.03 on Night Blue and 2.57 on
   Dark Surface; `--colour-dark-success-green` is 2.67 on White and 2.47 on Snow White. Use
   `--text-success`.
6. Either green on a pastel: `--colour-success-green` is 4.30 on Lime Green and 4.26 on Yellow.
7. Either green as a background. Like the reds, they are message colours: a confirmation sits on
   the surface it is already on.
8. Any grey on the wrong ground. `--colour-muted-grey` and `--colour-hairline-grey` are light only;
   `--colour-dark-muted-grey` and `--colour-dark-hairline-grey` are dark only. Use
   `--text-secondary` and `--border-hairline`.
9. Any pair not in the tables above, including pastel on pastel and any grey on a pastel.

## Which pairs carry a mark

1. Nine of the light pairs are approved for the logotype and the icon logo. `logos.md` lists them
   and which mark each takes.
2. A pair approved for secondary text, form errors, confirmations or hairline rules never carries
   a mark.
3. `--colour-ocean-blue` carries the logotype only, never below 141px.
4. No mark on `--colour-dark-surface`. A mark on a dark card uses the Night Blue lockup.

## Source

1. The brand colours come from Hartstikke's original brand guide.
2. The guide tags Ocean Blue *Details* in one table and *Backgrounds, Details* in another. This
   file resolves it as details only, on contrast.
3. The guide's "Dark Mode: use Grey for titles & body text" is not carried over: it defines no
   Grey.
4. The dark ground's supporting colours were measured for this file, not taken from the guide.
5. The guide's CMYK values are not reproduced: they match no standard conversion and name no
   profile. Get CMYK from your printer against a named profile.
