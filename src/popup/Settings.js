export class Settings {

    #lever = window.document.getElementsByClassName('lever')[0];
    #settings = {};

    init = () => {
        chrome.storage.local.get(['enable'], (result) => {
            this.#settings.enable = result.enable;
            this.#changeStyles();
        });
        this.#lever.addEventListener('click', () => this.#changeEnable());
    }


    #changeEnable = () => {
        this.#settings.enable = !this.#settings.enable;
        chrome.storage.local.set({enable: settings.enable}, () => {
            this.#changeStyles();
        });
    };

    #changeStyles = () => {
        this.#lever.style.justifyContent = this.#settings.enable ? 'flex-start' : 'flex-end';
        this.#lever.style.background = this.#settings.enable ? '#c2d7bf' : '#d7d7d7';
    };
}