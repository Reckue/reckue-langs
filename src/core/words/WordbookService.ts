import {Logger} from "../Logger";
import {Store} from "../Store";
import {Wordbook} from "./Wordbook";

interface Bundle {
    word: string;
    level: string;
}

export class WordbookService {

    #storage: Store;
    #logger: Logger;
    #wordbook: Wordbook;

    #executeAfter: () => void;

    executeAfter = (after: () => void) => {
        this.#executeAfter = after;
    }

    constructor() {
        this.#storage = new Store();
        this.#logger = new Logger();
        this.#wordbook = new Wordbook();
    }

    set = (words: Bundle[]) => {
        this.#wordbook.set(words);
        this.#updateStorage();
    }

    remove = (word: string) => {
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

    getFilteredWordbook = (filter: string) => {
        const filtered: Bundle[] = [];
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

    #preload = (number: number) => {
        const name = this.#wordbook.getName(number);
        this.#logger.log(`Loaded ${name} from storage`);
        this.#storage.getByName(name).then(wordbook => this.#load(wordbook, number));
    }

    #load = (wordbook: Bundle[] | undefined, number: number) => {
        if (wordbook) {
            this.#wordbook.set(wordbook);
            this.#loadNext(number);
        } else {
            this.#executeAfter();
        }
    }

    #loadNext = (number: number) => {
        const next = number + 1;
        this.#preload(next);
    }
}
