import {WBStorage} from "./WBStorage";
import {MetaInfo} from "./MetaInfo";
import {Logger} from "../Logger";

export class Wordbook {

    #storage = new WBStorage();
    #meta = new MetaInfo();
    #logger = new Logger();
    #wordbook = new Map();

    constructor() {}

    getLoadTimeout = () => {
        return 100;
    }

    updateStorage = () => {
        const map = this.#wordbook;
        const list = [];
        map.forEach((level, word) => {
           list.push({word: word, level: level}) ;
        });
        const toSave = this.#toObject(this.#toArray(list));
        this.#storage.setWordbooks(toSave);
    }

    set = (words) => {
        this.#updateWordbook(words);
        setTimeout(this.updateStorage, 100);
    }

    #loadWBMock = (mockWB) => {
        const array = this.#toArray(mockWB);
        const wordbooks = this.#toObject(array);
        this.#storage.setWordbooks(wordbooks);
    }

    #getObject = (wordbook) => {
        const object = {};
        wordbook.forEach((level, word, index) => {
            const number = Math.floor(index/100);
            const name = "wordbook" + number;
            if (object[name]) {

            }
        });
        return object;
    }

    getWordbook = () => {
        return this.#wordbook;
    }

    /**
     * Выгружаем wordbook из storage.
     *
     * Поскольку невозможно хранить его целиком,
     * грузим кусками по 100 слов в каждом.
     */
    loadWordbooks = () => {
        this.#preload(0);
        return this.#wordbook;
    }

    #preload = (number) => {
        const name = this.#getWBName(number);
        this.#logger.log(`Loaded ${name} from storage`);
        this.#getByName(name).then(wordbook => {
            if (wordbook) {
                this.#meta.report(name, wordbook.length);
                this.#updateWordbook(wordbook);
                this.#loadNext(number);
            }
        });
    }

    #loadNext = (number) => {
        const next = number + 1;
        this.#preload(next);
    }

    #getByName = (name) => {
        return new Promise(resolve => {
            chrome.storage.local.get([name], (app) => {
                resolve(app[name]);
            });
        });
    }

    #getWBName = (number) => {
        return "wordbook" + number;
    }

    #toArray = (words) => {
        const array = [[]];
        words.forEach((bundle) => {
            this.#increaseCounter(array);
            this.#createNewArray(array);
            const part = array[this.#meta.getLength()];
            this.#addInArray(part, bundle);
        });
        return array;
    }

    #createNewArray = (array) => {
        if (array.length <= this.#meta.getLength()) {
            array.push([]);
        }
    }

    #addInArray = (part, bundle) => {
        part.push(bundle);
    }

    #increaseCounter = (array) => {
        const number = this.#meta.getLength();
        if (array[number].length >= 100) {
            const name = this.#getWBName(number);
            this.#meta.report(name, 0);
        }
    }

    #toObject = (array) => {
        const wordbooks = {};
        array.forEach((wordbook, index) => {
            wordbooks[this.#getWBName(index)] = wordbook;
        });
        return wordbooks;
    }

    #updateWordbook = (list) => {
        list.forEach((bundle) => {
            this.#wordbook.set(bundle.word, bundle.level);
        });
    }
}