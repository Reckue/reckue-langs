import {ApiConfig} from './ApiConfig.js';
import {Logger} from '../Logger.js';

/**
 * ApiService - Основной сервис для работы с reckue.com API
 * 
 * НОВАЯ ЛОГИКА АВТОРИЗАЦИИ:
 * 1. При первом вызове tempAuth() автоматически создается временный пользователь
 *    через /api/1/temp-users/create
 * 2. Полученный tempId сохраняется в chrome.storage.local
 * 3. При последующих вызовах используется сохраненный tempId для авторизации
 * 4. Авторизация выполняется через /api/1/auth/tempin с передачей tempId в body
 * 
 * Это решает проблему, когда мы пытались авторизоваться без создания пользователя.
 */

export class ApiService {
    #logger;
    #token;
    #tempUserId;
    
    constructor() {
        this.#logger = new Logger();
        this.#token = null;
        this.#tempUserId = null;
    }
    
    // Auth methods
    async tempAuth() {
        try {
            // Сначала пытаемся получить сохраненный tempId из chrome.storage.local
            let tempId = await this.#getStoredTempId();
            
            // Если tempId нет, создаем нового временного пользователя
            if (!tempId) {
                tempId = await this.#createTempUser();
                await this.#storeTempId(tempId);
            }
            
            // Теперь делаем авторизацию с полученным tempId
            const response = await fetch(ApiConfig.getFullUrl(ApiConfig.AUTH_TEMP_IN), {
                method: 'POST',
                headers: ApiConfig.getHeaders(),
                body: JSON.stringify({
                    tempId: tempId
                })
            });
            
            if (!response.ok) {
                throw new Error(`Temp auth failed: ${response.status}`);
            }
            
            const data = await response.json();
            this.#token = data.token;
            this.#tempUserId = data.userId;
            
            this.#logger.log('Temp auth successful');
            return data;
        } catch (error) {
            this.#logger.log(`Temp auth error: ${error.message}`);
            throw error;
        }
    }
    
    // Создание временного пользователя
    async #createTempUser() {
        try {
            const response = await fetch(ApiConfig.getFullUrl(ApiConfig.TEMP_USERS_CREATE), {
                method: 'POST',
                headers: ApiConfig.getHeaders()
            });
            
            if (!response.ok) {
                throw new Error(`Create temp user failed: ${response.status}`);
            }
            
            const tempId = await response.text(); // Получаем строку с ID
            this.#logger.log(`Temp user created with ID: ${tempId}`);
            return tempId;
        } catch (error) {
            this.#logger.log(`Create temp user error: ${error.message}`);
            throw error;
        }
    }
    
    // Сохранение tempId в chrome.storage.local
    async #storeTempId(tempId) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ tempUserId: tempId }, () => {
                this.#logger.log(`Temp ID stored: ${tempId}`);
                resolve();
            });
        });
    }
    
    // Получение tempId из chrome.storage.local
    async #getStoredTempId() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['tempUserId'], (result) => {
                const tempId = result.tempUserId;
                if (tempId) {
                    this.#logger.log(`Retrieved stored temp ID: ${tempId}`);
                }
                resolve(tempId);
            });
        });
    }
    
    async whoami() {
        if (!this.#token) {
            throw new Error('No token available');
        }
        
        try {
            const response = await fetch(ApiConfig.getFullUrl(ApiConfig.AUTH_WHOAMI), {
                method: 'GET',
                headers: ApiConfig.getHeaders(this.#token)
            });
            
            if (!response.ok) {
                throw new Error(`Whoami failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            this.#logger.log(`Whoami error: ${error.message}`);
            throw error;
        }
    }
    
    // Wordbooks methods
    async getWordbooks() {
        if (!this.#token) {
            throw new Error('No token available');
        }
        
        try {
            const response = await fetch(ApiConfig.getFullUrl(ApiConfig.WORDBOOKS), {
                method: 'GET',
                headers: ApiConfig.getHeaders(this.#token)
            });
            
            if (!response.ok) {
                throw new Error(`Get wordbooks failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            this.#logger.log(`Get wordbooks error: ${error.message}`);
            throw error;
        }
    }
    
    async getMainWordbook() {
        if (!this.#token) {
            throw new Error('No token available');
        }
        
        try {
            const response = await fetch(ApiConfig.getFullUrl(ApiConfig.WORDBOOKS_MAIN), {
                method: 'GET',
                headers: ApiConfig.getHeaders(this.#token)
            });
            
            if (!response.ok) {
                throw new Error(`Get main wordbook failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            this.#logger.log(`Get main wordbook error: ${error.message}`);
            throw error;
        }
    }
    
    async getWordbookWords(wordbookId, page = 0, size = 100, filter = '') {
        if (!this.#token) {
            throw new Error('No token available');
        }
        
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                size: size.toString()
            });
            
            if (filter) {
                params.append('filter', filter);
            }
            
            const response = await fetch(
                `${ApiConfig.getFullUrl(ApiConfig.WORDBOOK_WORDS)}/${wordbookId}?${params}`,
                {
                    method: 'POST',
                    headers: ApiConfig.getHeaders(this.#token)
                }
            );
            
            if (!response.ok) {
                throw new Error(`Get wordbook words failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            this.#logger.log(`Get wordbook words error: ${error.message}`);
            throw error;
        }
    }
    
    async addWord(wordbookId, word, level = 1) {
        if (!this.#token) {
            throw new Error('No token available');
        }
        
        try {
            const response = await fetch(ApiConfig.getFullUrl(ApiConfig.WORDBOOK_WORDS), {
                method: 'POST',
                headers: ApiConfig.getHeaders(this.#token),
                body: JSON.stringify({
                    wordbookId: wordbookId,
                    word: word,
                    level: level
                })
            });
            
            if (!response.ok) {
                throw new Error(`Add word failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            this.#logger.log(`Add word error: ${error.message}`);
            throw error;
        }
    }
    
    async updateWordLevel(wordbookId, wordId, level) {
        if (!this.#token) {
            throw new Error('No token available');
        }
        
        try {
            const response = await fetch(ApiConfig.getFullUrl(ApiConfig.WORDBOOK_WORDS_LEVELS), {
                method: 'POST',
                headers: ApiConfig.getHeaders(this.#token),
                body: JSON.stringify({
                    wordbookId: wordbookId,
                    wordId: wordId,
                    level: level
                })
            });
            
            if (!response.ok) {
                throw new Error(`Update word level failed: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            this.#logger.log(`Update word level error: ${error.message}`);
            throw error;
        }
    }
    
    // Getters
    getToken() {
        return this.#token;
    }
    
    getTempUserId() {
        return this.#tempUserId;
    }
    
    isAuthenticated() {
        return !!this.#token;
    }
    
    // Очистка сохраненного tempId
    async clearStoredTempId() {
        return new Promise((resolve) => {
            chrome.storage.local.remove(['tempUserId'], () => {
                this.#logger.log('Stored temp ID cleared');
                resolve();
            });
        });
    }
}