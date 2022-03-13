export class WBStorage {

    setWordbooks = (wordbooks) => {
        chrome.storage.local.set(wordbooks);
    }
}