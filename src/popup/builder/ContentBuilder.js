import {Builder} from "./Builder";

export class ContentBuilder extends Builder {

    #content;

    constructor() {
        super();
        this.#content = window.document.getElementById("content");
    }

    getContent = () => {
        return this.#content;
    }
}