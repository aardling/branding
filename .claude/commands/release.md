---
description: Release a brand package — propose a version, confirm it, render the guide, publish the package and attach the guide to a GitHub release.
---

Release a brand: `$ARGUMENTS` names it, and defaults to `aardling`. Call the package
`@aardling/brand-<brand>`; only Aardling has a printed guide, so skip the render steps for
any brand without `<brand>/scripts/build-brand-guide.mjs`.

This runs in the user's own checkout, on `main`. It pushes to `main` and publishes, so it is
not something to attempt from a worktree or a background job.

Work through these in order and stop at the first thing that does not hold.

## 1. Preflight

- On `main`, with a clean tree. `git fetch` and confirm `main` is level with `origin/main`.
- `gh auth status`, and a token that carries `write:packages` and `repo`:
  `gh auth refresh -h github.com -s write:packages,repo` then
  `export GITHUB_TOKEN=$(gh auth token)`. `publishConfig` already points the package at
  GitHub Packages, so no `.npmrc` is needed here.

## 2. Work out where the last release left off

- Last tag: `git tag -l '<brand>-v*' | sort -V | tail -1`.
- Compare it with `version` in `<brand>/package.json`. If the two disagree, stop and show
  both — something published outside this command, and guessing past it risks a wrong number.

## 3. Show what changed

`git log <last-tag>..HEAD -- <brand>/` and `git diff --stat <last-tag> -- <brand>/`. Read the
commits rather than just counting them: the version depends on what actually changed.

## 4. Propose a version, and ask

Pick it by the rule in `CLAUDE.md` — semver over everything since the last released version,
breaking meaning a token, asset or path removed or renamed; a prerelease line continues to
its next prerelease or to the version it is heading for; below 1.0 the minor absorbs breaking
changes.

Draft the release notes too, shaped like the previous release — `gh release view <last-tag>`
shows the house style: what the guide is and its page count, the download line, a **What is
new since `<previous>`** list, then the contents.

Put the number and the notes in front of the user with `AskUserQuestion` and wait for a real
answer. Nothing below this line happens before a yes — no bump, no render, no publish.

## 5. Bump

```sh
npm version <version> --no-git-tag-version -w @aardling/brand-<brand>
```

Check `git diff --stat` shows `package-lock.json` moving with it; the lock records workspace
versions. If it did not, run `npm install --package-lock-only`.

## 6. Render the guide (Aardling only)

```sh
node aardling/scripts/build-brand-guide.mjs
```

The bump renamed the PDF, so every chapter is stale and this is the slow full build — say so
before starting it. The script writes the new PDF and removes the one under the old version.
Then confirm with `node aardling/scripts/build-brand-guide.mjs --check`, which must exit 0;
`npm publish` runs the same check and will refuse a stale guide.

## 7. Commit, tag, push

Commit the bump, `package-lock.json`, `scripts/guide/manifest.json`, the new PDF and the
deletion of the old one. Tag `<brand>-v<version>` and push the commit and the tag. Tag before
publishing: the tag has to point at the commit whose guide was checked.

## 8. Publish the package

```sh
npm publish -w @aardling/brand-<brand>
```

A prerelease version takes `--tag next`, or the registry files it as `latest` and every plain
install picks up a beta.

## 9. Publish the guide

```sh
gh release create <brand>-v<version> <brand>/<brand>-brand-guide-v<version>.pdf \
  --title "Aardling brand guide v<version>" --notes-file <notes>
```

Add `--prerelease` when the version has a prerelease suffix. The PDF is attached to the
release rather than shipped in the package — 14 MB that most consumers would never open.

## 10. Report

The version and why it was chosen, the tag, the release URL, and the package on GitHub
Packages.
