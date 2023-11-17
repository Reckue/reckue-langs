export class FocusBlock {

    #ref;
    #size;
    #position;

    #rect;

    constructor(event) {
        this.#ref = event.target;
        this.#rect = this.#ref.getBoundingClientRect();
        this.#setupSize();
        this.#setupPosition();
    }

    #setupPosition = () => {
        const x = this.#rect.x + window.scrollX;
        const y = this.#rect.y + window.scrollY;
        this.#position = {x, y}
    }

    #setupSize = () => {
        const width = this.#rect.width;
        const height = this.#rect.height;
        this.#size = {width, height}
    }

    getRef = () => {
        return this.#ref;
    }

    getSize = () => {
        return this.#size;
    }

    getPosition = () => {
        return this.#position;
    }
}