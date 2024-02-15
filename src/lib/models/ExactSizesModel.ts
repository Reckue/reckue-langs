import {SizeModel} from "./SizeModel";

export class ExactSizesModel {

    inline: SizeModel;
    block: SizeModel;

    constructor(inline: SizeModel, block: SizeModel) {
        this.inline = inline;
        this.block = block;
    }
}