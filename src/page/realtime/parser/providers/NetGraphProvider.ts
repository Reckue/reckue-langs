import { CoordinateBlockModel } from "../models/CoordinateBlockModel";
import { CursorModel } from "../models/CursorModel";
import { NetGraphModel } from "../models/NetGraphModel";

export class NetGraphProvider {

    setupNetGraphModel = (cursor: CursorModel,  block: CoordinateBlockModel, textLength: number) => {
        return new NetGraphModel(cursor, block, textLength);
    }


}