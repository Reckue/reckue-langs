import {FocusBlock} from "./FocusBlock";
import {BlockHighlighting} from "./BlockHighlighting";
import {TextBlocks} from "./TextBlocks";

export class PageManager {

    #activeBlock;

    run = () => {
        addEventListener("mousemove", this.onmousemove);
    }

    onmousemove = (event) => {
        const currentBlock = this.whereWeAre(event);
        if (!this.sameBlock(currentBlock, this.#activeBlock)) {
            this.#activeBlock = currentBlock;
            const innerTextBlocks = new TextBlocks(this.#activeBlock);
            const highlighting = new BlockHighlighting(this.#activeBlock, innerTextBlocks);
            highlighting.draw();
        }
    }

    sameBlock = (currentFocusBlock, activeBlock) => {
        return (currentFocusBlock && activeBlock) && currentFocusBlock.getRef() === activeBlock.getRef();
    }

    whereWeAre = (event) => {
        return new FocusBlock(event);
    }
}