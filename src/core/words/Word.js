import {Context} from "../Context";

export class Word {

    #original;
    #clear;

    constructor(word) {
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
        this.#clear = this.#original.toString().toLowerCase().replace(/[\W]/g, '');
        if (!this.#found(this.#clear)) {
            this.#checkEnding();
        }
    }

    #checkEnding = () => {
        let ending = null;
        this.#clear.endsWith('s') && (ending = "s");
        this.#clear.endsWith('ed') && (ending = "ed");
        this.#clear.endsWith('ing') && (ending = "ing");
        (ending !== null) && this.#trimEnding(ending);
    }

    #trimEnding = (ending) => {
        this.#clear = this.#clear.substr(0,this.#clear.length - ending.length);
        return this.#enrichEnding(this.#clear);
    }


    #enrichEnding = (shorted) => {
        if (!this.#found(shorted)) {
            this.#found(shorted + 's') && (this.#clear = shorted + 's');
            this.#found(shorted + 'e') && (this.#clear = shorted + 'e');
        }
    }

    #trimPrefix = () => {

    }

    #found = (word) => Context.getWordbookService().getWordbook().get(word);
}