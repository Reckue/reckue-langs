import {Context} from "../Context";
import {UnicodeLanguages} from "./UnicodeLanguages";

export class Word {

    #unicode: UnicodeLanguages;
    #original: string;
    #clear: string;

    constructor(word: string) {
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
        let ending: string | null = null;
        this.#clear.endsWith('s') && (ending = "s");
        this.#clear.endsWith('ed') && (ending = "ed");
        this.#clear.endsWith('ing') && (ending = "ing");
        (ending !== null) && this.#trimEnding(ending);
    }

    #checkPrefix = () => {
        this.#clear.startsWith('un') && this.#trimPrefix('un');
    }

    #trimEnding = (ending: string) => {
        this.#clear = this.#clear.substr(0,this.#clear.length - ending.length);
        this.#enrichEnding(this.#clear);
    }

    #trimPrefix = (prefix: string) => {
        //TODO:: Косячный метод, пока что убрал его из алгоритма.
        this.#clear = this.#clear.substr(prefix.length - 1);
    }

    #enrichEnding = (shorted: string) => {
        if (!this.#found(shorted)) {
            this.#found(shorted + 's') && (this.#clear = shorted + 's');
            this.#found(shorted + 'e') && (this.#clear = shorted + 'e');
        }
    }

    #found = (word: string) => Context.getWordbookService().getWordbookCache().get(word);
}
