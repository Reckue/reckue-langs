import { PosModel } from "../../../lib/models/PosModel";
import { FocusBlockModel } from "./FocusBlockModel";
import {TextBlockModel} from "./TextBlockModel";

export class TextBlocks {

    private ref: HTMLElement;
    private texts: Array<string>;
    private positions: Array<PosModel>;
    private blocks: Array<TextBlockModel>;
    private realHeight: number;

    constructor(focusBlock: FocusBlockModel) {
        this.ref = focusBlock.getRef();
        this.setupTexts();
        this.setupTextBlocks(focusBlock);
        this.calculateFinalPositions(focusBlock);
    }

    getBlocks = () => {
        return this.blocks;
    }

    getPositions = () => {
        return this.positions;
    }

    getPosition = (index: number) => {
        return this.positions[index];
    }

    private setupTextBlocks = (focusBlock: FocusBlockModel) => {
        this.realHeight = 0;
        this.blocks = this.texts.map((text) => {
            const block = new TextBlockModel(focusBlock, text);
            this.realHeight += this.getMinimalRealHeight(block);
            return block;
        });
    }

    private setupPositions = () => {
        this.realHeight = 0;
        this.positions = [];
        this.blocks.forEach((block) => {
            this.positions.push({x: 0, y: this.realHeight});
            this.realHeight += this.getMinimalRealHeight(block);
        });
    }

    private getMinimalRealHeight = (block: TextBlockModel) => {
        if (block.isEmpty()) {
            return block.getLineHeight();
        } else {
            return block.getSize().height;
        }
    }

    private calculateFinalPositions = (focusBlock: FocusBlockModel) => {
        const coefficient = focusBlock.getSize().height / this.realHeight;
        this.blocks.forEach(block => {
            block.getSize().height *= coefficient;
            if (block.isEmpty()) {
                block.setLineHeight(block.getSize().height);
            } else {
                block.setLineHeight(block.getLineHeight() * coefficient);
            }
        });
        this.setupPositions();
    }

    private setupTexts() {
        this.texts = this.ref.innerText.split("\n");
        const last = this.texts.pop();
        if (last) {
            this.texts.push(last);
        }
    }
}