import {ElementExactSizeService} from "../../../lib/services/ElementExactSizeService";
import {SizeModel} from "../../../lib/models/SizeModel";

export class TextBlockModel {

    #isEmpty;
    #text;
    #size;

    constructor(focusBlock, text) {
        this.#text = text;
        this.#isEmpty = !(text.trim().length > 0);
        this.#setupSize(focusBlock);
    }

    getSize = () => {
        return this.#size.block;
    }

    getInlineSize = () => {
        return this.#size.inline;
    }

    getLinesCount = () => {
        return this.#size.block.height / this.#size.inline.height;
    }

    getLineHeight = () => {
        return this.#size.inline.height;
    }

    setLineHeight = (height) => {
        this.#size.inline.height = height;
    }

    isEmpty = () => {
        return this.#isEmpty;
    }

    #setupSize = (focusBlock) => {
        const ref = focusBlock.getRef();
        const clone = new ElementExactSizeService();
        this.#size = clone.getSize(ref, this.#getText(), focusBlock.getSize());
    }

    #getText = () => {
        return !this.isEmpty() ? this.#text : "0";
    }
}