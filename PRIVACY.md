# Privacy Policy — Reckue Languages

_Last updated: 20 June 2026_

Reckue Languages ("the extension") is a browser extension that lets you save and
highlight vocabulary words while you browse the web and read PDFs.

## What data the extension handles

The extension stores the following **only on your own device**, using the
browser's local storage (`chrome.storage.local`):

- The words you save and their knowledge levels (your wordbook)
- Your settings (enabled languages, highlight mode, etc.)

## What the extension does NOT do

- It does **not** send your data anywhere. The extension makes no external
  network requests — nothing leaves your browser.
- It does **not** collect, sell, or share personal information.
- It does **not** track your browsing history and uses **no** analytics.
- It shows **no** ads.

## Permissions and why they are needed

- **storage / unlimitedStorage** — save your wordbook and settings locally,
  without a storage size cap.
- **scripting / tabs / activeTab** — highlight your saved words on the page you
  are reading, and refresh highlighting on the active tab from the popup.
- **declarativeNetRequest** — open PDF files in the extension's built-in reader
  so words can be highlighted in PDFs. It only redirects PDF page navigations;
  it does not read, block, or modify any other network traffic.
- **host access (all sites)** — so the extension can highlight your saved words
  on any website you choose to read.

## Data deletion

Your data lives entirely in your browser. Removing the extension, or clearing
the browser's extension storage, permanently deletes it.

## Contact

Questions or concerns? Open an issue at
<https://github.com/Reckue/reckue-langs/issues>.
