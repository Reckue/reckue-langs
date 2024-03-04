import {TextBlocks} from "../../../realtime/blocks/TextBlocks";
import {FocusBlockModel} from "../../../realtime/blocks/FocusBlockModel";

export class CacheModel {

    readonly focusBlock: FocusBlockModel;
    readonly textBlocks: TextBlocks;

    constructor(focusBlock: FocusBlockModel, textBlocks: TextBlocks) {
        this.focusBlock = focusBlock;
        this.textBlocks = textBlocks;
    }
}