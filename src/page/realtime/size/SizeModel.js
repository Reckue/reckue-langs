export class SizeModel {

    #width;
    #height;

    constructor(width, height) {
        this.#width = width;
        this.#height = height;
    }


    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }


    set width(value) {
        this.#width = value;
    }

    set height(value) {
        this.#height = value;
    }
}