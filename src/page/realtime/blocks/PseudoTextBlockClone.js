import {SizeModel} from "../size/SizeModel";

export class PseudoTextBlockClone {

    #cloneRef;
    #ref;
    #text;

    #HIDDEN_STYLES = "left:0;top:0;position:absolute;z-index:100";

    constructor(ref, text) {
        this.#text = text;
        this.#ref = ref;
    }

    getSize = (blockSize) => {
        const computedStyles = this.#getComputedStyles();
        this.#cloneRef = document.createElement('div');
        this.#fillCloneStyles(computedStyles);
        this.#fillCloneContent();
        return this.#pseudoRenderAndGetSize(blockSize, computedStyles);
    }

    #pseudoRenderAndGetSize = (blockSize, computedStyles) => {
        parent.document.body.appendChild(this.#cloneRef);

        const widthHeightBlockAttributes = this.#getWidthHeightBlockAttributes(blockSize);
        this.#fillCloneAttributeStyles(blockSize, computedStyles, widthHeightBlockAttributes);
        const block = this.#buildSize();

        const widthHeightInlineAttributes = this.#getWidthHeightInlineAttributes();
        this.#fillCloneAttributeStyles(blockSize, computedStyles, widthHeightInlineAttributes);
        const inline = this.#buildSize();

        parent.document.body.removeChild(this.#cloneRef);
        return {block, inline};
    }

    #buildSize = () => {
        return new SizeModel(this.#cloneRef.offsetWidth, this.#cloneRef.offsetHeight);
    }

    #fillCloneAttributeStyles = (blockSize, computedStyles, widthHeightAttributes) => {
        const fontSize = computedStyles["fontSize"];
        const fontFamily = computedStyles["fontFamily"];
        const mainAttributeStyles = this.#buildMainAttributeStyles(fontSize, fontFamily);
        const attributeStyles = this.#buildAttributeStyles(mainAttributeStyles, widthHeightAttributes);
        this.#setAttributes(attributeStyles);
    }

    #buildMainAttributeStyles = (fontSize, fontFamily) => {
        return `${this.#HIDDEN_STYLES};
                font-size:${fontSize};
                font-family:${fontFamily};`;
    }

    #setAttributes = (attributeStyles) => document.all ?
        this.#cloneRef.style.setAttribute('cssText', attributeStyles) :
        this.#cloneRef.setAttribute('style', attributeStyles);

    #getWidthHeightBlockAttributes = (blockSize) => `width:${blockSize.width}px;height:auto`;
    #getWidthHeightInlineAttributes = () => "height:auto;width:auto";

    #fillCloneStyles = (computedStyles) => {
        this.#cloneRef.style = computedStyles;
    }

    #getComputedStyles = () => {
        return window.getComputedStyle(this.#ref);
    }

    #fillCloneContent() {
        this.#cloneRef.innerHTML = this.#ref.innerHTML
        this.#cloneRef.innerText = this.#text;
    }

    #buildAttributeStyles = (mainAttributeStyles, widthHeightAttributes) => {
        return `${mainAttributeStyles}${widthHeightAttributes}`;
    }
}