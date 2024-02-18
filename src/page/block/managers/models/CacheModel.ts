import {TextBlocks} from "../../../realtime/blocks/TextBlocks";
import {FocusBlockModel} from "../../../realtime/blocks/FocusBlockModel";

export class CacheModel {

    private readonly _focusBlock: FocusBlockModel;
    private readonly _textBlocks: TextBlocks;

    constructor(focusBlock: FocusBlockModel, textBlocks: TextBlocks) {
        this._focusBlock = focusBlock;
        this._textBlocks = textBlocks;
    }

    get focusBlock(): FocusBlockModel {
        return this._focusBlock;
    }

    get textBlocks(): TextBlocks {
        return this._textBlocks;
    }
}