import {HighlightingProvider} from "./HighlightingProvider";
import {CoordinateBlockModel} from "../../realtime/parser/models/CoordinateBlockModel";

export class HighlightingController {

    private readonly highlightingProvider: HighlightingProvider;
    private static highlightBlockRef: HTMLElement;

    constructor() {
        this.highlightingProvider = new HighlightingProvider();
    }

    appendRef = (block: CoordinateBlockModel) => {
        this.updateHighlightBlockRef();
        const highlightBlock = this.highlightingProvider.getUpdatedBlockWithColor(
            block,
            "blue"
        );
        const element = this.highlightingProvider.getHighlightingElement(highlightBlock);
        HighlightingController.highlightBlockRef.appendChild(element);
    }

    private updateHighlightBlockRef = () => {
        if (!HighlightingController.highlightBlockRef) {
            HighlightingController.highlightBlockRef = window.document.createElement("div");
            window.document.body.appendChild(HighlightingController.highlightBlockRef);
        }
    }

    destructRef = () => {
        if (HighlightingController.highlightBlockRef) {
            window.document.body.removeChild(HighlightingController.highlightBlockRef);
        }
    }
}