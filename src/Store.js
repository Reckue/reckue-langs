export class Store {

    isAppEnable = () => {
        return new Promise(resolve => chrome.storage.local.get(['enable'], (app) => resolve(app.enable)));
    }
}