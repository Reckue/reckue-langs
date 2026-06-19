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

    /**
     * Собирает текстовые узлы поддерева через нативный TreeWalker.
     * Интерактивные элементы отбрасываются целиком (FILTER_REJECT пропускает их поддерево),
     * остальные элементы пропускаем как контейнеры (FILTER_SKIP) и спускаемся глубже.
     */
    getTextNodes = (element: Node | null): Array<Node> => {
        const result: Array<Node> = [];
        if (!element) {
            return result;
        }
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: (node: Node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        return this.notInteractiveElement(node)
                            ? NodeFilter.FILTER_SKIP
                            : NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        let node: Node | null;
        while ((node = walker.nextNode())) {
            result.push(node);
        }
        return result;
    }
}