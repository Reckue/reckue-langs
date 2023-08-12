import {selectByClass} from "../deprecated/html";

export class InfoBarBuilder {

    #element;
    #version;

    constructor() {
        const jsonData = require('../../../manifest.json');
        this.#version = jsonData.version;
        this.#element = selectByClass('infobar');
        this.#appendVersion();
    }

    #appendVersion = () => {
        this.#element.textContent = `Version ${this.#version}`;
    }
}