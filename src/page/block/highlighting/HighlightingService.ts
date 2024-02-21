import {HighlightingController} from "./HighlightingController";
import {TextBlocks} from "../../realtime/blocks/TextBlocks";
import {TextBlockModel} from "../../realtime/blocks/TextBlockModel";
import {CoordinateBlockModel} from "../../realtime/parser/models/CoordinateBlockModel";

export class HighlightingService {

    private readonly highlightingController: HighlightingController;

    constructor() {
        this.highlightingController = new HighlightingController();
    }

    drawHighlight = (innerTextBlocks: TextBlocks) => {
        this.highlightingController.destructRef();
        innerTextBlocks.getBlocks().forEach((block: CoordinateBlockModel, index: number) => {
            const position = innerTextBlocks.getPosition(index);
            [block.x, block.y] = [position.x, position.y]
            this.highlightingController.appendRef(block);
        });
    }
}