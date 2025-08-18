import {Logger} from '../Logger.js';

export class ApiUtils {
    #logger;
    
    constructor() {
        this.#logger = new Logger();
    }
    
    static async handleApiResponse(response) {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }
        
        try {
            return await response.json();
        } catch (error) {
            throw new Error(`Failed to parse JSON response: ${error.message}`);
        }
    }
    
    static validateWord(word) {
        if (!word || typeof word !== 'string') {
            throw new Error('Word must be a non-empty string');
        }
        
        if (word.trim().length === 0) {
            throw new Error('Word cannot be empty');
        }
        
        return word.trim().toLowerCase();
    }
    
    static validateLevel(level) {
        const validLevels = [1, 2, 3, 4];
        if (!validLevels.includes(level)) {
            throw new Error(`Invalid level: ${level}. Must be one of: ${validLevels.join(', ')}`);
        }
        return level;
    }
    
    static validateWordbookId(wordbookId) {
        if (!wordbookId || typeof wordbookId !== 'string') {
            throw new Error('Wordbook ID must be a non-empty string');
        }
        return wordbookId;
    }
    
    static async retryRequest(requestFn, maxRetries = 3, delay = 1000) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await requestFn();
            } catch (error) {
                lastError = error;
                
                if (attempt === maxRetries) {
                    throw error;
                }
                
                // Ждем перед повторной попыткой
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
            }
        }
        
        throw lastError;
    }
    
    static isNetworkError(error) {
        return error.name === 'TypeError' && error.message.includes('fetch');
    }
    
    static isAuthError(error) {
        return error.message.includes('401') || error.message.includes('403');
    }
    
    static formatError(error) {
        if (this.isNetworkError(error)) {
            return 'Network error. Please check your internet connection.';
        }
        
        if (this.isAuthError(error)) {
            return 'Authentication error. Please try refreshing the page.';
        }
        
        return error.message || 'Unknown error occurred';
    }
}