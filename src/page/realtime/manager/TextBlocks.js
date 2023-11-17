import {TextBlock} from "./TextBlock";

export class TextBlocks {

    #ref;
    #texts;
    #positions;
    #blocks;
    #realHeight;
    #gapsCount;

    constructor(focusBlock) {
        this.#ref = focusBlock.getRef();
        this.#setupTexts();
        this.#setupTextBlocks(focusBlock);
        const coefficient = focusBlock.getSize().height / this.#realHeight;
        this.#blocks.forEach(block => {
            block.getSize().height *= coefficient;
        });
        this.#setupPositions();
        this.#blocks.forEach(block => {
            if (block.isEmpty()) {
                block.setLineHeight(block.getLineHeight() + (focusBlock.getSize().height - this.#realHeight) / this.#gapsCount);
            }
        });
        this.#setupPositions();
        console.log(this.#realHeight, focusBlock.getSize().height);
    }

    getBlocks = () => {
        return this.#blocks;
    }

    getPosition = (index) => {
        return this.#positions[index];
    }

    #setupTextBlocks = (focusBlock) => {
        this.#blocks = this.#texts.map((text) => {
            return new TextBlock(focusBlock, text);
        });
        this.#setupPositions();
    }

    #setupPositions = () => {
        this.#realHeight = 0;
        this.#gapsCount = 0;
        this.#positions = [];
        this.#blocks.forEach((block) => {
            this.#positions.push({x: 0, y: this.#realHeight});
            if (block.isEmpty()) {
                this.#gapsCount++;
                this.#realHeight += block.getLineHeight();
            } else {
                this.#realHeight += block.getSize().height;
            }
        });
    }

    #setupTexts() {
        this.#texts = this.#ref.innerText.split("\n");
        const last = this.#texts.pop();
        if (last) {
            this.#texts.push(last);
        }
    }
}