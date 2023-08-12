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
        const href = this.#buildHref(word);
        const html = this.#templateFunction({word, href});
        const ref = this.getHTMLMapper().toElement(html);
        const old = this.getRef();
        this.setRef(ref);
        this.#parent.replaceChild(this.getRef(), old);
    }

    #buildHref = (word) => {
        const language = Context.get("language");
        const url = `${Context.get("TRANSLATE_URL")}&sl=${language.sl}&tl=${language.tl}&text=${word}`;
        this.#printPageContent(url);
        return url;
    }

    #printPageContent = (url) => {
        window.console.log(chrome.tabs);
        const opened = window.open(url, "_blank");
        opened.close();
    }
}