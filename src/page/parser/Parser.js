import {PageParser} from "./page/PageParser";
import {TextBlocksParser} from "./text/TextBlocksParser";

export class Parser {

    #page;
    #textBlocks;

    constructor() {
        this.#page = new PageParser();
        this.#textBlocks = new TextBlocksParser();
    }

    textBlocksParsing = (textBlocks) => {
        return this.#textBlocks.parse(textBlocks);
    }

    parsePage = () => {
        return this.#page.parse();
    }
}