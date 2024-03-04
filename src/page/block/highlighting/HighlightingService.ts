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
        //TODO:: Destruct prev
        innerTextBlocks.getBlocks().forEach((textBlock: TextBlockModel, index: number) => {
            const size = textBlock.getSize();
            const position = innerTextBlocks.getPosition(index);
            const block = new CoordinateBlockModel();
            block.height = size.height;
            block.width = size.width;
            block.x = position.x;
            block.y = position.y;
            this.highlightingController.appendRef(block);
        });
    }
}