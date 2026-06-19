import {isUi} from "../ui/Ui";

/**
 * Обход DOM (бывш. PageParser + NodeManager из 0.5.0): отдаёт текстовые ноды,
 * отсекая неинтерактивные/служебные элементы и собственный UI. Заходит в открытые
 * shadow roots рекурсивно. Работает и по всему body (первичный скан), и по
 * поддереву (инкрементальная инвалидация), и по уже отсоединённому поддереву
 * (снятие подсветки при удалении).
 */
export class PageScanner {

    walk = (root: Node, onText: (node: Text) => void, onShadow?: (root: ShadowRoot) => void) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
            acceptNode: this.filter
        });
        let node: Node | null;
        while ((node = walker.nextNode())) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const shadow = (node as Element).shadowRoot;
                if (shadow) {
                    onShadow && onShadow(shadow);
                    this.walk(shadow, onText, onShadow);
                }
                continue;
            }
            onText(node as Text);
        }
    };

    private filter = (node: Node): number => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tag = el.tagName;
            if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || el.isContentEditable || isUi(el)) {
                return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
        const value = node.nodeValue;
        return value && value.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    };
}
