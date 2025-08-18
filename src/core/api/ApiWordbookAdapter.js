import {ApiService} from './ApiService.js';
import {ApiWordbook} from './ApiWordbook.js';
import {Logger} from '../Logger.js';

export class ApiWordbookAdapter {
    #apiService;
    #logger;
    #currentWordbook;
    #wordbookCache;
    #executeAfter;
    #onWordbookReadyCallbacks = [];
    
    constructor() {
        this.#apiService = new ApiService();
        this.#logger = new Logger();
        this.#currentWordbook = null;
        this.#wordbookCache = new ApiWordbook();
    }
    
    // Методы для совместимости с WordbookService
    executeAfter = (after) => {
        this.#executeAfter = after;
    }
    
    set = async (words) => {
        try {
            for (const wordData of words) {
                await this.addWord(wordData.word, wordData.level);
            }
        } catch (error) {
            this.#logger.log(`Set words failed: ${error.message}`);
            throw error;
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
            this.#wordbookCache.remove(word);
            
            this.#logger.log(`Word removed: ${word}`);
        } catch (error) {
            this.#logger.log(`Remove word failed: ${error.message}`);
            throw error;
        }
    }
    
    getWordbook = () => {
        return this.#wordbookCache;
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
            try {
                const words = await this.loadWordbookWords(wordbookData.id);
                this.#logger.log(`Successfully loaded ${words.length} words from wordbook`);
                
                // Проверяем, что слова действительно загружены
                if (words.length === 0) {
                    this.#logger.log('Warning: No words loaded from wordbook');
                }
            } catch (wordsError) {
                this.#logger.log(`Failed to load words, but continuing: ${wordsError.message}`);
                // Инициализируем пустой кэш
                this.#wordbookCache.set([]);
            }
            
            this.#logger.log(`Main wordbook loaded: ${wordbookData.language}`);
            return wordbookData;
        } catch (error) {
            this.#logger.log(`Load main wordbook failed: ${error.message}`);
            throw error;
        }
    }
    
    async loadWordbookWords(wordbookId, page = 0, size = 100) {
        try {
            this.#logger.log(`Loading words from wordbook ${wordbookId}, page ${page}, size ${size}`);
            const wordsData = await this.#apiService.getWordbookWords(wordbookId, page, size);
            
            this.#logger.log('Received words data:', wordsData);
            
            // Проверяем структуру данных и безопасно извлекаем слова
            let words = [];
            if (wordsData && wordsData.content && Array.isArray(wordsData.content)) {
                words = wordsData.content.map(item => ({
                    word: item.word,
                    level: item.level
                }));
            } else if (Array.isArray(wordsData)) {
                // Если API возвращает массив напрямую
                words = wordsData.map(item => ({
                    word: item.word,
                    level: item.level
                }));
            } else {
                this.#logger.log('Unexpected API response structure, using empty array');
                words = [];
            }
            
            // Кэшируем слова
            this.#wordbookCache.set(words);
            
            this.#logger.log(`Successfully loaded and cached ${words.length} words from wordbook ${wordbookId}`);
            
            // Уведомляем о готовности словаря, если есть слова
            if (words.length > 0) {
                this.#notifyWordbookReady();
            }
            
            return words;
        } catch (error) {
            this.#logger.log(`Load wordbook words failed: ${error.message}`);
            // Возвращаем пустой массив вместо выброса ошибки
            this.#wordbookCache.set([]);
            return [];
        }
    }
    
    async addWord(word, level = 1) {
        if (!this.#currentWordbook) {
            throw new Error('No current wordbook available');
        }
        
        try {
            // Преобразуем строковый уровень в числовой
            let numericLevel = 1;
            if (typeof level === 'string') {
                switch (level) {
                    case 'NATIVE':
                        numericLevel = 5;
                        break;
                    case 'ADVANCED':
                        numericLevel = 4;
                        break;
                    case 'INTERMEDIATE':
                        numericLevel = 3;
                        break;
                    case 'ELEMENTARY':
                        numericLevel = 2;
                        break;
                    case 'BEGINNER':
                        numericLevel = 1;
                        break;
                    default:
                        numericLevel = 1;
                }
            } else {
                numericLevel = level;
            }
            
            await this.#apiService.addWord(this.#currentWordbook.id, word, numericLevel);
            
            // Обновляем локальный кэш
            this.#wordbookCache.set([{word, level}]);
            
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
            this.#wordbookCache.set([{word, level}]);
            
            this.#logger.log(`Word level updated: ${word} -> ${level}`);
            return true;
        } catch (error) {
            this.#logger.log(`Update word level failed: ${error.message}`);
            throw error;
        }
    }
    
    // Методы для совместимости с существующим WordbookService
    getWordbookCache() {
        if (!this.#wordbookCache) {
            this.#logger.log('Wordbook cache not initialized, returning empty Map');
            return new Map();
        }
        return this.#wordbookCache.get();
    }
    
    getFilteredWordbook(filter) {
        const filtered = [];
        this.#wordbookCache.get().forEach((level, word) => {
            if (word.includes(filter)) {
                filtered.push({word, level});
            }
        });
        const wordbook = new ApiWordbook();
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
        return this.#apiService.isAuthenticated() && 
               this.#currentWordbook && 
               this.#wordbookCache && 
               this.#wordbookCache.get().size > 0;
    }
    
    isWordbookReady() {
        return this.isInitialized() && this.#wordbookCache.get().size > 0;
    }
    
    onWordbookReady(callback) {
        if (typeof callback === 'function') {
            this.#onWordbookReadyCallbacks.push(callback);
            
            // Если словарь уже готов, сразу вызываем callback
            if (this.isWordbookReady()) {
                this.#logger.log('Wordbook already ready, calling callback immediately');
                setTimeout(() => callback(), 0);
            }
        }
    }
    
    #notifyWordbookReady() {
        this.#logger.log(`Notifying ${this.#onWordbookReadyCallbacks.length} callbacks about wordbook ready`);
        this.#onWordbookReadyCallbacks.forEach(callback => {
            try {
                callback();
            } catch (error) {
                this.#logger.log(`Error in wordbook ready callback: ${error.message}`);
            }
        });
    }
}