# Contributing to Reckue Languages

Thanks for your interest in contributing. This guide covers the local setup and the conventions we follow.

## Getting started

```sh
npm install      # install dependencies
npm run build    # build the extension bundles into dist/
npm run typecheck # type-check without emitting
```

Load the unpacked extension from the project root (the folder with `manifest.json`) via `chrome://extensions/` → **Developer mode** → **Load unpacked**. See the [README](README.md#build--run-from-source-development) for the full walkthrough.

## Project layout

Two independent surfaces, built as separate bundles:

- **Content script** — `src/page/*` → `dist/page/page.js`. Vanilla TypeScript, direct DOM work, highlighting via the CSS Custom Highlight API. **No React/Preact here.**
- **Popup** — `src/popup/ui/*` → `dist/popup/popup.js`. Preact.

The shared data layer (`src/core/words/*`) is plain TypeScript and is used by both — keep it framework-free.

## Branches

Branches follow the pattern `version/<x.y.z>_<slug>`, where the slug names the feature or area of work — e.g. `version/0.6.7_shadow_dom`. Several features may run in parallel under nearby versions.

## Commits

- Keep messages short and to the point.
- Prefix with the version when relevant: `[version X.Y.Z] <description>`.
- Bump the version in its own commit.

We follow [SemVer](https://semver.org/) on the `0.x` track until 1.0:

- **PATCH** (`0.x.N`) — bug fixes and small UI tweaks.
- **MINOR** (`0.N.0`) — new features and notable behavior changes.

When bumping the version, update **both** `manifest.json` and `package.json` to the same value in the same commit — the runtime reads the version from `manifest.json`.

## Pull requests

- Integration happens through pull requests into `master`. Direct pushes to `master` are not accepted.
- Before opening a PR, make sure `npm run build` and `npm run typecheck` both pass. CI runs these on every PR.
- Keep PRs focused; describe what changed and why.

## Reporting bugs and requesting features

Use the [issue tracker](https://github.com/Reckue/reckue-langs/issues). For bugs, include steps to reproduce, the page or context where it happens, and your browser version.
