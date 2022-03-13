export class WBInfo {

    #name;
    #size;

    constructor(name, size) {
        this.#name = name;
        this.#size = size;
    }

    getName = () => {
        return this.#name;
    }

    getSize = () => {
        return this.#size;
    }
}