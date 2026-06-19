import {Levels} from "../../core/enum/Levels";
import {WordbookService} from "../../core/words/WordbookService";

/**
 * PoC подсветки слов словаря через CSS Custom Highlight API.
 *
 * Идея: не мутируем DOM страницы и не строим overlay-слой — регистрируем
 * по одному Highlight на уровень владения (CSS.highlights), а браузер сам
 * красит соответствующие Range поверх текста (как ::selection).
 * Клик по слову ловим одним слушателем и резолвим слово по координатам
 * через caretPositionFromPoint — самой подсветке обработчик не нужен.
 */

type WordbookCache = Map<string, string>; // нормализованное слово -> имя уровня

const DEFAULT_LEVEL = "beginner"; // новое слово считаем самым незнакомым

const WORD_CHAR = /[\p{L}\p{M}]/u;
const WORD_TOKEN = /[\p{L}\p{M}]+/gu;

export class HighlightPoc {

    private readonly service: WordbookService;
    private readonly cache: WordbookCache;
    private popup: HTMLElement | null = null;

    constructor(service: WordbookService) {
        this.service = service;
        this.cache = (service.getWordbookCache() ?? new Map()) as WordbookCache;
    }

    run = () => {
        const css = (window as any).CSS;
        if (!css || !css.highlights || typeof (window as any).Highlight === "undefined") {
            window.console.warn("Reckue: CSS Custom Highlight API не поддерживается этим браузером");
            return;
        }
        this.injectStyles();
        const matches = this.buildHighlights();
        this.attachClick();
        window.console.log(`Reckue PoC: подсвечено слов — ${matches}`);
    }

    /** ::highlight(reckue-<level>) — цвет берём из Levels. */
    private injectStyles = () => {
        const rules = Object.keys(Levels).map((key) => {
            const level = (Levels as any)[key];
            return `::highlight(reckue-${level.name}) {`
                + ` color: ${level.hex};`
                + ` text-decoration: underline; text-decoration-color: ${level.hex};`
                + ` }`;
        }).join("\n");
        const style = document.createElement("style");
        style.textContent = rules;
        document.head.appendChild(style);
    }

    /** Один проход TreeWalker'ом: для каждого слова из словаря создаём Range. */
    private buildHighlights = (): number => {
        const rangesByLevel: Record<string, Range[]> = {};
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: (node: Node) => {
                const parent = (node as Text).parentElement;
                if (!parent) {
                    return NodeFilter.FILTER_REJECT;
                }
                const tag = parent.tagName;
                if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || parent.isContentEditable) {
                    return NodeFilter.FILTER_REJECT;
                }
                const value = node.nodeValue;
                return value && value.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });

        let count = 0;
        let node: Node | null;
        while ((node = walker.nextNode())) {
            const text = node.nodeValue as string;
            for (const match of text.matchAll(WORD_TOKEN)) {
                const token = match[0];
                const level = this.cache.get(token.toLowerCase());
                if (!level || match.index === undefined) {
                    continue;
                }
                const range = document.createRange();
                range.setStart(node, match.index);
                range.setEnd(node, match.index + token.length);
                (rangesByLevel[level] ||= []).push(range);
                count++;
            }
        }

        const highlights = (window as any).CSS.highlights;
        const HighlightCtor = (window as any).Highlight;
        for (const level of Object.keys(rangesByLevel)) {
            highlights.set(`reckue-${level}`, new HighlightCtor(...rangesByLevel[level]));
        }
        return count;
    }

    private attachClick = () => {
        document.addEventListener("click", (event: MouseEvent) => {
            const word = this.wordAt(event.clientX, event.clientY);
            if (!word) {
                this.hidePopup();
                return;
            }
            const key = word.toLowerCase();
            let level = this.cache.get(key);
            if (!level) {
                // Незнакомое слово: сохраняем в словарь (с записью в storage) и перекрашиваем.
                level = DEFAULT_LEVEL;
                this.service.set([{word: key, level}]);
                this.buildHighlights();
            }
            this.showPopup(word, level, event.clientX, event.clientY);
        });
    }

    /** Слово под курсором: caret по координатам + расширение до границ слова. */
    private wordAt = (x: number, y: number): string | null => {
        const caret = this.caretFromPoint(x, y);
        if (!caret || caret.node.nodeType !== Node.TEXT_NODE) {
            return null;
        }
        const text = caret.node.nodeValue ?? "";
        let start = caret.offset;
        let end = caret.offset;
        while (start > 0 && WORD_CHAR.test(text[start - 1])) {
            start--;
        }
        while (end < text.length && WORD_CHAR.test(text[end])) {
            end++;
        }
        const word = text.slice(start, end);
        return word.length > 0 ? word : null;
    }

    private caretFromPoint = (x: number, y: number): { node: Node, offset: number } | null => {
        const doc = document as any;
        if (doc.caretPositionFromPoint) {
            const pos = doc.caretPositionFromPoint(x, y);
            return pos ? {node: pos.offsetNode, offset: pos.offset} : null;
        }
        if (doc.caretRangeFromPoint) {
            const range = doc.caretRangeFromPoint(x, y);
            return range ? {node: range.startContainer, offset: range.startOffset} : null;
        }
        return null;
    }

    private showPopup = (word: string, level: string, x: number, y: number) => {
        this.hidePopup();
        const hex = this.hexForLevel(level);
        const el = document.createElement("div");
        el.textContent = `${word} — ${level}`;
        Object.assign(el.style, {
            position: "fixed",
            left: `${x}px`,
            top: `${y + 14}px`,
            background: "#ffffff",
            color: "#111111",
            borderLeft: `3px solid ${hex}`,
            border: `1px solid ${hex}`,
            borderRadius: "6px",
            padding: "4px 8px",
            font: "12px system-ui, sans-serif",
            zIndex: "2147483647",
            boxShadow: "0 2px 8px rgba(0,0,0,.2)",
            pointerEvents: "none"
        });
        document.body.appendChild(el);
        this.popup = el;
    }

    private hidePopup = () => {
        if (this.popup) {
            this.popup.remove();
            this.popup = null;
        }
    }

    private hexForLevel = (level: string): string => {
        const found = Object.keys(Levels)
            .map((key) => (Levels as any)[key])
            .find((entry) => entry.name === level);
        return found ? found.hex : "#1e81c6";
    }
}
