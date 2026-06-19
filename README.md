# Reckue Languages

> An interactive vocabulary builder for Chrome — click words on any page to save, highlight, and turn them into flashcards.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/github/package-json/v/Reckue/reckue-langs)](https://github.com/Reckue/reckue-langs)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Issues](https://img.shields.io/github/issues/Reckue/reckue-langs)](https://github.com/Reckue/reckue-langs/issues)

## What it does

Reckue Languages is a Chrome extension (Manifest V3) that builds your vocabulary as you read. Browse the web normally; when you hit a word worth remembering, click it. The word is saved to your personal wordbook, highlighted on the page, and available as a flashcard in the popup.

Saved words stay highlighted across pages, so you keep seeing them in context — which is what makes them stick.

## Features

- Save words with a single click on any page
- Per-level highlighting via the CSS Custom Highlight API (the page's own DOM is left untouched)
- A popup wordbook to review and manage what you've collected
- Works inside iframes and shadow DOM

![Extension in action](img_2.png)

## Build & install (development)

The extension is built from TypeScript with Webpack. To run it locally as an unpacked extension:

**1. Install dependencies**

```sh
npm install
```

**2. Build the bundles**

```sh
npm run build
```

This compiles the source in `src/` into the loadable bundles:

- `dist/page/page.js` — content script
- `dist/popup/popup.js` — popup UI

**3. Load it into Chrome**

1. Open `chrome://extensions/`.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this project's root folder (the one containing `manifest.json`).

![Load unpacked](img_1.png)

**4. Try it**

Open any web page and click a word — it should be saved and highlighted. Open the extension popup to review your wordbook.

## Tech stack

- **TypeScript** (`target: es2022`), bundled with **Webpack 5** + `ts-loader`
- **Content script** (`src/page/*`) — vanilla TypeScript, direct DOM work, highlighting via the CSS Custom Highlight API
- **Popup** (`src/popup/ui/*`) — [Preact](https://preactjs.com/)

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow, branch and commit conventions, and how to open a pull request. Found a bug or have an idea? [Open an issue](https://github.com/Reckue/reckue-langs/issues).

## License

Licensed under the Apache License 2.0. See [LICENSE](LICENSE).
