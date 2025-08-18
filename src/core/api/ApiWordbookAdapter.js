import {ApiService} from './ApiService.js';
import {Wordbook} from '../words/Wordbook.js';
import {Logger} from '../Logger.js';

export class ApiWordbookAdapter {
    #apiService;
    #logger;
    #currentWordbook;
    #wordbookCache;
    #executeAfter;
    
    constructor() {
        this.#apiService = new ApiService();
        this.#logger = new Logger();
        this.#currentWordbook = null;
        this.#wordbookCache = new Map();
    }
    
    // Методы для совместимости с WordbookService
    executeAfter = (after) => {
        this.#executeAfter = after;
    }
    
    set = async (words) => {
        for (const wordData of words) {
            await this.addWord(wordData.word, wordData.level);
        }
    }
    
    remove = async (word) => {
        if (!this.#currentWordbook) {
            throw new Error('No current wordbook available');
        }
        
        try {
            // Удаляем слово из API (если есть такой метод)
            // await this.#apiService.removeWord(this.#currentWordbook.id, word);
            
            // Удаляем из локального кэша
            this.#wordbookCache.delete(word);
            
            this.#logger.log(`Word removed: ${word}`);
        } catch (error) {
            this.#logger.log(`Remove word failed: ${error.message}`);
            throw error;
        }
    }
    
    getWordbook = () => {
        const wordbook = new Wordbook();
        const words = [];
        this.#wordbookCache.forEach((level, word) => {
            words.push({word, level});
        });
        wordbook.set(words);
        return wordbook;
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
            // Для простоты пока обновляем только локальный кэш
            // В реальной реализации нужно получить wordId из API
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
        const filtered = [];
        this.#wordbookCache.forEach((level, word) => {
            if (word.includes(filter)) {
                filtered.push({word, level});
            }
        });
        const wordbook = new Wordbook();
        wordbook.set(filtered);
        return wordbook;
    }
    
    // Методы для совместимости с локальным режимом
    loadWordbooks = () => {
        // Для API режима этот метод не нужен, но оставляем для совместимости
        if (this.#executeAfter) {
            this.#executeAfter();
        }
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