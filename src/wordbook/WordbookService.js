import {Logger} from "../Logger";
import {Store} from "../core/Store";
import {Wordbook} from "../core/Wordbook";

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

    #updateStorage = () => {
        const wordbooks = this.#wordbook.toObject();
        this.#storage.saveWordbooks(wordbooks);
    }

    get = () => {
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