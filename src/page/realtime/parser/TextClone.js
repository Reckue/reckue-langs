export class TextClone {

    #clone;
    #block;
    #text;

    #HIDDEN_STYLES = "left:0;top:0;position:absolute;z-index:100";

    constructor(block, text) {
        this.#text = text;
        this.#block = block;
    }

    getSize = (blockSize) => {
        this.#clone = document.createElement('div');
        this.#fillCloneStyles();
        this.#fillCloneAttributeStyles(blockSize);
        this.#fillCloneContent();

        parent.document.body.appendChild(this.#clone);

        let rect = {
            height: this.#clone.offsetHeight,
            width: this.#clone.offsetWidth
        };

        parent.document.body.removeChild(this.#clone);

        return rect;
    }

    #fillCloneAttributeStyles = (blockSize) => {
        let fontSize = this.#getStyle("fontSize");
        let fontFamily = this.#getStyle("fontFamily");

        let size = "height:auto;width:auto"

        if (blockSize) {
            size = `width:${blockSize.width}px;height:auto`
        }

        const attributeStyles =
            `${this.#HIDDEN_STYLES};
            font-size:${fontSize};
            font-family:${fontFamily};
            ${size}`;

        document.all ?
            this.#clone.style.setAttribute('cssText', attributeStyles) :
            this.#clone.setAttribute('style', attributeStyles);
    }

    #fillCloneStyles = () => {
        for (let i in this.#block.style) {
            try {
                if ((this.#block.style[i] !== '') && (this.#block.style[i].indexOf(":") > 0)) {
                    this.#clone.style[i] = this.#block.style[i];
                }
            } catch (e) {
                // ignore
            }
        }
    }

    #getStyle = (name) => {
        let pointerElement = this.#block;
        let style = null;
        while (pointerElement && !style) {
            style = window.getComputedStyle(pointerElement)[name];
            pointerElement = pointerElement.parentElement;
        }
        return style;
    }

    #fillCloneContent() {
        this.#clone.innerHTML = this.#block.innerHTML
        this.#clone.innerText = this.#text;
    }
}