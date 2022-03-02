class Wordbook {

    #meta = new MetaInfo();
    #logger = new Logger();
    #wordbook = new Map();
    #length = 0;

    constructor() {}

    set = (words) => {
        const array = wordbook.#getArray(words);
        const wordbooks = wordbook.#getWordbooks(array);
        wordbook.#setWordbooks(wordbooks);
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
        return new Promise( resolve => {
            this.#preload(0);
            resolve(this.#wordbook);
        }).then(this.#meta.debug);
    }

    #preload = (number) => {
        const name = this.#getWBName(number);
        this.#logger.log(`Loaded ${name} from storage`);
        this.#getByName(name).then(wordbook => {
            if (wordbook) {
                this.#meta.report(name, wordbook.length);
                this.#loadWordbook(wordbook);
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

    #getArray = (words) => {
        const array = [[]];
        words.forEach((bundle) => {
            this.#increaseCounter(array);
            this.#createNewArray(array);
            const part = array[this.#length];
            this.#addInArray(part, bundle);
        });
        return array;
    }

    #createNewArray = (array) => {
        if (array.length <= this.#length) {
            array.push([]);
        }
    }

    #addInArray = (part, bundle) => {
        part.push(bundle);
    }

    #increaseCounter = (array) => {
        if (array[this.#length].length >= 100) {
            this.#length++;
        }
    }

    #getWordbooks = (array) => {
        const wordbooks = {};
        array.forEach((wordbook, index) => {
            wordbooks[`wordbook${index}`] = wordbook;
        });
        return wordbooks;
    }

    #setWordbooks = (wordbooks) => {
        chrome.storage.local.set(wordbooks);
    }

    #loadWordbook = (list) => {
        list.forEach((bundle) => {
            this.#wordbook.set(bundle.word, bundle.level);
        });
    }
}