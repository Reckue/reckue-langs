import { SizeModel } from "../../../../lib/models/SizeModel";
import { CursorModel } from "../models/CursorModel";

export class CursorManager {
    
    cursor: CursorModel

    constructor(cursor: CursorModel) {
        this.cursor = cursor
    }

    getCursorPercentageX = (textBlock: SizeModel) => {
        return this.cursor.x / textBlock.width;
    }
}