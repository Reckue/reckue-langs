export class Store {

    isAppEnable = () => {
        return new Promise(resolve => chrome.storage.local.get(['enable'], (app) => resolve(app.enable)));
    }

    //TODO:: Заменить старый метод в Wordbook
    saveWordbooks = (wordbooks) => {
        chrome.storage.local.set(wordbooks);
    }

    getByName = (name) => {
        return new Promise(resolve => chrome.storage.local.get([name], (app) => resolve(app[name])));
    }
}