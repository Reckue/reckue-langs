import {ApiService} from './ApiService.js';
import {Wordbook} from '../words/Wordbook.js';
import {Logger} from '../Logger.js';

export class ApiWordbookAdapter {
    #apiService;
    #logger;
    #currentWordbook;
    #wordbookCache;
    
    constructor() {
        this.#apiService = new ApiService();
        this.#logger = new Logger();
        this.#currentWordbook = null;
        this.#wordbookCache = new Map();
    }
    
    async initialize() {
        try {
            // Авторизация через temp auth
            await this.#apiService.tempAuth();
            this.#logger.log('API adapter initialized successfully');
            return true;
        } catch (error) {
            this.#logger.log(`API adapter initialization failed: ${error.message}`);
            return false;
        }
    }
    
    async loadMainWordbook() {
        try {
            const wordbookData = await this.#apiService.getMainWordbook();
            this.#currentWordbook = wordbookData;
            
            // Загружаем слова из основного словаря
            await this.loadWordbookWords(wordbookData.id);
            
            this.#logger.log(`Main wordbook loaded: ${wordbookData.language}`);
            return wordbookData;
        } catch (error) {
            this.#logger.log(`Load main wordbook failed: ${error.message}`);
            throw error;
        }
    }
    
    async loadWordbookWords(wordbookId, page = 0, size = 100) {
        try {
            const wordsData = await this.#apiService.getWordbookWords(wordbookId, page, size);
            
            // Преобразуем данные в формат, совместимый с Wordbook
            const words = wordsData.content.map(item => ({
                word: item.word,
                level: item.level
            }));
            
            // Кэшируем слова
            words.forEach(wordData => {
                this.#wordbookCache.set(wordData.word, wordData.level);
            });
            
            this.#logger.log(`Loaded ${words.length} words from wordbook ${wordbookId}`);
            return words;
        } catch (error) {
            this.#logger.log(`Load wordbook words failed: ${error.message}`);
            throw error;
        }
    }
    
    async addWord(word, level = 1) {
        if (!this.#currentWordbook) {
            throw new Error('No current wordbook available');
        }
        
        try {
            await this.#apiService.addWord(this.#currentWordbook.id, word, level);
            
            // Обновляем локальный кэш
            this.#wordbookCache.set(word, level);
            
            this.#logger.log(`Word added: ${word} (level ${level})`);
            return true;
        } catch (error) {
            this.#logger.log(`Add word failed: ${error.message}`);
            throw error;
        }
    }
    
    async updateWordLevel(word, level) {
        if (!this.#currentWordbook) {
            throw new Error('No current wordbook available');
        }
        
        try {
            // Находим wordId в кэше (в реальной реализации нужно получить wordId из API)
            const wordId = this.findWordId(word);
            if (!wordId) {
                throw new Error(`Word not found: ${word}`);
            }
            
            await this.#apiService.updateWordLevel(this.#currentWordbook.id, wordId, level);
            
            // Обновляем локальный кэш
            this.#wordbookCache.set(word, level);
            
            this.#logger.log(`Word level updated: ${word} -> ${level}`);
            return true;
        } catch (error) {
            this.#logger.log(`Update word level failed: ${error.message}`);
            throw error;
        }
    }
    
    // Методы для совместимости с существующим WordbookService
    getWordbookCache() {
        return this.#wordbookCache;
    }
    
    getFilteredWordbook(filter) {
        const filtered = new Map();
        this.#wordbookCache.forEach((level, word) => {
            if (word.includes(filter)) {
                filtered.set(word, level);
            }
        });
        return filtered;
    }
    
    // Вспомогательные методы
    findWordId(word) {
        // В реальной реализации нужно получить wordId из API или кэша
        // Пока возвращаем null, так как wordId не хранится в локальном кэше
        return null;
    }
    
    getCurrentWordbook() {
        return this.#currentWordbook;
    }
    
    isInitialized() {
        return this.#apiService.isAuthenticated();
    }
}