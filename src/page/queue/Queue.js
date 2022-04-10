export class Queue {

    #inProgress;
    #elements;

    constructor() {
        this.#inProgress = false;
        this.#elements = new Set();
    }

    queueUp = (element) => {
        this.#elements.add(element);
    }

    takeTurns = (func) => {
        this.#inProgress = true;
        this.#elements.forEach((element) => {
            func(element);
        });
        this.#elements.clear();
        this.#inProgress = false;
    }

    isEmpty = () => {
        return this.#elements.size === 0;
    }

    isActive = () => {
        return this.#inProgress;
    }
}