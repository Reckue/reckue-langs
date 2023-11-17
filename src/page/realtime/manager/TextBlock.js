import {TextClone} from "./TextClone";

export class TextBlock {

    #isEmpty;
    #text;
    #size;

    #inlineSize;
    #linesCount;

    constructor(focusBlock, text) {
        this.#text = text;
        this.#isEmpty = !(text.trim().length > 0);
        this.#setupSize(focusBlock, text);
        this.#setupInlineSize(focusBlock, text);
        this.#linesCount = this.#size.height / this.#inlineSize.height;
    }

    getSize = () => {
        return this.#size;
    }

    getLinesCount = () => {
        return this.#linesCount;
    }

    getLineHeight = () => {
        return this.#inlineSize.height;
    }

    setLineHeight = (height) => {
        this.#inlineSize.height = height;
    }

    isEmpty = () => {
        return this.#isEmpty;
    }

    #setupSize = (focusBlock, text) => {
        const ref = focusBlock.getRef();
        const clone = new TextClone(ref, text);
        this.#size = clone.getSize(focusBlock.getSize());
    }

    #setupInlineSize(focusBlock, text) {
        const ref = focusBlock.getRef();
        const inlineClone = new TextClone(ref, this.#getInlineText(text));
        this.#inlineSize = inlineClone.getSize();
    }

    #getInlineText = (text) => {
        return !this.isEmpty() ? text : "0";
    }
}