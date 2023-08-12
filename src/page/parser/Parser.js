import {PageParser} from "./page/PageParser";
import {TextBlocksParser} from "./text/TextBlocksParser";
import {Context} from "../../core/Context";

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
        this.#page.parse();
    }

    putInQueue = (node) => {
        this.#page.putInQueue(node);
    }
}