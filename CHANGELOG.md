# Changelog

Every publish of every package in this repository, newest first. The five brands are versioned
independently, so their entries interleave; each heading names the brand it belongs to. The
full release notes, and Aardling's rendered guide PDF, are on the
[releases page](https://github.com/aardling/branding/releases) — this file is the history of
what changed in the packages.

## aardling 1.0.0-beta.2 — 2026-09-09

- **Blockquote guidelines** (`guidelines/blockquote.md`, new): a verbatim quotation, distinct from a callout. Two shapes — inline in a column of prose, and a card for testimonials. The Ocean Blue quote mark is the one part that is never optional; the text is General Sans light at `--font-size-h6`; attribution stacks name, role, company, photo and company logo, each an independent toggle once a name exists. On a pastel ground the mark and rule fall back to `--text-primary`, since Ocean Blue has no approved pair on a pastel.
- **A `quote` icon** — 57 marks now, up from 54. Drawn by the generator as a mirrored pair of drops, the same construction as `location`'s pin.
- **The link underline is a colour change, not a size change.** It stays 1px throughout: rest is a 50% tint of `--text-primary` (3.22 against Snow White, 4.84 against Night Blue), hover brings it to full strength. It was 1px thickening to 3px. Restated wherever it was cited — `colour.md`, `components.md`, `web.md`, `forms.md`, `tables.md` and the brand skill — so links, card titles, footer links, error-summary links and sortable column headers all say the same thing.
- **When content has no image, never fake one with a title on a flat ground.** That is a placeholder, not an image. Look for a real photograph first — a case study's own client site is the usual source — and propose a candidate rather than leaving the gap. Failing that, fall back in order: no image at all, then a brand illustration, then a generated Cover carrying the content's title on a gradient.
- **A card drops its own title when its media is a generated Cover.** The heading on the gradient already is the title; setting it again below shows the reader the same words twice. Eyebrow and metadata stay.
- **`clock.svg`** centre dot is regenerated from the generator, closing the notch where the two butt-capped hands meet.

Additive throughout: nothing was removed or renamed since `1.0.0-beta.1`.

## aardling 1.0.0-beta.1 — 2026-09-09

- **Table guidelines** (`guidelines/tables.md`, new): anatomy, the card ground, header row, cell padding, right-aligned numbers, protected terms in a cell, a row that links elsewhere, a sortable column, row selection, 360px behaviour, loading/empty states and dark mode. Colour stays restrained — every other row is just `--surface-page`, and Yellow is held back as the one accent for hover and focus, the same kind of exception the primary button already gets.
- **New imagery guidelines**: photograph usage and article image placement.
- **Six new interface icons**: `zoom-in`, `zoom-out`, `fast-forward`, `rewind`, `skip-next`, `skip-previous`.

The first beta toward 1.0 — a milestone marker rather than a break: nothing existing was
removed or renamed since `0.10.2`.

## aardling 0.10.2 — 2026-09-08

- **A new Components chapter**: the hero, the card, the callout and the footer, specified.
- **Navigation and forms got their own rules**: which states may only live in navigation, when a form may interrupt, and how validation timing works.
- **A success colour.** `--colour-success-green` is a ninth accepted colour, for confirmation messages, at 5.56:1 on white.
- **No white or Snow White text on Violet.** Forbidden explicitly, closing a gap the colour guidance left open.
- **No emoji in prose, and marks stay off metaphor.** A stated rule, not just a convention.
- **The icon set grew to 50 marks**, including a full arrow set (up, down, left, right) and button styles.
- Decorative marks and the size step they needed were withdrawn — they weren't earning their place.
- Pagination and shadow-rendering fixes in the guide's own renderer.
- The guide's front matter split: install instructions now have their own page.

## aardling 0.9.0 — 2026-09-07

The brand now covers the web.

- **Mobile first.** The token file was desktop-first: `:root` held the ≥960px sizes and a `max-width` query shrank them. Inverted, with a real phone column (h1 36) below the 540px step.
- **A focus ring**, which the brand did not previously have in any form. Night Blue is the only palette colour clearing 3:1 against all eight approved grounds.
- **Dark mode**, with four new colours and an eight-role token layer, so a theme re-points without the palette moving.
- **Links, form controls and disabled states**, including a fix: `--colour-hairline-grey` was assigned the job of bordering a control, and at 1.44:1 it fails WCAG 1.4.11.
- Six breakpoints, motion tokens, two shadows, icon sizes.
- A new four-page **Web chapter**.

Every contrast ratio printed in the guide is computed from the hex values and machine-verified.

The guide PDF was moved out of the package and onto the release, taking the tarball from
26.8 MB to 12.6 MB.
