import {Pages} from "./Pages";

export class Wordbook {

    #pages;
    #cache;

    constructor() {
        this.#cache = new Map();
        this.#pages = new Pages(0, 0);
    }

    remove = (word) => {
        this.#cache.delete(word);
        this.#pages = new Pages(this.#cache.size, 50);
        this.#pages.calcPagesCount();
    }

    set = (list) => {
        list.forEach((bundle) => {
            this.#cache.set(bundle.word, bundle.level);
        });
        this.#pages = new Pages(this.#cache.size, 50);
        this.#pages.calcPagesCount();
        return this;
    }

    get = () => {
        return this.#cache;
    }

    getPages = () => {
        return this.#pages;
    }

    getPage = (page) => {
        let index = 0;
        const result = new Map();
        this.#cache.forEach((level, word) => {
            this.#pages.isIndexOnPage(page, index) && result.set(word, level);
            index++;
        });
        return result;
    }

    toObject = () => {
        const wordbooks = {};
        this.#toPieces().forEach((wordbook, index) => {
            wordbooks[this.getName(index)] = wordbook;
        });
        return wordbooks;
    }

    getName = (number) => {
        return "wordbook" + number;
    }

    #toList = () => {
        const list = [];
        this.#cache.forEach((level, word) => {
            list.push({word: word, level: level}) ;
        });
        return list;
    }

    #toPieces = () => {
        const pieces = [[]];
        this.#toList().forEach((bundle) => this.#putInPiece(pieces, bundle));
        return pieces;
    }

    #putInPiece = (pieces, bundle) => {
        const counter = pieces.length - 1;
        if (pieces[counter].length < 100) {
            pieces[counter].push(bundle);
        } else  {
            pieces.push([]);
            this.#putInPiece(pieces, bundle);
        }
    }
}