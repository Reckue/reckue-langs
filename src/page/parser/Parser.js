import {PageParser} from "./page/PageParser";
import {TextBlocksParser} from "./text/TextBlocksParser";
import {Context} from "../../core/Context";

export class Parser {

    #page;
    #textBlocks;

    constructor() {
        Context.add("elements-queue", []);
        Context.add("texts-queue", []);
        this.#page = new PageParser();
        this.#textBlocks = new TextBlocksParser();
    }

    textBlocksParsing = (textBlocks) => {
        return this.#textBlocks.parse(textBlocks);
    }

    parsePage = () => {
        let body = window.document.querySelector('body');
        return this.#page.parse(body);
    }

    parseNode = (node) => {
        return this.#page.parse(node);
    }
}