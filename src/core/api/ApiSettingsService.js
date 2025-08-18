import {ApiService} from './ApiService.js';
import {Logger} from '../Logger.js';

export class ApiSettingsService {
    #apiService;
    #logger;
    #settings;
    
    constructor() {
        this.#apiService = new ApiService();
        this.#logger = new Logger();
        this.#settings = {
            enable: true, 
            russian: true, 
            english: true, 
            china: false, 
            korean: true
        };
    }
    
    async initialize() {
        try {
            // Авторизация через temp auth
            await this.#apiService.tempAuth();
            
            // Загружаем настройки из API или используем дефолтные
            await this.loadSettings();
            
            this.#logger.log('API settings service initialized successfully');
            return true;
        } catch (error) {
            this.#logger.log(`API settings service initialization failed: ${error.message}`);
            return false;
        }
    }
    
    async loadSettings() {
        try {
            // Пока используем дефолтные настройки
            // В будущем можно добавить API endpoint для настроек
            this.#logger.log('Settings loaded from defaults');
            return this.#settings;
        } catch (error) {
            this.#logger.log(`Load settings failed: ${error.message}`);
            return this.#settings;
        }
    }
    
    async saveSettings(settings) {
        try {
            this.#settings = { ...this.#settings, ...settings };
            
            // В будущем можно добавить API endpoint для сохранения настроек
            this.#logger.log('Settings saved');
            return true;
        } catch (error) {
            this.#logger.log(`Save settings failed: ${error.message}`);
            throw error;
        }
    }
    
    async updateSetting(key, value) {
        try {
            this.#settings[key] = value;
            await this.saveSettings({ [key]: value });
            this.#logger.log(`Setting updated: ${key} = ${value}`);
            return true;
        } catch (error) {
            this.#logger.log(`Update setting failed: ${error.message}`);
            throw error;
        }
    }
    
    getSettings() {
        return this.#settings;
    }
    
    getSetting(key) {
        return this.#settings[key];
    }
    
    isEnabled() {
        return this.#settings.enable;
    }
    
    getLanguageSettings() {
        return {
            russian: this.#settings.russian,
            english: this.#settings.english,
            china: this.#settings.china,
            korean: this.#settings.korean
        };
    }
}
