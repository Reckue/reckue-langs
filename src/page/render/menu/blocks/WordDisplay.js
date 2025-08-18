import {BaseBlock} from "./BaseBlock";
import {Context} from "../../../../core/Context";

export class WordDisplay extends BaseBlock {

    #templateFunction;
    #parent;

    constructor(parent) {
        super(parent);
        this.#templateFunction = require("pug-loader!./templates/word-display.pug");
        this.#parent = parent;
        this.#parent.prepend(this.getRef());
    }

    updateLink = (word) => {
        // Убираем логику с href, просто передаем слово
        const html = this.#templateFunction({word});
        const ref = this.getHTMLMapper().toElement(html);
        const old = this.getRef();
        this.setRef(ref);
        this.#parent.replaceChild(this.getRef(), old);
    }
}