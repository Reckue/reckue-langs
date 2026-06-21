import {Context} from "./Context";

export class Store {

    appParams = (): Promise<boolean> => {
        return new Promise(resolve => {
            chrome.storage.local.get(['enable', "russian", "english", "china", "korean"], (app) => {
                Context.add("settings", app);
                resolve(app.enable as boolean);
            })
        });
    }

    //TODO:: Заменить старый метод в Wordbook
    saveWordbooks = (wordbooks: Record<string, any>) => {
        chrome.storage.local.set(wordbooks);
    }

    removeWordbooks = (keys: string[]) => {
        chrome.storage.local.remove(keys);
    }

    getByName = (name: string): Promise<any> => {
        return new Promise(resolve => chrome.storage.local.get([name], (app) => resolve(app[name])));
    }
}
