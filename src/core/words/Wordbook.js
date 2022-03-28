export class Wordbook {

    #cache;

    constructor() {
        this.#cache = new Map();
    }

    set = (list) => {
        list.forEach((bundle) => {
            this.#cache.set(bundle.word, bundle.level);
        });
    }

    get = () => {
        return this.#cache;
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