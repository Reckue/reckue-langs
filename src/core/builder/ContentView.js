import {AbstractView} from "./AbstractView";

export class ContentView extends AbstractView {

    #content;

    constructor() {
        super();
        this.#content = window.document.getElementById("content");
    }

    getContent = () => {
        return this.#content;
    }
}