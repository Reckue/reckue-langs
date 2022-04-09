import {Context} from "./Context";

export class Store {

    appParams = () => {
        return new Promise(resolve => {
            chrome.storage.local.get(['enable', "russian", "english", "china", "korean"], (app) => {
                Context.add("settings", app);
                resolve(app.enable);
            })
        });
    }

    //TODO:: Заменить старый метод в Wordbook
    saveWordbooks = (wordbooks) => {
        chrome.storage.local.set(wordbooks);
    }

    getByName = (name) => {
        return new Promise(resolve => chrome.storage.local.get([name], (app) => resolve(app[name])));
    }
}