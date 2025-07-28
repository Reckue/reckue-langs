import {Logger} from "../Logger";
import {ApiService} from "../api/ApiService";
import {Wordbook} from "./Wordbook";

export class ApiWordbookService {

    #apiService;
    #logger;
    #wordbook;
    #currentWordbookId;
    #executeAfter;

    executeAfter = (after) => {
        this.#executeAfter = after;
    }

    constructor() {
        this.#apiService = new ApiService();
        this.#logger = new Logger();
        this.#wordbook = new Wordbook();
    }

    /**
     * Инициализация сервиса с авторизацией
     */
    initialize = async () => {
        try {
            const isAuth = await this.#apiService.ensureAuth();
            if (!isAuth) {
                this.#logger.log('Failed to authenticate with API');
                return false;
            }

            // Получаем основной словарь
            const mainWordbook = await this.#apiService.getMainWordbook();
            if (mainWordbook) {
                this.#currentWordbookId = mainWordbook.id;
                this.#logger.log(`Using main wordbook: ${this.#currentWordbookId}`);
            } else {
                // Если основного словаря нет, создаем его
                const newWordbook = await this.#apiService.createWordbook('ENGLISH');
                if (newWordbook) {
                    this.#currentWordbookId = newWordbook.id;
                    this.#logger.log(`Created new wordbook: ${this.#currentWordbookId}`);
                }
            }

            return true;
        } catch (error) {
            this.#logger.log('Failed to initialize API wordbook service');
            return false;
        }
    }

    /**
     * Загружает слова из API
     */
    loadWords = async () => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available');
            if (this.#executeAfter) {
                this.#executeAfter();
            }
            return;
        }

        try {
            let page = 0;
            const allWords = [];
            
            while (true) {
                const response = await this.#apiService.getWords(this.#currentWordbookId, page, 50);
                
                if (!response.content || response.content.length === 0) {
                    break;
                }

                // Преобразуем формат слов для совместимости с Wordbook
                const words = response.content.map(word => ({
                    word: word.word,
                    level: word.level || 1
                }));

                allWords.push(...words);
                
                if (response.content.length < 50) {
                    break;
                }
                
                page++;
            }

            this.set(allWords);
            this.#logger.log(`Loaded ${allWords.length} words from API`);
            
            if (this.#executeAfter) {
                this.#executeAfter();
            }
        } catch (error) {
            this.#logger.log('Failed to load words from API');
            if (this.#executeAfter) {
                this.#executeAfter();
            }
        }
    }

    /**
     * Устанавливает слова в wordbook
     */
    set = (words) => {
        this.#wordbook.set(words);
    }

    /**
     * Добавляет слово в API и локальный wordbook
     */
    addWord = async (word, level = 1) => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available for adding word');
            return false;
        }

        try {
            const result = await this.#apiService.addWord(this.#currentWordbookId, word, level);
            if (result) {
                // Добавляем в локальный wordbook
                this.#wordbook.set([{word, level}]);
                this.#logger.log(`Added word to API: ${word}`);
                return true;
            }
            return false;
        } catch (error) {
            this.#logger.log(`Failed to add word to API: ${word}`);
            return false;
        }
    }

    /**
     * Добавляет список слов в API
     */
    addWordsList = async (words) => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available for adding words list');
            return false;
        }

        try {
            const result = await this.#apiService.addWordsList(this.#currentWordbookId, words);
            if (result) {
                // Добавляем в локальный wordbook
                this.#wordbook.set(words);
                this.#logger.log(`Added ${words.length} words to API`);
                return true;
            }
            return false;
        } catch (error) {
            this.#logger.log('Failed to add words list to API');
            return false;
        }
    }

    /**
     * Удаляет слово из API и локального wordbook
     */
    remove = async (word) => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available for removing word');
            return false;
        }

        try {
            // Находим wordId для удаления
            const words = await this.#apiService.getWords(this.#currentWordbookId, 0, 1000, word);
            const wordToDelete = words.content.find(w => w.word === word);
            
            if (wordToDelete) {
                const result = await this.#apiService.deleteWord(this.#currentWordbookId, wordToDelete.id);
                if (result) {
                    this.#wordbook.remove(word);
                    this.#logger.log(`Removed word from API: ${word}`);
                    return true;
                }
            }
            return false;
        } catch (error) {
            this.#logger.log(`Failed to remove word from API: ${word}`);
            return false;
        }
    }

    /**
     * Обновляет уровень слова в API
     */
    updateWordLevel = async (word, level) => {
        if (!this.#currentWordbookId) {
            this.#logger.log('No wordbook ID available for updating word level');
            return false;
        }

        try {
            // Находим wordId для обновления
            const words = await this.#apiService.getWords(this.#currentWordbookId, 0, 1000, word);
            const wordToUpdate = words.content.find(w => w.word === word);
            
            if (wordToUpdate) {
                const result = await this.#apiService.updateWordLevel(this.#currentWordbookId, wordToUpdate.id, level);
                if (result) {
                    // Обновляем в локальном wordbook
                    this.#wordbook.remove(word);
                    this.#wordbook.set([{word, level}]);
                    this.#logger.log(`Updated word level in API: ${word} -> ${level}`);
                    return true;
                }
            }
            return false;
        } catch (error) {
            this.#logger.log(`Failed to update word level in API: ${word}`);
            return false;
        }
    }

    /**
     * Получает wordbook
     */
    getWordbook = () => {
        return this.#wordbook;
    }

    /**
     * Получает отфильтрованный wordbook
     */
    getFilteredWordbook = (filter) => {
        const filtered = [];
        this.#wordbook.get().forEach((level, word) => word && word.includes(filter) && filtered.push({word, level}));
        const wordbook = new Wordbook();
        wordbook.set(filtered);
        return wordbook;
    }

    /**
     * Получает кэш wordbook
     */
    getWordbookCache = () => {
        return this.#wordbook.get();
    }

    /**
     * Загружает словари (совместимость со старым API)
     */
    loadWordbooks = async () => {
        await this.loadWords();
    }

    /**
     * Получает текущий ID словаря
     */
    getCurrentWordbookId = () => {
        return this.#currentWordbookId;
    }

    /**
     * Устанавливает текущий словарь
     */
    setCurrentWordbook = async (wordbookId) => {
        this.#currentWordbookId = wordbookId;
        await this.loadWords();
    }

    /**
     * Получает все словари пользователя
     */
    getUserWordbooks = async () => {
        try {
            return await this.#apiService.getWordbooks();
        } catch (error) {
            this.#logger.log('Failed to get user wordbooks');
            return [];
        }
    }
}