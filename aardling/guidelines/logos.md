# Logos

## Masters and lockups

| File | Size |
| --- | --- |
| `assets/logos/aardling-logotype.svg` | 623 × 131 |
| `assets/logos/aardling-icon.svg` | 167 × 107 |

1. The two masters are transparent and filled with `currentColor`. Set `color` on the parent.
2. In anything that renders CSS, use the masters.
3. `assets/logos/lockups/` holds lockups: mark, ground and clear space flattened into one
   fixed-size file.
4. Use a lockup only where you cannot supply a ground or set `color`: avatar uploads, slide
   masters, print files, partner logo packs.
5. The masters are the source of truth. Never edit a lockup by hand.
6. Generate the lockups with `npm run build:lockups --workspace @aardling/brand-aardling`.
7. `scripts/build-lockups.mjs` reads the masters and the gradients and writes all 22 files.
   Output is deterministic: a diff after a run means an input changed.
8. To redraw a mark, redraw the master and re-run.
9. Masters have transparent backgrounds. Lockups carry a ground; the rule against baked-in
   grounds does not apply to them.

## Clear space

1. Clear space on all four sides is the height of the icon logo: 106 units.
2. The same measure serves both marks. The icon logo is the double-A ligature of the logotype
   at 1:1; its ink is 106.25 units tall in both.
3. On the logotype, 106 units is 81% of the mark's height.

| Mark | Mark size | Lockup canvas |
| --- | --- | --- |
| Logotype | 623 × 131 | 835 × 343 |
| Icon logo | 167 × 107 | 379 × 379 |

4. The icon canvas is square, so one file serves an avatar upload without recropping.
   Horizontal clear space is 106, vertical 136.

## Which pairs carry a mark

Pairs are from `colour.md`. Only these carry a mark.

| Foreground | Background | Marks |
| --- | --- | --- |
| `--colour-night-blue` | `--colour-snow-white` | Both |
| `--colour-night-blue` | `--colour-white` | Both |
| `--colour-snow-white` | `--colour-night-blue` | Both |
| `--colour-night-blue` | `--colour-lime-green` | Both |
| `--colour-night-blue` | `--colour-yellow` | Both |
| `--colour-night-blue` | `--colour-pink` | Both |
| `--colour-night-blue` | `--colour-violet` | Both |
| `--colour-ocean-blue` | `--colour-white` | Logotype only, min 141px. See Ocean Blue. |
| `--colour-ocean-blue` | `--colour-snow-white` | Logotype only, min 141px. See Ocean Blue. |

1. No mark in `--colour-muted-grey`: reads as disabled.
2. No mark in `--colour-error-red`: reads as a failure.
3. No mark in `--colour-success-green`: reads as a status.
4. No mark in `--colour-hairline-grey`: invisible at 1.44:1 and 1.33:1.
5. No mark in `--colour-hover-green`: a mark has no hover state.

## Ocean Blue

1. An Ocean Blue logotype is never narrower than 141px, a 189px lockup.
2. At 141px its cap height reaches 24px, the floor `colour.md` sets for Ocean Blue display
   text. The cap height is 106 of 131 units.
3. Never draw the icon logo in Ocean Blue.
4. This is the only colourway whose minimum differs from the mark's own.

## Minimum sizes

| Mark | On a flat ground | On a gradient |
| --- | --- | --- |
| Logotype | 96px mark, 129px lockup | **380px lockup** |
| Icon logo | 16px mark, 36px lockup | **64px lockup** |

1. Below the gradient widths, use a flat approved ground.
2. The gradient floor is set by the grain, not the contrast. See `imagery.md`.

## Naming

```
aardling-<mark>-<foreground>-on-<background>.svg
```

1. Colours are token names without the `--colour-` prefix.
2. A gradient is named by its file's stem.

```
aardling-logotype-night-blue-on-lime-green.svg
aardling-icon-snow-white-on-night-blue.svg
aardling-logotype-white-on-gradient-vesper.svg
```

## Which mark

1. Logotype: big touchpoints where the name should be read — site header, slide, social post.
2. Icon logo: small touchpoints — favicon, avatar, thumbnail — and anywhere the logotype would
   be illegible.
3. Both marks are drawn in capitals. The name is written **Aardling**. See `naming.md`.
