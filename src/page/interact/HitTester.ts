import {WORD_CHAR} from "../word/Word";
import {RootRegistry} from "../scan/RootRegistry";
import {isUi} from "../ui/Ui";

export interface Hit {
    node: Text;
    start: number;
    end: number;
    word: string;
    range: Range;
    isLink: boolean;
}

/**
 * Определение слова под точкой через caretPositionFromPoint (нужно, потому что
 * с Highlight API нет per-word элементов — попасть событием не во что).
 * Заходит в shadow roots: опция shadowRoots пробивает теневые границы в Chrome 128+,
 * на старых версиях лишний аргумент игнорируется.
 */
export class HitTester {

    private readonly roots: RootRegistry;

    constructor(roots: RootRegistry) {
        this.roots = roots;
    }

    at = (x: number, y: number): Hit | null => {
        const caret = this.caretFromPoint(x, y);
        if (!caret || caret.node.nodeType !== Node.TEXT_NODE || isUi(caret.node)) {
            return null;
        }
        const node = caret.node as Text;
        const text = node.nodeValue ?? "";
        let start = caret.offset;
        let end = caret.offset;
        while (start > 0 && WORD_CHAR.test(text[start - 1])) {
            start--;
        }
        while (end < text.length && WORD_CHAR.test(text[end])) {
            end++;
        }
        if (end <= start) {
            return null;
        }
        const range = document.createRange();
        range.setStart(node, start);
        range.setEnd(node, end);
        if (!this.pointInRange(x, y, range)) {
            return null;
        }
        return {node, start, end, word: text.slice(start, end), range, isLink: this.isLink(node)};
    };

    private isLink = (node: Node): boolean => {
        const el = node.nodeType === Node.TEXT_NODE ? (node as Text).parentElement : (node as Element);
        return !!(el && el.closest && el.closest("a"));
    };

    private pointInRange = (x: number, y: number, range: Range): boolean => {
        const rects = range.getClientRects();
        for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
                return true;
            }
        }
        return false;
    };

    private caretFromPoint = (x: number, y: number): { node: Node, offset: number } | null => {
        const doc = document as any;
        if (doc.caretPositionFromPoint) {
            const shadowRoots = this.roots.shadowRoots();
            const pos = shadowRoots.length
                ? doc.caretPositionFromPoint(x, y, {shadowRoots})
                : doc.caretPositionFromPoint(x, y);
            return pos ? {node: pos.offsetNode, offset: pos.offset} : null;
        }
        if (doc.caretRangeFromPoint) {
            const range = doc.caretRangeFromPoint(x, y);
            return range ? {node: range.startContainer, offset: range.startOffset} : null;
        }
        return null;
    };
}
