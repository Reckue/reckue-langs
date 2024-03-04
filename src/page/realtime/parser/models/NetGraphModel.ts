import { CoordinateBlockModel } from "./CoordinateBlockModel"
import { CursorModel } from "./CursorModel"
import {SizeModel} from "../../../../lib/models/SizeModel";

export class NetGraphModel {

    cursor
    block
    textLength
    coefficient: number
    realHeight: number
    currentLine: number
    textBlocksCount: number
    currentTextBlockSize: SizeModel

    constructor(cursor: CursorModel,  block: CoordinateBlockModel, textLength: number) {
        this.cursor = cursor;
        this.block = block;
        this.textLength = textLength;
    }
}