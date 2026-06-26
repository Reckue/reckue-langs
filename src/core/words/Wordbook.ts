import {Pages} from "./Pages";
import {migrateLevel} from "../enum/Levels";

interface Bundle {
    word: string;
    level: string;
}

// Размер куска словаря в storage (ключи wordbook0, wordbook1, …). Должен
// совпадать с шагом #putInPiece и с загрузкой кусками в WordbookService.
const PIECE = 100;

export class Wordbook {

    #pages: Pages;
    #cache: Map<string, string>;
    // Порядок вставки слов (зеркало порядка #cache) — даёт позицию слова, а
    // значит и индекс его куска: chunk = floor(pos / PIECE). Нужно, чтобы при
    // изменении одного слова переписать в storage только его кусок, а не весь
    // словарь (на большом словаре полная сериализация лагала смену уровня).
    #order: string[] = [];
    #pos = new Map<string, number>();
    // Индексы кусков, изменившихся с последней записи (takeDirty их забирает).
    #dirty = new Set<number>();
    // Сколько кусков (ключей wordbook*) сейчас лежит в storage. Нужно, чтобы при
    // сокращении словаря удалить «хвостовые» ключи — иначе осиротевший последний
    // ключ при следующей загрузке воскресит удалённые слова.
    #stored = 0;
    // Префикс ключей куска в storage (wordbook0… для дефолта, wordbook_<id>_0…
    // для именованного словаря). Задаётся при создании под активный словарь.
    #prefix: string;

    constructor(prefix = "wordbook") {
        this.#prefix = prefix;
        this.#cache = new Map<string, string>();
        this.#pages = new Pages(0, 0);
    }

    remove = (word: string) => {
        if (!this.#cache.delete(word)) {
            return;
        }
        // Удаление сдвигает позиции всех последующих слов — перестраиваем порядок
        // и помечаем все куски «грязными» (поведение как при полной записи). Это
        // не горячий путь чтения, поэтому O(N) допустим.
        this.#order = [...this.#cache.keys()];
        this.#pos = new Map(this.#order.map((w, i) => [w, i]));
        this.#dirty = new Set(this.#order.map((_, i) => Math.floor(i / PIECE)));
        this.#pages = new Pages(this.#cache.size, 50);
        this.#pages.calcPagesCount();
    }

    /**
     * dirty=false — при загрузке из storage (слова пришли оттуда, переписывать
     * незачем); по умолчанию true — пользовательское изменение, помечаем кусок.
     */
    set = (list: Bundle[], dirty = true) => {
        list.forEach((bundle) => {
            // migrateLevel: нормализуем уровень при загрузке из storage (старый
            // `native` → advanced). Сохранится при следующей записи словаря.
            const word = bundle.word;
            if (!this.#cache.has(word)) {
                this.#pos.set(word, this.#order.length);
                this.#order.push(word);
            }
            this.#cache.set(word, migrateLevel(bundle.level));
            if (dirty) {
                this.#dirty.add(Math.floor(this.#pos.get(word)! / PIECE));
            }
        });
        this.#pages = new Pages(this.#cache.size, 50);
        this.#pages.calcPagesCount();
        if (!dirty) {
            // Загрузка из storage: эти куски там уже лежат — учитываем их число.
            this.#stored = this.#chunkCount();
        }
        return this;
    }

    /**
     * Забрать изменения для записи: { set } — изменившиеся куски (ключ → слова),
     * { remove } — осиротевшие хвостовые ключи при сокращении словаря. Куски
     * строятся из #order, поэтому совпадают по разбивке с toObject/загрузкой.
     */
    takeDirty = (): {set: Record<string, Bundle[]>, remove: string[]} => {
        const set: Record<string, Bundle[]> = {};
        this.#dirty.forEach((chunk) => {
            const bundles: Bundle[] = [];
            const start = chunk * PIECE;
            for (let i = start; i < start + PIECE && i < this.#order.length; i++) {
                const word = this.#order[i];
                bundles.push({word, level: this.#cache.get(word)!});
            }
            set[this.getName(chunk)] = bundles;
        });
        this.#dirty.clear();

        const now = this.#chunkCount();
        const remove: string[] = [];
        for (let i = now; i < this.#stored; i++) {
            remove.push(this.getName(i));
        }
        this.#stored = now;
        return {set, remove};
    }

    #chunkCount = () => Math.ceil(this.#order.length / PIECE);

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
        return this.#prefix + number;
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
