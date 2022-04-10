import {Context} from "../../core/Context";

export class PageChangeListener {

    #observer;

    constructor() {
        this.#observer = new MutationObserver((mutations) => this.#parseCandidate(mutations));
    }

    listen = (node) => {
        const config = { childList: true };
        this.#observer.observe(node, config);
    }

    #parseCandidate = (mutations) => {
        if (!Context.get("render-queue").isActive()) {
            mutations.forEach((mutation) => this.#putInQueue(mutation));
        }
    }

    #putInQueue = (mutation) => {
        mutation.addedNodes.forEach(node => {
            const pageQueue = Context.get("page-elements-queue");
            pageQueue.queueUp(node);
        })
    }
}