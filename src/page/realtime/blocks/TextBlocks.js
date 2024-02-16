import {TextBlockModel} from "./TextBlockModel";

export class TextBlocks {

    #ref;
    #texts;
    #positions;
    #blocks;
    #realHeight;

    constructor(focusBlock) {
        this.#ref = focusBlock.getRef();
        this.#setupTexts();
        this.#setupTextBlocks(focusBlock);
        this.#calculateFinalPositions(focusBlock);
    }

    getBlocks = () => {
        return this.#blocks;
    }

    getPositions = () => {
        return this.#positions;
    }

    getPosition = (index) => {
        return this.#positions[index];
    }

    #setupTextBlocks = (focusBlock) => {
        this.#realHeight = 0;
        this.#blocks = this.#texts.map((text) => {
            const block = new TextBlockModel(focusBlock, text);
            this.#realHeight += this.#getMinimalRealHeight(block);
            return block;
        });
    }

    #setupPositions = () => {
        this.#realHeight = 0;
        this.#positions = [];
        this.#blocks.forEach((block) => {
            this.#positions.push({x: 0, y: this.#realHeight});
            this.#realHeight += this.#getMinimalRealHeight(block);
        });
    }

    #getMinimalRealHeight = (block) => {
        if (block.isEmpty()) {
            return block.getLineHeight();
        } else {
            return block.getSize().height;
        }
    }

    #calculateFinalPositions = (focusBlock) => {
        const coefficient = focusBlock.getSize().height / this.#realHeight;
        this.#blocks.forEach(block => {
            block.getSize().height *= coefficient;
            if (block.isEmpty()) {
                block.setLineHeight(block.getSize().height);
            } else {
                block.setLineHeight(block.getLineHeight() * coefficient);
            }
        });
        this.#setupPositions();
    }

    #setupTexts() {
        this.#texts = this.#ref.innerText.split("\n");
        const last = this.#texts.pop();
        if (last) {
            this.#texts.push(last);
        }
    }
}