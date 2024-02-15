export class CacheModel {

    #focusBlock;
    #textBlocks;

    constructor(focusBlock, textBlocks) {
        this.#focusBlock = focusBlock;
        this.#textBlocks = textBlocks;
    }

    getFocusBlock = () => {
        return this.#focusBlock;
    }

    getTextBlocks = () => {
        return this.#textBlocks;
    }
}