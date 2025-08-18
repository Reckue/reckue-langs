export class ApiConfig {
    static BASE_URL = 'https://api.reckue.com';
    static API_VERSION = '/api/1';
    
    // Auth endpoints
    static AUTH_TEMP_IN = '/auth/tempin';
    static AUTH_WHOAMI = '/auth/whoami';
    
    // Wordbooks endpoints
    static WORDBOOKS = '/wordbooks';
    static WORDBOOKS_MAIN = '/wordbooks/main';
    static WORDBOOKS_LANGUAGE = '/wordbooks/language';
    
    // Words endpoints
    static WORDS = '/words';
    static WORDBOOK_WORDS = '/wordbook/words';
    static WORDBOOK_WORDS_LEVELS = '/wordbook/words/levels';
    
    // Texts endpoints
    static TEXTS = '/texts';
    
    // Users endpoints
    static USERS_CHECK = '/users/check';
    static TEMP_USERS = '/temp-users';
    
    static getFullUrl(endpoint) {
        return `${this.BASE_URL}${this.API_VERSION}${endpoint}`;
    }
    
    static getHeaders(token = null) {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    }
}