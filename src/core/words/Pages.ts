export class Pages {

    #wordsCount: number;

    #pagesCount: number;
    #scale: number;

    constructor(wordsCount: number, scale: number) {
        this.#wordsCount = wordsCount;
        this.#scale = scale;
    }

    getCount = () => {
        return this.#pagesCount;
    }

    calcPagesCount = () => {
        this.#pagesCount = Math.ceil(this.#wordsCount / this.#scale);
        return this.#pagesCount;
    }

    isIndexOnPage = (page: number, index: number) => index >= this.#getPageStart(page) && index < this.#getPageEnd(page);

    #getPageStart = (page: number) => page * this.#scale;

    #getPageEnd = (page: number) => (page + 1) * this.#scale;
}
