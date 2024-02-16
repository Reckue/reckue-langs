export class ElementExactSizeController {

    private cloneRef: HTMLElement;

    constructor(tagName: string) {
        this.cloneRef = document.createElement(tagName);
    }

    appendAttributeStyles = (attributeStyles: string) => {
        this.cloneRef.setAttribute('style', attributeStyles);
    }
}