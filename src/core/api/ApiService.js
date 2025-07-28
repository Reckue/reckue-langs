import {Logger} from "../Logger";

export class ApiService {
    #baseUrl = 'https://api.reckue.com/api/1';
    #tempToken = null;
    #logger = new Logger();

    constructor() {
        this.#loadTempToken();
    }

    /**
     * Загружает временный токен из localStorage
     */
    #loadTempToken = () => {
        this.#tempToken = localStorage.getItem('reckue_temp_token');
    }

    /**
     * Сохраняет временный токен в localStorage
     */
    #saveTempToken = (token) => {
        this.#tempToken = token;
        localStorage.setItem('reckue_temp_token', token);
    }

    /**
     * Выполняет HTTP запрос с авторизацией
     */
    #request = async (endpoint, options = {}) => {
        const url = `${this.#baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.#tempToken) {
            headers['Authorization'] = `Bearer ${this.#tempToken}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.#logger.log(`API request failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Авторизация через temp-in
     */
    tempAuth = async () => {
        try {
            const response = await this.#request('/auth/tempin', {
                method: 'POST',
                body: JSON.stringify({})
            });
            
            if (response.token) {
                this.#saveTempToken(response.token);
                this.#logger.log('Temporary authentication successful');
                return true;
            }
            return false;
        } catch (error) {
            this.#logger.log('Temporary authentication failed');
            return false;
        }
    }

    /**
     * Получение информации о текущем пользователе
     */
    getCurrentUser = async () => {
        try {
            return await this.#request('/auth/whoami');
        } catch (error) {
            this.#logger.log('Failed to get current user');
            return null;
        }
    }

    /**
     * Получение всех словарей пользователя
     */
    getWordbooks = async () => {
        try {
            return await this.#request('/wordbooks');
        } catch (error) {
            this.#logger.log('Failed to get wordbooks');
            return [];
        }
    }

    /**
     * Получение основного словаря
     */
    getMainWordbook = async () => {
        try {
            return await this.#request('/wordbooks/main');
        } catch (error) {
            this.#logger.log('Failed to get main wordbook');
            return null;
        }
    }

    /**
     * Получение слов из словаря с пагинацией
     */
    getWords = async (wordbookId, page = 0, size = 50, filter = '') => {
        try {
            const body = {
                page: page,
                size: size
            };

            if (filter) {
                body.filter = filter;
            }

            return await this.#request(`/wordbook/words/${wordbookId}`, {
                method: 'POST',
                body: JSON.stringify(body)
            });
        } catch (error) {
            this.#logger.log('Failed to get words');
            return { content: [], totalElements: 0 };
        }
    }

    /**
     * Добавление слова в словарь
     */
    addWord = async (wordbookId, word, level = 1) => {
        try {
            return await this.#request('/wordbook/words', {
                method: 'POST',
                body: JSON.stringify({
                    wordbookId: wordbookId,
                    word: word,
                    level: level
                })
            });
        } catch (error) {
            this.#logger.log('Failed to add word');
            return null;
        }
    }

    /**
     * Добавление списка слов
     */
    addWordsList = async (wordbookId, words) => {
        try {
            const wordsList = words.map(word => ({
                wordbookId: wordbookId,
                word: word.word || word,
                level: word.level || 1
            }));

            return await this.#request('/wordbook/words/list', {
                method: 'POST',
                body: JSON.stringify(wordsList)
            });
        } catch (error) {
            this.#logger.log('Failed to add words list');
            return null;
        }
    }

    /**
     * Обновление уровня слова
     */
    updateWordLevel = async (wordbookId, wordId, level) => {
        try {
            return await this.#request('/wordbook/words/levels', {
                method: 'POST',
                body: JSON.stringify({
                    wordbookId: wordbookId,
                    wordId: wordId,
                    level: level
                })
            });
        } catch (error) {
            this.#logger.log('Failed to update word level');
            return null;
        }
    }

    /**
     * Удаление слова
     */
    deleteWord = async (wordbookId, wordId) => {
        try {
            return await this.#request('/wordbook/words', {
                method: 'DELETE',
                body: JSON.stringify({
                    wordbookId: wordbookId,
                    wordId: wordId
                })
            });
        } catch (error) {
            this.#logger.log('Failed to delete word');
            return null;
        }
    }

    /**
     * Создание нового словаря
     */
    createWordbook = async (language) => {
        try {
            return await this.#request('/wordbooks', {
                method: 'POST',
                body: JSON.stringify({
                    language: language
                })
            });
        } catch (error) {
            this.#logger.log('Failed to create wordbook');
            return null;
        }
    }

    /**
     * Получение словарей по языку
     */
    getWordbooksByLanguage = async (language) => {
        try {
            return await this.#request(`/wordbooks/language/${language}`);
        } catch (error) {
            this.#logger.log('Failed to get wordbooks by language');
            return [];
        }
    }

    /**
     * Проверка авторизации и автоматическая авторизация при необходимости
     */
    ensureAuth = async () => {
        if (!this.#tempToken) {
            return await this.tempAuth();
        }
        
        // Проверяем, что токен еще действителен
        try {
            await this.getCurrentUser();
            return true;
        } catch (error) {
            // Токен истек, получаем новый
            return await this.tempAuth();
        }
    }
}