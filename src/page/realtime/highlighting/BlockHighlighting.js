export class BlockHighlighting {

    static draw;
    #innerTextBlocks;
    #block;

    constructor(block, innerTextBlocks) {
        this.#block = block;
        this.#innerTextBlocks = innerTextBlocks;
    }

    draw = () => {
        if (BlockHighlighting.draw) {
            window.document.body.removeChild(BlockHighlighting.draw);
        }
        BlockHighlighting.draw = window.document.createElement("div");
        BlockHighlighting.draw.style.left = `${this.#block.getPosition().x}px`;
        BlockHighlighting.draw.style.top = `${this.#block.getPosition().y}px`;
        BlockHighlighting.draw.style.width = `${this.#block.getSize().width}px`;
        BlockHighlighting.draw.style.height = `${this.#block.getSize().height}px`;
        BlockHighlighting.draw.style.position = "absolute";
        BlockHighlighting.draw.style.zIndex = "1000";
        BlockHighlighting.draw.style.opacity = "0.25";
        BlockHighlighting.draw.style.pointerEvents = "none";
        BlockHighlighting.draw.style.border = "1px solid black";
        window.document.body.appendChild(BlockHighlighting.draw);

        this.#drawInnerTextBlocks();
    }

    #drawInnerTextBlocks() {
        this.#innerTextBlocks.getBlocks().forEach((textBlock, index) => {
            const size = textBlock.getSize();
            const position = this.#innerTextBlocks.getPosition(index);
            const draw = window.document.createElement("div");
            draw.innerText = index;
            draw.style.left = `${position.x}px`;
            draw.style.top = `${position.y}px`;
            draw.style.width = `${size.width}px`;
            draw.style.height = `${size.height}px`;
            draw.style.position = "absolute";
            draw.style.background = "blue";
            draw.style.border = "1px solid black";
            draw.style.zIndex = "1000";
            draw.style.opacity = textBlock.isEmpty() ? "0" : "0.25";
            BlockHighlighting.draw.appendChild(draw);
        });
    }
}