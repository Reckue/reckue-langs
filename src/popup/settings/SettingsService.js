import {SettingsBuilder} from "./SettingsBuilder";

export class SettingsService {

    #builder;
    #settings;

    constructor() {
        this.#builder = new SettingsBuilder();
        this.#settings = {enable: true, russian: true, english: true, china: true, korean: true}
    }

    fillSettings = () => {
        chrome.storage.local.get(['enable', 'russian', "english", "china", "korean"], (settings) => this.#setupSettings(settings));
    }

    #setupSettings = (settings) => {
        this.#settings = settings;
        this.#builder.loadLevers();
        this.#setupEnableAppLever();
        this.#setupLangLevers();
    }

    #setupEnableAppLever = () => {
        this.#builder.setupAppEnableLever(this.#changeEnable);
        this.#builder.renderAppEnableLever(this.#settings.enable);
    }

    #setupLangLevers = () => {
        this.#builder.setupRussianEnableLever(this.#changeEnable);
        this.#builder.renderRussianEnableLever(this.#settings.russian);
        this.#builder.setupKoreanEnableLever(this.#changeEnable);
        this.#builder.renderKoreanEnableLever(this.#settings.korean);
        this.#builder.setupEnglishEnableLever(this.#changeEnable);
        this.#builder.renderEnglishEnableLever(this.#settings.english);
        this.#builder.setupChinaEnableLever(this.#changeEnable);
        this.#builder.renderChinaEnableLever(this.#settings.china);
    }

    #changeEnable = (lever, name) => {
        this.#settings[name] = !this.#settings[name];
        chrome.storage.local.set(this.#settings, () => {
            this.#builder.renderLever(lever, this.#settings[name]);
        });
    };
}