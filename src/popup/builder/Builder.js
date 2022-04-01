import {HTMLMapper} from "../../core/HTMLMapper";

export class Builder {

    #HTMLMapper;

    constructor() {
        this.#HTMLMapper = new HTMLMapper();
    }

    getHTMLMapper = () => {
        return this.#HTMLMapper;
    }
}