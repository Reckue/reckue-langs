export class NodeManager {

    private notInteractiveElement = (node: Node) => {
        return !this.isScript(node) && !this.isSVG(node) && !this.isImage(node)
            && !this.isInput(node) && /*!this.isLink(node) &&*/ !this.isBr(node)
            && !this.isStyle(node) && !this.isForm(node) && !this.isComment(node)
            && !this.isUnverifiableInteractiveElement(node);
    }
    private isScript = (node: Node) => node instanceof HTMLScriptElement;
    private isForm = (node: Node) => node instanceof HTMLFormElement;
    private isImage = (node: Node) => node instanceof HTMLImageElement;
    private isInput = (node: Node) => node instanceof HTMLInputElement;
    // private isLink = (node: Node) => node instanceof HTMLLinkElement;
    private isStyle = (node: Node) => node instanceof HTMLStyleElement;
    private isBr = (node: Node) => node instanceof HTMLBRElement;
    private isSVG = (node: Node) => node instanceof SVGSVGElement;
    private isComment = (node: Node) => node instanceof Comment;
    private isUnverifiableInteractiveElement = (node: Node) => node.nodeName === "CODE" /*|| node.nodeName === "A"*/;

    private resultArray: Array<any> = [];


    getChildNodes = (element: HTMLElement) => {
        if (!element) 
            return
        const childNodes = [];
        for (const node of element.childNodes) {
            if (this.notInteractiveElement(node))  
            childNodes.push(node);
        }
        return childNodes;
    }

    getTextNodes = (element: any): Array<String> => {
        const ELEMENT_NODE = 1;
        const TEXT_NODE = 3;
        const childNodes = this.getChildNodes(element);

        for (const elememt of childNodes) {
            if (elememt.nodeType === TEXT_NODE) {
                console.log(elememt.textContent)
                this.resultArray.push(elememt);
            } else if (elememt.nodeType === ELEMENT_NODE) {
                this.getTextNodes(elememt)
            }
        }
        return this.resultArray;
    }
}