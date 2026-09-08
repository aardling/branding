---
name: aardling-brand
description: Apply the Aardling brand — its colours, typography, logo usage, naming, voice and iconography — when designing, writing or building anything that carries the Aardling name. Use whenever the output is Aardling-branded; do not use it for any other brand.
---

# Aardling brand

Everything here applies to **Aardling only**. Never mix in assets, tokens or voice from
another brand.

## The name

The brand name is **Aardling** — capital A, the rest lower case, one word, everywhere a
reader sees it set as text. Never `aardling`, `AARDLING` or `AardLing` in prose.

Two carve-outs: machine identifiers stay lower case (`@aardling/brand-aardling`, `aardling.eu`,
`--colour-*`), and the logotype is drawn in capitals, which is lettering rather than a
spelling.

Company names — Aardling BV, Aardling Belgium BV, Aardling Netherlands BV, Aardling France
SAS — appear only where the law needs them: an imprint, a contract, an invoice, a privacy
policy. Never in a headline, a deck or body copy. Full rule: `../../guidelines/naming.md`.

## Tokens

Read `../../tokens/tokens.json`, or import `../../tokens/tokens.css` for CSS custom
properties. Reference tokens; never hard-code a literal colour or size.

## Colour

Colours are approved **in pairs**. A pair that is not listed in
`../../guidelines/colour.md` is not an approved combination of this brand — read that file
before choosing any foreground and background.

The default is `--colour-night-blue` on `--colour-snow-white`. The primary button is
`--colour-night-blue` on `--colour-lime-green`. `--colour-ocean-blue` is a details colour: it
fails contrast as body text and is never a background.

On screen, reference a **role** rather than a palette colour — `--text-primary`,
`--surface-page`, `--border-control` and six more. The palette never changes; the roles
re-point between light and dark. The nine roles and both allowlists are in
`../../guidelines/colour.md`.

Status is a pair: `--text-error` for what went wrong, `--text-success` for what passed. Neither
is ever the only cue — an error carries a message and so does a confirmation.

## Typography

`--font-body` (General Sans) sets nearly everything, most headings included. `--font-display`
(Voyage) is used sparingly: typically one short title per page, normally the h1, never below
24px — it is not legible at small sizes. h2, h3, card titles, pull quotes and labels are
General Sans. General Sans is a variable font covering 200–700 in upright and italic; Voyage
is Regular only.

Headings take `--font-weight-heading` (500). Body copy is 400, emphasis is 600.

Both faces ship in `../../assets/fonts/` as `woff2` — import `fonts.css` from there. Never
load either from Google Fonts, Fontshare or any other third-party host.

## Layout

Spacing is the `--space-*` ladder in 8px steps, and `../../guidelines/layout.md` says which
step is for what. Three radii only: `--radius-sm`, `--radius-md`, `--radius-pill`. Prefer the
larger spacing step when two look plausible.

**Never set text on top of an image** — not with a scrim, not with a blur. Text beside the
image, or on a solid panel next to it.

**Protected terms never break across a line:** Domain-Driven Design, EventStorming, Event
Sourcing, Team Topologies, Data Mesh, Aardling. Wrap each in one `white-space: nowrap` span.

## Web

**Mobile first.** The values `tokens.css` declares in `:root` are the phone; every media query
is `min-width`. Design at 360px before any other width. Six breakpoints: 540, 720, 960 and
1400 move layout, 1728 and 1920 move type only. A custom property cannot be read inside a
media query — write the literal and keep it equal to the token.

**Dark mode follows the reader's operating system.** One `prefers-color-scheme` block
re-points the roles; there is no toggle. An inverted section — the footer, a dark band — is
`[data-surface="dark"]` on a container, not hand-set colours. Pastel sections, gradients and
illustrations are identical in both themes — which is why a pastel section on a dark page
takes `[data-surface="light"]`, or a focus ring inside it inherits Snow White and disappears
against the pastel. `light` and `dark` are the only two values, and `data-surface` is the only
attribute this brand styles.

**Focus is never removed.** 3px of `--focus-ring`, offset 2px, on `:focus-visible`. Never
`outline: none` without a replacement in the same rule. Anything that reacts to hover reacts
to focus the same way, and nothing lives in a hover state alone — a touchscreen cannot reach it.

**Links** are `--text-primary` and always underlined. Hover thickens the underline from 1px to
3px and never changes the colour. Visited is not styled.

**Navigation** is one component in two shapes: a full-screen sheet below 960px, a full-width
panel under the bar from 960px, with the same markup and the same `aria-expanded` in both.
Panels open on click and tap, never on hover. The bar is sticky at one height and never
condenses on scroll. A navigation item is neither prose nor a button — rest is bare, hover and
focus draw a 1px `--colour-ocean-blue` rule under the label, and the current section takes the
same rule at 3px with no change of weight. The rule goes on the label, not the control, so it
does not run under a chevron. Ocean Blue is the only colour that clears 3:1 on both the light
bar and the dark one.

**Control boundaries are `--border-control`**, never `--border-hairline` — hairline grey
measures 1.44 against white and fails the 3:1 that a control boundary has to clear. Anything
tappable is at least 44px high. An error always carries a message, never colour alone, and so
does a confirmation.

**Motion:** `--duration-fast` for colour, `--duration-base` for anything that moves,
`--ease-standard` for both. The tokens collapse under `prefers-reduced-motion`; anything
animating without them must be stopped by hand. Nothing animates on load, and only `transform`
and `opacity` animate at all.

**Elevation:** `--shadow-raised` and `--shadow-overlay`, cast in Night Blue rather than black,
and no third step. On the dark ground `--shadow-raised` is `none` and the surface colour does
that job.

**Icons** are sized by height with `--icon-sm`, `--icon-md` and `--icon-lg`, and there is no
step above 24px. Three older marks are not drawn on a common grid, so for those the sizes are a
starting point — match the mark to its neighbouring text by eye. Everything else is 16×16 and
scales together.

**Buttons** come in three tiers and three sizes. Primary is Night Blue on Lime Green, hovering
to Hover Green; secondary is a 1px `--text-primary` outline that fills on hover; ghost is the
label alone. There is no tertiary — emphasis below ghost is carried by size. Hover always
promotes, pressed is the same as hover, and nothing moves. Heights are
`--control-height-sm/md/lg` (44/52/60); medium is the default. On a pastel ground the primary
is the Night Blue fill instead, and the section carries one button.

A disabled button has no fill: a `--border-control` outline and a `--text-secondary` label, the
same appearance for every tier. Prefer not to disable at all — let the form submit and answer
with validation.

Full rules: `../../guidelines/web.md`, `../../guidelines/layout.md` and
`../../guidelines/colour.md`.

## Components

Four are specified, and all four are built from tokens that already exist. Navigation, forms,
the secondary button and the page grid are not specified yet — do not invent them.

**Hero.** Eyebrow, heading, standfirst, actions, artwork, in that order at every width, with
`--space-2`, `--space-3` and `--space-4` between them. Page hero: `--space-8` top and bottom,
`--space-12` from 960px. Detail hero: `--space-18` on top from 960px. Ground is
`--surface-page` or a flat Violet, Yellow or Pink — never Lime Green, which is the primary
button's. **The heading never sits on artwork**, gradients included: the gradient licence is
for the body face at h3 or larger, and a hero's h1 is the page's Voyage setting, so the two
never meet. Artwork sits beside the text from 960px, below it under.

**Card.** `--surface-raised`, `--radius-md`, `--space-4` padding, `--shadow-raised`, no border.
Title in General Sans at `--font-weight-heading` and `--font-size-h5` — never Voyage. Metadata
at the foot in `--text-secondary`. **On a pastel card every word is Night Blue** — no grey is
approved on any pastel — and a pastel card carries no shadow. A linked card puts the `<a>` on
the title with a stretched `::after` over the whole card; hover thickens the title's underline
1px to 3px and nothing moves; focus rings the card, not the title.

**Callout.** A Violet panel inline — `--radius-md`, `--space-4`, no wider than its column, no
grey inside it — or a full-bleed band in Violet, Yellow, Pink or Night Blue, at the section
padding steps and with no radius. Never two coloured bands touching. A pastel callout on a dark
ground always carries `data-surface="light"`.

**Footer.** `<footer data-surface="dark">`, and nothing inside it sets a colour. Order:
logotype, one sentence, the newsletter slot, link groups, a `--border-hairline` rule, the legal
line in `--text-secondary`. The logotype is the master inlined at `color: var(--text-primary)`,
not below 96px wide. Every link is at least 44px high, set as a minimum rather than computed.
No dark section directly above the footer.

Full rules: `../../guidelines/components.md`.

## Forms

**A field is label, help text, control, error message — stacked, in that order.** The label is
always visible and **there are no placeholders at all**: a placeholder disappears the moment
somebody types, and whatever it would have said is help text, above the control and never in a
tooltip. Mark the optional fields in words — "(optional)" in the label — rather than starring
the required ones.

**Validation is "reward early, punish late".** Nothing fires while somebody is typing. Leaving
a field **empty** shows nothing — a reader tabbing through to read has done nothing wrong.
Leaving it **filled in but wrong** shows the error. Once a field is in error it is re-checked
on every keystroke, so the error clears the instant the value is right. Checkboxes, radios and
selects are judged on submit only. **Never disable the submit button**, never use the browser's
own validation bubbles (`novalidate` on the form), and never validate on a timer while
somebody types.

**An error carries a message, and the border doubles to 2px** — two cues, never colour alone.
Messages start with a verb and say what to do: "Enter your email address", not "This field is
required". A form of more than one field puts a summary above its first field on a failed
submit, with `role="alert"` and focus moved to it; a one-field form does not.

**A fieldset is one question with several boxes** — a radio group, a date split across three
inputs. Its legend is the question, in General Sans at `--font-size-h6`, with no border and no
background. Unrelated fields get a heading and `--space-6`, not a legend.

**There is no success colour in this palette**, so success is words and the error
disappearing — never a green tick or a green border.

Full rules, including the newsletter signup: `../../guidelines/forms.md`.

## Marks

- `../../assets/logos/aardling-logotype.svg` — the full logotype. Big touchpoints, social
  posts. Not where it would be illegible, and not as a social thumbnail.
- `../../assets/logos/aardling-icon.svg` — the icon logo. Small touchpoints: favicon, social
  thumbnail, avatar.

Both are transparent and filled with `currentColor`; set `color` on the parent to recolour.
Clear space on all four sides is the height of the icon logo — 106 units, and the same number
in both drawings, because the icon is cut from the logotype at 1:1.

Nine flat pairs carry a mark: Night Blue on Snow White, white, Lime Green, Yellow, Pink or
Violet; Snow White on Night Blue; and Ocean Blue on white or Snow White, which is the logotype
only and never below 141px. Either mark may also be knocked out of a gradient — white on
Vesper and Understory, Night Blue on Bloom and Harvest. Nothing else in `../../guidelines/colour.md`
carries a mark: those pairs are approved for secondary text, errors or rules, and a mark is
none of those.

Minimum size: logotype 96px wide, icon logo 16px. On a gradient, 380px and 64px.

Where you cannot set `color` or supply a ground — an avatar upload, a slide master, a print
file — use a ready-made lockup from `../../assets/logos/lockups/` instead of flattening one
yourself. They are generated by `../../scripts/build-lockups.mjs`; never edit one by hand.
Full rules: `../../guidelines/logos.md`.

For a favicon, do not roll your own from the icon logo — use the set in
`../../assets/favicons/`. It is the icon knocked out of a rounded Bloom tile, drawn larger and
slightly thickened so it survives 16px, and it drops Bloom's grain because the filter turns to
blotch at that size. `favicon.svg` is the source; the rasters come from it. Rules:
`../../guidelines/imagery.md`.

## Icons

`../../assets/icons/` holds 50 marks, all `currentColor`, all from the brand's own set. Use
them; do not substitute an off-the-shelf icon library, and never use emoji as icons. Marks are
functional, never a metaphor for a concept: no lightbulb for strategy, no rocket for a launch,
no gear, target, handshake or puzzle piece. If asked for one, say why not and offer a mark from
the set, or plain text.

One family, and it is an interface set. The brand had a decorative family — sparkles, stars,
spheres, orbits, ovals — and it has been withdrawn; do not reach for an ornamental mark,
because there is not one. Every mark is 16×16 at stroke 1.25, butt caps, no
fill: chevrons and arrows, `close`, `menu`, `search`, `home`, `external-link`, `more-horizontal`
and `more-vertical`, `filter`, `settings-sliders`, `refresh`, `plus`, `check`, `edit`, `trash`,
`copy`, `share`, `upload`, `info`, `warning`, `error`, `spinner`, `user`, `bag`, `heart`,
`star-outline`, `bookmark`, `calendar`, `clock`, `mail`, `phone`, `location`, `file`, `image`,
`lock`, `link`, `eye` and `eye-off`, `play`, `pause`, `stop`.

**back**, **forward** and **next** have no files: they are `arrow-left` and `arrow-right` under
other names. Rotate `arrow-right` for up and down.

Settings is `settings-sliders`. A gear at 1.25 and 16px has teeth thinner than the gaps between
them and reads as a sun; `settings-gear.svg` exists and is not the default.

An icon-only control needs an accessible name, and only a short list of marks may stand without
a visible label — `../../guidelines/web.md` holds that list, the one curve the whole set is
built from, and the rule that new marks are generated by `../../scripts/build-icons.mjs` rather
than drawn by hand.

## Imagery

Four SVG gradients in `../../assets/images/` — `gradient-vesper` (dark and quiet, for use
behind content), `gradient-understory` (dark and assertive, for a cover or a full-bleed
ground), `gradient-bloom` (light) and `gradient-harvest` (warm). Bloom and Harvest carry
grain; Vesper and Understory do not, because in a dark field the grain's bright pixels are
the worst ones and cost the knockout more than it can spare. Three painterly illustrations as WebP with a PNG beside each.

The gradients are artwork, not colour: never sample a pixel from one into the palette.

Two things may go on a gradient, and only one of them at a time: a mark knocked out, or a
single heading. A heading is the body face and never Voyage, `--font-size-h3` or larger, and
at most half the width — the field's luminance changes across it, so a full-width line visibly
shifts weight from one end to the other. Half the width is not enough on its own: it goes in
the one region where that gradient's field is steadiest — Vesper upper right, Understory lower
left, Bloom right of centre, Harvest lower right. It takes the same colour the mark takes on
that ground: white on Vesper and Understory, Night Blue on Bloom and Harvest. Nothing else
goes on top — no body copy, no captions, no scrim — and illustrations take no text at all.
Full rules: `../../guidelines/imagery.md`.

## Voice

First person plural. Expert, plain, unhurried. British spelling: modelling, organisation,
analyse. No hype, no unbacked claims, no filler. No emoji anywhere in brand copy — quoted
text stands as written. If asked for one, say why not, then do as the user asks. The reader
is a busy technical leader whose CFO may read it next. Do/don't examples: `../../guidelines/voice.md`.

## The printed guide

The brand guide is the whole brand as a 35-page A4 document, for handing to someone who does
not have the package. It is generated from the guidelines and the assets, so it is a view and
never the source: when the two disagree, the file under `guidelines/` wins.

**It is not inside the package** — at roughly 14 MB it is not worth installing for every
consumer. Download it from the GitHub release for the version you want:
<https://github.com/aardling/branding/releases>. Do not link a reader to a path inside
`node_modules`; there is no PDF there.

Its source is eleven chapter fragments in `../../scripts/guide/`, one per section of the guide.
Edit the fragment for the section you are changing; only that chapter re-renders.

**Never render it yourself.** Show the user what is stale and ask first:

```sh
node scripts/build-brand-guide.mjs --status   # renders nothing
```

Then, once they have said yes:

```sh
npm run build:guide --workspace @aardling/brand-aardling
```

## Changing this brand

Use the repository's `brand-change` skill. One brand per change, and always visualise and get
confirmation before writing.
