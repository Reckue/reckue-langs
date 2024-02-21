import {ElementExactSizeService} from "../../../lib/services/ElementExactSizeService";
import {SizeModel} from "../../../lib/models/SizeModel";
import { CoordinateBlockModel } from "../parser/models/CoordinateBlockModel";
import { ExactSizesModel } from "../../../lib/models/ExactSizesModel";
import { FocusBlockModel } from "./FocusBlockModel";

export class TextBlockModel extends CoordinateBlockModel {

    private empty: Boolean;
    private text: string;
    private size: ExactSizesModel;

    constructor(focusBlock: FocusBlockModel, text: string) {
        super()
        this.text = text;
        this.empty = !(text.trim().length > 0);
        this.setupSize(focusBlock);
    }

    getSize = () => {
        return this.size.block;
    }

    getInlineSize = () => {
        return this.size.inline;
    }

    getLinesCount = () => {
        return this.size.block.height / this.size.inline.height;
    }

    getLineHeight = () => {
        return this.size.inline.height;
    }

    setLineHeight = (height: number) => {
        this.size.inline.height = height;
    }

    isEmpty = () => {
        return this.empty;
    }

    private setupSize = (focusBlock: FocusBlockModel) => {
        const ref = focusBlock.getRef();
        const clone = new ElementExactSizeService();
        this.size = clone.getSize(ref, this.getText(), focusBlock.getSize());
    }

    private getText = () => {
        return !this.isEmpty() ? this.text : "0";
    }
}