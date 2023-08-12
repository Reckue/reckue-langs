import {enumForEach} from "../../core/enum";
import {Levels} from "../../enum/Levels";
import {Builder} from "../builder/Builder";

export class WordsAppender extends Builder {

    #templateFunction;
    #options;

    constructor() {
        super();
        this.#templateFunction = require("pug-loader!./templates/word.pug");
        this.#options = [];
        enumForEach(Levels, (level) => {
            this.#options.push(level.name)
        });
    }

    addWord = (clear, level) => {
        const words = this.#getWordsElement();
        const ref = this.#buildWord(clear, level);
        words.appendChild(ref);
        return ref;
    }

    #buildWord = (clear, level) => {
        const options = this.#options;
        const html = this.#templateFunction({clear, level, options})
        return this.getHTMLMapper().toElement(html);
    };

    clearScroll = () => {
        this.#getWordsElement().innerHTML = "";
    }

    #getWordsElement = () => window.document.getElementById('words');
}