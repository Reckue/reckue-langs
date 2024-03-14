import {TextBlocks} from "../../../realtime/blocks/TextBlocks";
import {FocusBlockModel} from "../../../realtime/blocks/FocusBlockModel";
import { CloneBlockModel } from "../../../../lib/models/CloneBlockModel";

export class CacheModel {

    readonly clone: CloneBlockModel;

    constructor(clone: CloneBlockModel) {
        this.clone = clone;
    }
}