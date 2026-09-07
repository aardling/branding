---
description: Render the Aardling brand guide PDF, after showing what is stale and asking first.
---

Render the Aardling brand guide.

Rendering is slow — a full build takes minutes, because Chrome rasterises the grain
filters in the Bloom and Harvest gradients at print resolution. So never start one
without asking.

1. Run `node aardling/scripts/build-brand-guide.mjs --status`. It renders nothing.
2. Show the user which chapters are stale and what changed. If nothing is stale, say
   so and stop — do not rebuild for the sake of it.
3. Ask the user to confirm. Wait for a real answer.
4. On yes, run `node aardling/scripts/build-brand-guide.mjs $ARGUMENTS`. Call the
   script directly rather than through npm, which swallows `--force` as its own flag.
   `--force` re-renders everything; `--section <id>` re-renders one chapter.
5. Report the page count, the file size and the path.

Do not bump the package version to go with the render. The guide is rendered under
whatever version the package currently carries; the version changes only when the user
asks for a publish. If that publish then picks a new number, the guide is re-rendered
under it as part of publishing.
