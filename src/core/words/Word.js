import {Context} from "../Context";
import {UnicodeLanguages} from "./UnicodeLanguages";

export class Word {

    #unicode;
    #original;
    #clear;

    constructor(word) {
        this.#unicode = new UnicodeLanguages();
        this.#original = word;
        this.#setupClear();
    }

    get = () => {
        return this.#original;
    }

    getClear = () => {
        return this.#clear;
    }

    #setupClear = () => {
        this.#clear = this.#original.toString().toLowerCase().replace(this.#unicode.getRegex(), "");
        if (!this.#found(this.#clear)) {
            this.#checkEnding();
            // this.#checkPrefix();
        }
    }

    #checkEnding = () => {
        let ending = null;
        this.#clear.endsWith('s') && (ending = "s");
        this.#clear.endsWith('ed') && (ending = "ed");
        this.#clear.endsWith('ing') && (ending = "ing");
        (ending !== null) && this.#trimEnding(ending);
    }

    #checkPrefix = () => {
        this.#clear.startsWith('un') && this.#trimPrefix('un');
    }

    #trimEnding = (ending) => {
        this.#clear = this.#clear.substr(0,this.#clear.length - ending.length);
        this.#enrichEnding(this.#clear);
    }

    #trimPrefix = (prefix) => {
        //TODO:: Косячный метод, пока что убрал его из алгоритма.
        this.#clear = this.#clear.substr(prefix.length - 1);
    }

    #enrichEnding = (shorted) => {
        if (!this.#found(shorted)) {
            this.#found(shorted + 's') && (this.#clear = shorted + 's');
            this.#found(shorted + 'e') && (this.#clear = shorted + 'e');
        }
    }

    #found = (word) => Context.getWordbookService().getWordbookCache().get(word);
}