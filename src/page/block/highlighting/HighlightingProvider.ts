import {HighlightBlockModel} from "./model/HighlightBlockModel";
import {CoordinateBlockModel} from "../../realtime/parser/models/CoordinateBlockModel";

export class HighlightingProvider {

    getUpdatedBlockWithColor = (block: CoordinateBlockModel, color: string) => {
        const highlightBlock = <HighlightBlockModel> block;
        highlightBlock.color = color;
        return highlightBlock;
    }
    
    getHighlightingElement = (block: HighlightBlockModel): HTMLElement => {
        const draw = window.document.createElement("div");
        draw.style.left = `${block.x}px`;
        draw.style.top = `${block.y}px`;
        draw.style.width = `${block.width}px`;
        draw.style.height = `${block.height}px`;
        draw.style.position = "absolute";
        draw.style.zIndex = "1000";
        draw.style.opacity = "0.25";
        draw.style.pointerEvents = "none";
        draw.style.background = block.color;
        return draw;
    }
    
}