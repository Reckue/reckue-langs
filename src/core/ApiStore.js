import {Context} from "./Context";
import {ApiService} from "./api/ApiService";

export class ApiStore {

    #apiService;

    constructor() {
        this.#apiService = new ApiService();
    }

    appParams = () => {
        return new Promise(async (resolve) => {
            try {
                // Проверяем авторизацию
                const isAuth = await this.#apiService.ensureAuth();
                
                // Загружаем настройки из localStorage (для совместимости)
                chrome.storage.local.get(['enable', "russian", "english", "china", "korean"], (app) => {
                    Context.add("settings", app);
                    resolve(app.enable);
                });
            } catch (error) {
                // В случае ошибки API, используем локальные настройки
                chrome.storage.local.get(['enable', "russian", "english", "china", "korean"], (app) => {
                    Context.add("settings", app);
                    resolve(app.enable);
                });
            }
        });
    }

    saveWordbooks = (wordbooks) => {
        // Для совместимости сохраняем в localStorage
        chrome.storage.local.set(wordbooks);
    }

    getByName = (name) => {
        return new Promise(resolve => chrome.storage.local.get([name], (app) => resolve(app[name])));
    }

    /**
     * Получает API сервис
     */
    getApiService = () => {
        return this.#apiService;
    }

    /**
     * Проверяет авторизацию
     */
    ensureAuth = async () => {
        return await this.#apiService.ensureAuth();
    }

    /**
     * Получает текущего пользователя
     */
    getCurrentUser = async () => {
        return await this.#apiService.getCurrentUser();
    }
}