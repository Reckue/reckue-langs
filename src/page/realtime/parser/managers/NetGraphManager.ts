import { SizeModel } from "../../size/SizeModel";
import { CoordinateBlockModel } from "../models/CoordinateBlockModel";
import { CursorModel } from "../models/CursorModel";
import { NetGraphModel } from "../models/NetGraphModel";

export class NetGraphManager {

    private properties: Map<string, string|number>

    constructor() {
        this.properties = new Map<string, string|number>();
    }

    getNetGraphProperties = () => {
        return this.properties;
    }

    setCursor = (cursor: CursorModel) => {
        this.properties.set("cursor-x", cursor.x);
        this.properties.set("cursor-y", cursor.y);
    }

    setBlock = (block: CoordinateBlockModel) => {
        this.properties.set("block-width", block.width);
        this.properties.set("block-height", block.height);
        this.properties.set("block-x", block.x);
        this.properties.set("block-y", block.y);
    }

    setInlineBlockSize = (blockSize: SizeModel) => {
        this.properties.set("inline-block-width", blockSize.width);
        this.properties.set("inline-block-height", blockSize.height);
    }

    setProperty = (propertyName: string, property: string|number) => {
        this.properties.set(propertyName, property);
    }
}