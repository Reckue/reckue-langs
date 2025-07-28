import {WordbookServiceFactory} from './WordbookServiceFactory.js';
import {ApiUtils} from './ApiUtils.js';
import {Logger} from '../Logger.js';

/**
 * Пример интеграции API с существующей архитектурой
 * Этот файл показывает, как можно переключиться с локального хранилища на API
 */
export class ApiIntegrationExample {
    #logger;
    #factory;
    #wordbookService;
    
    constructor() {
        this.#logger = new Logger();
        this.#factory = new WordbookServiceFactory(false); // По умолчанию локальный режим
    }
    
    /**
     * Переключение на API режим
     */
    async switchToApiMode() {
        try {
            this.#factory.setUseApi(true);
            this.#wordbookService = this.#factory.createService();
            
            // Инициализация API адаптера
            if (this.#wordbookService.initialize) {
                const initialized = await this.#wordbookService.initialize();
                if (!initialized) {
                    throw new Error('Failed to initialize API adapter');
                }
            }
            
            // Загрузка основного словаря
            if (this.#wordbookService.loadMainWordbook) {
                await this.#wordbookService.loadMainWordbook();
            }
            
            this.#logger.log('Successfully switched to API mode');
            return true;
        } catch (error) {
            this.#logger.log(`Failed to switch to API mode: ${ApiUtils.formatError(error)}`);
            return false;
        }
    }
    
    /**
     * Переключение на локальный режим
     */
    switchToLocalMode() {
        try {
            this.#factory.setUseApi(false);
            this.#wordbookService = this.#factory.createService();
            
            this.#logger.log('Successfully switched to local mode');
            return true;
        } catch (error) {
            this.#logger.log(`Failed to switch to local mode: ${error.message}`);
            return false;
        }
    }
    
    /**
     * Добавление слова с автоматическим переключением режимов
     */
    async addWord(word, level = 1) {
        try {
            // Валидация входных данных
            const validatedWord = ApiUtils.validateWord(word);
            const validatedLevel = ApiUtils.validateLevel(level);
            
            // Попытка добавить слово
            if (this.#wordbookService.addWord) {
                await this.#wordbookService.addWord(validatedWord, validatedLevel);
                this.#logger.log(`Word added successfully: ${validatedWord} (level ${validatedLevel})`);
                return true;
            } else {
                // Fallback к локальному режиму
                this.#logger.log('API method not available, falling back to local mode');
                return this.addWordLocal(validatedWord, validatedLevel);
            }
        } catch (error) {
            this.#logger.log(`Failed to add word: ${ApiUtils.formatError(error)}`);
            return false;
        }
    }
    
    /**
     * Добавление слова в локальном режиме
     */
    addWordLocal(word, level) {
        try {
            if (this.#wordbookService.set) {
                const currentWords = this.#wordbookService.getWordbookCache() || new Map();
                currentWords.set(word, level);
                
                // Обновляем сервис
                const wordList = Array.from(currentWords.entries()).map(([word, level]) => ({word, level}));
                this.#wordbookService.set(wordList);
                
                this.#logger.log(`Word added locally: ${word} (level ${level})`);
                return true;
            }
            return false;
        } catch (error) {
            this.#logger.log(`Failed to add word locally: ${error.message}`);
            return false;
        }
    }
    
    /**
     * Получение текущего режима
     */
    getCurrentMode() {
        return this.#factory.isApiMode() ? 'API' : 'Local';
    }
    
    /**
     * Получение сервиса словаря
     */
    getWordbookService() {
        return this.#wordbookService;
    }
}