import {Levels} from "../../core/enum/Levels";
import {WordbookService} from "../../core/words/WordbookService";

/**
 * PoC подсветки слов словаря через CSS Custom Highlight API.
 *
 * - Слова словаря подсвечиваются по уровню владения (по одному Highlight на уровень).
 * - При наведении слово подсвечивается фоном (reckue-hover) + снизу подсказка.
 * - Ctrl/Cmd + Shift + клик по слову: сохраняет новое / открывает попап для смены уровня.
 *   Комбо перехватывается (preventDefault), чтобы не конфликтовать с открытием ссылок.
 * - SPA-изменения отслеживаются MutationObserver'ом с коалесингом через requestIdleCallback.
 */

type WordbookCache = Map<string, string>;

const DEFAULT_LEVEL = "beginner";

const WORD_CHAR = /[\p{L}\p{M}]/u;
const WORD_TOKEN = /[\p{L}\p{M}]+/gu;

interface WordHit {
    word: string;
    range: Range;
}

export class HighlightPoc {

    private readonly service: WordbookService;
    private readonly cache: WordbookCache;
    private popup: HTMLElement | null = null;
    private popupLabel: HTMLElement | null = null;
    private levelSelect: HTMLSelectElement | null = null;
    private popupWord = "";
    private hint: HTMLElement | null = null;
    private observer: MutationObserver | null = null;
    private rebuildScheduled = false;
    private lastHover: { node: Node, start: number, end: number } | null = null;

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
        this.attachHover();
        this.attachClick();
        this.observe();
        window.console.log(`Reckue PoC: подсвечено слов — ${matches}`);
    }

    // --- SPA-инвалидация ---

    private observe = () => {
        this.observer = new MutationObserver((records) => {
            if (this.isRelevant(records)) {
                this.scheduleRebuild();
            }
        });
        this.observer.observe(document.body, {childList: true, subtree: true, characterData: true});
    }

    /** Релевантны только изменения реального контента, а не нашего попапа/подсказки. */
    private isRelevant = (records: MutationRecord[]): boolean => {
        for (const record of records) {
            if (record.type === "characterData") {
                if (!this.isOwnNode(record.target)) {
                    return true;
                }
                continue;
            }
            if (this.hasForeignNode(record.addedNodes) || this.hasForeignNode(record.removedNodes)) {
                return true;
            }
        }
        return false;
    }

    private hasForeignNode = (list: NodeList): boolean => {
        for (let i = 0; i < list.length; i++) {
            if (!this.isOwnNode(list[i])) {
                return true;
            }
        }
        return false;
    }

    private isOwnNode = (node: Node | null): boolean => {
        return (!!this.popup && (node === this.popup || this.popup.contains(node)))
            || (!!this.hint && (node === this.hint || this.hint.contains(node)));
    }

    private scheduleRebuild = () => {
        if (this.rebuildScheduled) {
            return;
        }
        this.rebuildScheduled = true;
        const run = () => {
            this.rebuildScheduled = false;
            this.buildHighlights();
        };
        const idle = (window as any).requestIdleCallback;
        if (idle) {
            idle(run, {timeout: 500});
        } else {
            setTimeout(run, 200);
        }
    }

    // --- подсветка словаря ---

    private injectStyles = () => {
        const rules = Object.keys(Levels).map((key) => {
            const level = (Levels as any)[key];
            return `::highlight(reckue-${level.name}) {`
                + ` color: ${level.hex};`
                + ` text-decoration: underline; text-decoration-color: ${level.hex};`
                + ` }`;
        });
        rules.push("::highlight(reckue-hover) { background-color: rgba(30, 129, 198, .25); }");
        const style = document.createElement("style");
        style.textContent = rules.join("\n");
        document.head.appendChild(style);
    }

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
                if (this.isOwnNode(node)) {
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
        // Обновляем все уровни (пустой Highlight гасит исчезнувшие слова).
        Object.keys(Levels).forEach((key) => {
            const name = (Levels as any)[key].name;
            const ranges = rangesByLevel[name] ?? [];
            highlights.set(`reckue-${name}`, new HighlightCtor(...ranges));
        });
        return count;
    }

    // --- наведение ---

    private attachHover = () => {
        let pending = false;
        let mx = 0;
        let my = 0;
        document.addEventListener("mousemove", (event: MouseEvent) => {
            mx = event.clientX;
            my = event.clientY;
            if (pending) {
                return;
            }
            pending = true;
            requestAnimationFrame(() => {
                pending = false;
                this.handleHover(mx, my);
            });
        });
    }

    private handleHover = (x: number, y: number) => {
        const hit = this.wordHitAt(x, y);
        if (!hit) {
            if (this.lastHover) {
                this.lastHover = null;
                this.clearHover();
                this.hideHint();
            }
            return;
        }
        const node = hit.range.startContainer;
        const start = hit.range.startOffset;
        const end = hit.range.endOffset;
        if (this.lastHover && this.lastHover.node === node
            && this.lastHover.start === start && this.lastHover.end === end) {
            return;
        }
        this.lastHover = {node, start, end};
        this.setHover(hit.range);
        this.showHint(hit.range);
    }

    private setHover = (range: Range) => {
        (window as any).CSS.highlights.set("reckue-hover", new (window as any).Highlight(range));
    }

    private clearHover = () => {
        (window as any).CSS.highlights.delete("reckue-hover");
    }

    /** Подсказка с комбо под словом, не перекрывая его. */
    private showHint = (range: Range) => {
        const rect = range.getBoundingClientRect();
        if (!this.hint) {
            this.hint = document.createElement("div");
            Object.assign(this.hint.style, {
                position: "fixed",
                background: "#111111",
                color: "#ffffff",
                borderRadius: "4px",
                padding: "2px 6px",
                font: "11px system-ui, sans-serif",
                whiteSpace: "nowrap",
                zIndex: "2147483647",
                pointerEvents: "none"
            });
            document.body.appendChild(this.hint);
        }
        this.hint.textContent = this.isInsideLink(range.startContainer)
            ? "ctrl + shift + click"
            : "click";
        this.hint.style.left = `${rect.left}px`;
        this.hint.style.top = `${rect.bottom + 4}px`;
        this.hint.style.display = "block";
    }

    private hideHint = () => {
        if (this.hint) {
            this.hint.style.display = "none";
        }
    }

    // --- клик (Ctrl/Cmd + Shift) ---

    private attachClick = () => {
        document.addEventListener("click", (event: MouseEvent) => {
            // Клик внутри нашего попапа — не мешаем (там меняется уровень).
            if (this.popup && this.popup.contains(event.target as Node)) {
                return;
            }
            const combo = (event.ctrlKey || event.metaKey) && event.shiftKey;
            const hit = this.wordHitAt(event.clientX, event.clientY);
            if (!hit) {
                if (!combo) {
                    this.hidePopup(); // клик мимо слова — закрыть попап
                }
                return;
            }
            const isLink = this.isInsideLink(hit.range.startContainer);
            if (isLink && !combo) {
                // Обычный клик по ссылке не трогаем — пусть переходит как обычно.
                return;
            }
            if (isLink) {
                // Комбо по ссылке: перехватываем, иначе откроется вкладка/переход.
                event.preventDefault();
                event.stopPropagation();
            }
            const key = hit.word.toLowerCase();
            if (!this.cache.get(key)) {
                // Незнакомое слово: сохраняем (с записью в storage) и перекрашиваем.
                this.service.set([{word: key, level: DEFAULT_LEVEL}]);
                this.buildHighlights();
            }
            this.hideHint();
            this.showPopup(key, event.clientX, event.clientY);
        });
    }

    private isInsideLink = (node: Node): boolean => {
        const el = node.nodeType === Node.TEXT_NODE
            ? (node as Text).parentElement
            : (node as Element);
        return !!(el && el.closest && el.closest("a"));
    }

    // --- определение слова под точкой ---

    private wordHitAt = (x: number, y: number): WordHit | null => {
        const caret = this.caretFromPoint(x, y);
        if (!caret || caret.node.nodeType !== Node.TEXT_NODE || this.isOwnNode(caret.node)) {
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
        if (end <= start) {
            return null;
        }
        // caretPositionFromPoint «прилипает» к ближайшему слову даже при клике мимо
        // текста. Проверяем, что точка реально внутри прямоугольника слова.
        const range = document.createRange();
        range.setStart(caret.node, start);
        range.setEnd(caret.node, end);
        if (!this.pointInRange(x, y, range)) {
            return null;
        }
        return {word: text.slice(start, end), range};
    }

    private pointInRange = (x: number, y: number, range: Range): boolean => {
        const rects = range.getClientRects();
        for (let i = 0; i < rects.length; i++) {
            const r = rects[i];
            if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
                return true;
            }
        }
        return false;
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

    // --- интерактивный попап (редактирование уровня) ---

    private showPopup = (word: string, x: number, y: number) => {
        this.popupWord = word;
        const level = this.cache.get(word) ?? DEFAULT_LEVEL;
        if (!this.popup) {
            this.buildPopup();
        }
        const el = this.popup as HTMLElement;
        (this.popupLabel as HTMLElement).textContent = word;
        if (this.levelSelect) {
            this.levelSelect.value = level;
        }
        el.style.borderLeft = `3px solid ${this.hexForLevel(level)}`;
        el.style.left = `${x}px`;
        el.style.top = `${y + 14}px`;
        el.style.display = "flex";
    }

    private buildPopup = () => {
        const el = document.createElement("div");
        Object.assign(el.style, {
            position: "fixed",
            display: "none",
            alignItems: "center",
            gap: "8px",
            background: "#ffffff",
            color: "#111111",
            border: "1px solid #cccccc",
            borderRadius: "6px",
            padding: "6px 10px",
            font: "12px system-ui, sans-serif",
            zIndex: "2147483647",
            boxShadow: "0 2px 8px rgba(0,0,0,.2)"
        });

        const label = document.createElement("span");
        label.style.fontWeight = "600";

        const select = document.createElement("select");
        Object.keys(Levels).forEach((key) => {
            const name = (Levels as any)[key].name;
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        select.addEventListener("change", () => this.changeLevel(this.popupWord, select.value));

        el.appendChild(label);
        el.appendChild(select);
        document.body.appendChild(el);

        this.popup = el;
        this.popupLabel = label;
        this.levelSelect = select;
    }

    private changeLevel = (word: string, level: string) => {
        if (!word) {
            return;
        }
        this.service.set([{word, level}]);
        this.buildHighlights();
        if (this.popup) {
            this.popup.style.borderLeft = `3px solid ${this.hexForLevel(level)}`;
        }
    }

    private hidePopup = () => {
        if (this.popup) {
            this.popup.style.display = "none";
        }
    }

    private hexForLevel = (level: string): string => {
        const found = Object.keys(Levels)
            .map((key) => (Levels as any)[key])
            .find((entry) => entry.name === level);
        return found ? found.hex : "#1e81c6";
    }
}
