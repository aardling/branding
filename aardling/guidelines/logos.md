# Logos

Two marks, and two ways of shipping them.

## Masters and lockups

`assets/logos/` holds the two **masters**: `aardling-logotype.svg` (623×131) and
`aardling-icon.svg` (167×107). Both are transparent and filled with `currentColor` — set
`color` on the parent and the mark follows. In anything that renders CSS, these are what you
use, and every approved colourway comes free.

`assets/logos/lockups/` holds **lockups**: the mark, its ground and its clear space flattened
into one fixed-size file. A lockup is for the places that cannot supply a ground or set
`color` — an avatar upload, a slide master, a print file, a partner's logo pack.

The masters are the source of truth. The lockups are generated from them and are never edited
by hand:

```sh
npm run build:lockups --workspace @aardling/aardling
```

`scripts/build-lockups.mjs` reads the two masters and the gradients and writes all 22 files.
It is deterministic — the same inputs give byte-identical output — so re-running it is safe and
a diff after a run means an input changed. If a mark is ever redrawn, redraw the master and
re-run; do not touch a lockup.

The masters keep transparent backgrounds. The repository rule against baked-in grounds
protects them, not the lockups, whose whole purpose is to carry a ground.

## Clear space

**Clear space on all four sides is the height of the icon logo: 106 units.**

That measure is not arbitrary and it is not two measures. The icon logo is the double-A
ligature cut from the logotype's own outline, and it sits inside the logotype at 1:1 — its ink
is 106.25 units tall in both drawings. So one number serves both marks.

| Mark | Mark size | Lockup canvas |
| --- | --- | --- |
| Logotype | 623 × 131 | 835 × 343 |
| Icon logo | 167 × 107 | 379 × 379 |

The icon canvas is squared so one file serves an avatar upload without recropping. Squaring
only adds air: the horizontal clear space is exactly 106, the vertical 136.

On the logotype, 106 units is 81% of the mark's own height. That is deliberate. Cramped is the
failure that keeps happening; nobody has ever complained that an Aardling mark had too much
room.

## Which pairs carry a mark

`colour.md` is the allowlist of approved pairs. Not every approved pair carries a mark — most
of them are approved for something a mark is not.

| Foreground | Background | Marks |
| --- | --- | --- |
| `--colour-night-blue` | `--colour-snow-white` | Both |
| `--colour-night-blue` | `--colour-white` | Both |
| `--colour-snow-white` | `--colour-night-blue` | Both |
| `--colour-night-blue` | `--colour-lime-green` | Both |
| `--colour-night-blue` | `--colour-yellow` | Both |
| `--colour-night-blue` | `--colour-pink` | Both |
| `--colour-night-blue` | `--colour-violet` | Both |
| `--colour-ocean-blue` | `--colour-white` | Logotype only, and not small — see below |
| `--colour-ocean-blue` | `--colour-snow-white` | Logotype only, and not small — see below |

**The rest of `colour.md` does not carry a mark.** `--colour-muted-grey` is secondary text, and
a greyed mark reads as disabled. `--colour-error-red` is form errors, and a red mark reads as a
failure. `--colour-hairline-grey` is rules only — at 1.44:1 and 1.33:1 it is an invisible logo.
`--colour-hover-green` is a button's hover state, and a mark has no hover.

## Ocean Blue needs more room than the rest

`colour.md` allows Ocean Blue for large display text at 24px and above. The logotype's cap
height is 106 of its 131 units, so a 96px-wide logotype has a 16px cap — under that threshold.
The two rules would contradict each other if left alone.

**An Ocean Blue logotype is never narrower than 141px, a 189px lockup.** That is the width at
which its cap height reaches 24px. It is not drawn on the icon logo at all, which floors at
16px and never gets near.

This is the one colourway whose minimum differs from the mark's own. Ocean Blue is a details
colour and the logotype is drawn in hairlines; 4.27:1 on white behaves worse than the number
suggests when the strokes are that thin.

## Minimum sizes

| Mark | On a flat ground | On a gradient |
| --- | --- | --- |
| Logotype | 96px mark, 129px lockup | **380px lockup** |
| Icon logo | 16px mark, 36px lockup | **64px lockup** |

A gradient costs roughly three times the floor a flat ground does, and the reason is the grain
rather than the contrast — see `imagery.md`, which carries the gradient rule. Below those
widths, use a flat approved ground.

## Naming

```
aardling-<mark>-<foreground>-on-<background>.svg
```

Token names without the `--colour-` prefix; a gradient by its file's stem:

```
aardling-logotype-night-blue-on-lime-green.svg
aardling-icon-snow-white-on-night-blue.svg
aardling-logotype-white-on-gradient-meridian.svg
```

## Which mark

The logotype is for big touchpoints — a site header, a slide, a social post, anywhere the name
should be read. The icon logo is for small ones — a favicon, an avatar, a thumbnail — and for
anywhere the logotype would be illegible.

Both are drawn in capitals. That is lettering; the name is written **Aardling**. See
`naming.md`.
