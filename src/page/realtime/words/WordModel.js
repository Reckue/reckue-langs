export class WordModel {

    #stringValue;
    #size;

    constructor(stringValue, size) {
        this.#stringValue = stringValue;
        this.#size = size;
    }

    get stringValue() {
        return this.#stringValue;
    }

    set stringValue(value) {
        this.#stringValue = value;
    }

    get size() {
        return this.#size;
    }

    set size(value) {
        this.#size = value;
    }
}