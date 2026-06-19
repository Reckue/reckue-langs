import {Pages} from "./Pages";
import {migrateLevel} from "../enum/Levels";

interface Bundle {
    word: string;
    level: string;
}

export class Wordbook {

    #pages: Pages;
    #cache: Map<string, string>;

    constructor() {
        this.#cache = new Map<string, string>();
        this.#pages = new Pages(0, 0);
    }

    remove = (word: string) => {
        this.#cache.delete(word);
        this.#pages = new Pages(this.#cache.size, 50);
        this.#pages.calcPagesCount();
    }

    set = (list: Bundle[]) => {
        list.forEach((bundle) => {
            // migrateLevel: нормализуем уровень при загрузке из storage (старый
            // `native` → advanced). Сохранится при следующей записи словаря.
            this.#cache.set(bundle.word, migrateLevel(bundle.level));
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

    getPage = (page: number) => {
        let index = 0;
        const result = new Map<string, string>();
        this.#cache.forEach((level, word) => {
            this.#pages.isIndexOnPage(page, index) && result.set(word, level);
            index++;
        });
        return result;
    }

    toObject = () => {
        const wordbooks: Record<string, Bundle[]> = {};
        this.#toPieces().forEach((wordbook, index) => {
            wordbooks[this.getName(index)] = wordbook;
        });
        return wordbooks;
    }

    getName = (number: number) => {
        return "wordbook" + number;
    }

    #toList = () => {
        const list: Bundle[] = [];
        this.#cache.forEach((level, word) => {
            list.push({word: word, level: level}) ;
        });
        return list;
    }

    #toPieces = () => {
        const pieces: Bundle[][] = [[]];
        this.#toList().forEach((bundle) => this.#putInPiece(pieces, bundle));
        return pieces;
    }

    #putInPiece = (pieces: Bundle[][], bundle: Bundle) => {
        const counter = pieces.length - 1;
        if (pieces[counter].length < 100) {
            pieces[counter].push(bundle);
        } else  {
            pieces.push([]);
            this.#putInPiece(pieces, bundle);
        }
    }
}
