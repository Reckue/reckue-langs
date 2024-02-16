import {BlockHighlighting} from "../../realtime/highlighting/BlockHighlighting";

export class HighlightingServices {

    readonly highlights: Array<BlockHighlighting>;

    constructor() {
        this.highlights = [];
    }

    drawHighlight = () => {
        const highlight = new BlockHighlighting();
        this.highlights.push(highlight);
    }
}