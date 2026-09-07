# @aardling/brand-dddacademy

Brand guidelines, design tokens and assets for the **dddacademy** brand.

> Status: scaffold. No brand content yet.

## Install

These packages are published to **GitHub Packages**, not the public npm
registry. That needs two things in the consuming project.

**1. Point the `@aardling` scope at GitHub and supply a token.** In that project's `.npmrc`:

```
@aardling:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**2. Put a token in the environment.** A classic personal access token needs **two** scopes:
`read:packages` to download, and `repo` because these packages belong to a private
repository and are invisible without it:

```sh
export GITHUB_TOKEN=ghp_...
```

GitHub Packages requires authentication for every install, including public packages — there
is no anonymous read. Commit the `.npmrc` (it names the registry, not the secret) and keep
the token in the environment or in CI secrets, never in the file.

### Getting a token

With the `gh` CLI:

```sh
gh auth refresh -h github.com -s read:packages,repo
export GITHUB_TOKEN=$(gh auth token)
```

By hand: open
[github.com/settings/tokens/new](https://github.com/settings/tokens/new?scopes=read:packages,repo&description=GitHub%20Packages%20read)
— or **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate
new token (classic)** — tick `read:packages` **and** `repo`, set an expiry, and generate. Copy
the value straight away; GitHub shows it once.

GitHub Packages accepts classic tokens only; fine-grained tokens do not work on its npm
registry. If the `aardling` organisation has SSO enabled, authorise the token for it after
generating — **Configure SSO → Authorize** beside the token — or it is refused whatever its
scopes. In GitHub Actions you need no personal token — use the workflow's own
`GITHUB_TOKEN` with `permissions: packages: read`.

Then:

```sh
npm install @aardling/brand-dddacademy
```

## Layout

| Path | Contents |
| --- | --- |
| `tokens/tokens.json` | Design tokens as data (colours, type, spacing). |
| `tokens/tokens.css` | The same tokens as CSS custom properties. |
| `assets/logos/` | Logo files (SVG preferred). |
| `assets/icons/` | Icon set. |
| `assets/images/` | Photography, illustrations, patterns. |
| `assets/fonts/` | Webfonts, if licensing allows redistribution. |
| `guidelines/` | Written guidelines: voice, usage rules, do/don't. |
| `skills/dddacademy-brand/` | Claude Code skill teaching agents to apply this brand. |

## Using the skill

Copy or symlink the skill into a consuming project:

```sh
ln -s ../../node_modules/@aardling/brand-dddacademy/skills/dddacademy-brand .claude/skills/dddacademy-brand
```

## Rules

This package contains **only** dddacademy. It never references or imports another brand.
