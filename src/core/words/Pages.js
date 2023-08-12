export class Pages {

    #wordsCount;

    #pagesCount;
    #scale;

    constructor(wordsCount, scale) {
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

    isIndexOnPage = (page, index) => index >= this.#getPageStart(page) && index < this.#getPageEnd(page);

    #getPageStart = (page) => page * this.#scale;

    #getPageEnd = (page) => (page + 1) * this.#scale;
}