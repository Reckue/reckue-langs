import {ApiConfig} from './ApiConfig.js';
import {Logger} from '../Logger.js';

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
            const response = await fetch(ApiConfig.getFullUrl(ApiConfig.AUTH_TEMP_IN), {
                method: 'POST',
                headers: ApiConfig.getHeaders(),
                body: JSON.stringify({})
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
            const response = await fetch(`${ApiConfig.getFullUrl(ApiConfig.WORDBOOK_WORDS)}/levels`, {
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
}