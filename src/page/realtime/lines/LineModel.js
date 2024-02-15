export class LineModel {

    #words;
    #size;

    constructor(words, size) {
        this.#words = words;
        this.#size = size;
    }

    get words() {
        return this.#words;
    }

    set words(value) {
        this.#words = value;
    }

    get borders() {
        return this.#size;
    }

    set borders(value) {
        this.#size = value;
    }
}