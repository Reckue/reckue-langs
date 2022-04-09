import {Context} from "../../core/Context";
import {Parser} from "../parser/Parser";

export class PageChangeListener {

    #builder;

    constructor(builder) {
        this.#builder = builder;
    }

    listenAll = () => {
        const nodes = Context.get("elements-queue");
        nodes.forEach((node) => this.#listen(node));
    }

    #listen = (node) => {
        const observer = new MutationObserver((mutations) => {
            if (!this.#builder.isActive()) {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach(node => {
                        const parser = new Parser();
                        const textBlocks = parser.parseNode(node);
                        const wordsList = parser.textBlocksParsing(textBlocks);
                        this.#builder.updateWords(wordsList);
                        this.#builder.rebuildPage();
                    })
                });
            }
        });
        const config = { childList: true };
        observer.observe(node, config);
    }
}