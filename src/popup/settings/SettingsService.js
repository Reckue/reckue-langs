import {SettingsBuilder} from "./SettingsBuilder";

export class SettingsService {

    #builder;
    #settings;

    constructor() {
        this.#builder = new SettingsBuilder();
        this.#settings = {enable: true}
    }

    fillSettings = () => {
        chrome.storage.local.get(['enable'], (settings) => this.#setupSettings(settings));
    }

    #setupSettings = (settings) => {
        this.#settings = settings;
        this.#setupEnableAppLever();
    }

    #setupEnableAppLever = () => {
        this.#builder.setupAppEnableLever(this.#changeEnable);
        this.#builder.renderEnableLever(this.#settings.enable);
    }

    #changeEnable = () => {
        this.#settings.enable = !this.#settings.enable;
        chrome.storage.local.set({enable: this.#settings.enable}, () => {
            this.#builder.renderEnableLever(this.#settings.enable);
        });
    };
}