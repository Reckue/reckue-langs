import {Logger} from "../Logger";
import {Store} from "../Store";
import {Wordbook} from "./Wordbook";

export class WordbookService {

    #storage;
    #logger;
    #wordbook;

    #executeAfter;

    executeAfter = (after) => {
        this.#executeAfter = after;
    }

    constructor() {
        this.#storage = new Store();
        this.#logger = new Logger();
        this.#wordbook = new Wordbook();
    }

    set = (words) => {
        this.#wordbook.set(words);
        this.#updateStorage();
    }

    remove = (word) => {
        this.#wordbook.remove(word);
        this.#updateStorage();
    }

    #updateStorage = () => {
        const wordbooks = this.#wordbook.toObject();
        this.#storage.saveWordbooks(wordbooks);
    }

    getWordbook = () => {
        return this.#wordbook;
    }

    getFilteredWordbook = (filter) => {
        const filtered = [];
        this.#wordbook.get().forEach((level, word) => word && word.includes(filter) && filtered.push({word, level}));
        const wordbook = new Wordbook();
        wordbook.set(filtered);
        return wordbook;
    }

    getWordbookCache = () => {
        return this.#wordbook.get();
    }

    /**
     * Выгружаем wordbook из storage.
     *
     * Поскольку невозможно хранить его целиком,
     * грузим кусками по 100 слов в каждом.
     */
    loadWordbooks = () => {
        this.#preload(0);
    }

    #preload = (number) => {
        const name = this.#wordbook.getName(number);
        this.#logger.log(`Loaded ${name} from storage`);
        this.#storage.getByName(name).then(wordbook => this.#load(wordbook, number));
    }

    #load = (wordbook, number) => {
        if (wordbook) {
            this.#wordbook.set(wordbook);
            this.#loadNext(number);
        } else {
            this.#executeAfter();
        }
    }

    #loadNext = (number) => {
        const next = number + 1;
        this.#preload(next);
    }
}