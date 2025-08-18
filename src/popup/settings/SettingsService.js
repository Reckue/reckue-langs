import {SettingsBuilder} from "./SettingsBuilder";
import {ApiSettingsService} from "../../core/api/ApiSettingsService.js";

export class SettingsService {

    #builder;
    #settingsService;

    constructor() {
        this.#builder = new SettingsBuilder();
        this.#settingsService = new ApiSettingsService();
    }

    fillSettings = async () => {
        try {
            // Инициализируем API сервис настроек
            await this.#settingsService.initialize();
            
            const settings = this.#settingsService.getSettings();
            this.#setupSettings(settings);
        } catch (error) {
            console.error('Failed to load settings:', error);
            // Fallback на дефолтные настройки
            const defaultSettings = {
                enable: true, 
                russian: true, 
                english: true, 
                china: false, 
                korean: true
            };
            this.#setupSettings(defaultSettings);
        }
    }

    #setupSettings = (settings) => {
        this.#builder.loadLevers();
        this.#setupEnableAppLever(settings.enable);
        this.#setupLangLevers(settings);
    }

    #setupEnableAppLever = (enable) => {
        this.#builder.setupAppEnableLever(this.#changeEnable);
        this.#builder.renderAppEnableLever(enable);
    }

    #setupLangLevers = (settings) => {
        //TODO:: Clean code (Remove duplicate)
        this.#builder.setupRussianEnableLever(this.#changeEnable);
        this.#builder.renderRussianEnableLever(settings.russian);
        this.#builder.setupKoreanEnableLever(this.#changeEnable);
        this.#builder.renderKoreanEnableLever(settings.korean);
        this.#builder.setupEnglishEnableLever(this.#changeEnable);
        this.#builder.renderEnglishEnableLever(settings.english);
        this.#builder.setupChinaEnableLever(this.#changeEnable);
        this.#builder.renderChinaEnableLever(settings.china);
    }

    #changeEnable = async (lever, name) => {
        try {
            await this.#settingsService.updateSetting(name, !this.#settingsService.getSetting(name));
            this.#builder.renderLever(lever, this.#settingsService.getSetting(name));
        } catch (error) {
            console.error('Failed to update setting:', error);
        }
    };
}