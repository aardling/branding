---
description: Render the Aardling brand guide PDF, reporting what was stale and why.
---

Render the Aardling brand guide.

No permission needed. The whole guide renders in one pass, in a couple of seconds.

1. Run `node aardling/scripts/build-brand-guide.mjs --status`. It renders nothing.
2. Say what is stale and why. If nothing is stale, say so and stop — there is
   nothing to gain from rebuilding an identical PDF. `--force` overrides that.
3. Run `node aardling/scripts/build-brand-guide.mjs $ARGUMENTS`. Call the script directly
   rather than through npm, which swallows `--force` as its own flag. There is no
   per-chapter render: the guide is always printed as one document, which is what keeps
   the contents page's links working.
4. Report the page count, the file size and the path.

This command does not touch the version, and rendering is not a reason to bump one. The
guide is built at whatever version the package currently carries. `/release` owns the
version, and renders the guide itself as part of publishing — so use this one to look at
the guide between releases, not to prepare one.
