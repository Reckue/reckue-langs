export class SplittedSentenceModel {

    #lines;
    #size;

    constructor(lines, size) {
        this.#lines = lines;
        this.#size = size;
    }

    get lines() {
        return this.#lines;
    }

    set lines(value) {
        this.#lines = value;
    }


    get size() {
        return this.#size;
    }

    set size(value) {
        this.#size = value;
    }
}