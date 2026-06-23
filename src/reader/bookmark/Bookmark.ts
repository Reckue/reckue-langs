import {markUi} from "../../page/ui/Ui";

interface Saved {
    pageIndex: number;   // 1-based номер страницы
    charOffset: number;  // смещение каретки в логическом тексте слоя страницы
    title: string;
    updatedAt: number;
}

// Все закладки в одном ключе: одна позиция-прогресс на документ (по id).
const KEY = "readerBookmarks";

/**
 * Закладка-прогресс ридера: «докуда дочитал». Ставится жестом Alt+Click прямо в
 * текст (каретка между словами), одна на документ — новый Alt+Click переносит.
 *
 * Якорь — pageIndex + смещение каретки в логическом тексте текстового слоя
 * страницы (обход text-нод). От зума/масштаба не зависит, поэтому переживает
 * перекладку и переоткрытие. Маркер помечен reckue-ui — движок слов его не трогает.
 */
export class Bookmark {

    readonly #onJump?: (pageIndex: number) => void;
    #docId = "";
    #title = "";
    #saved: Saved | null = null;
    #marker: HTMLElement | null = null;
    #pendingScroll = false;   // ждём рендер страницы закладки, чтобы доскроллить к ней

    constructor(onJump?: (pageIndex: number) => void) {
        this.#onJump = onJump;
    }

    /** Загрузить сохранённую закладку документа. Резолвится её pageIndex или null. */
    load = (docId: string, title: string): Promise<number | null> => {
        this.#docId = docId;
        this.#title = title;
        this.#saved = null;
        this.#removeMarker();
        return new Promise((resolve) => {
            chrome.storage.local.get([KEY], (s) => {
                const map = (s[KEY] || {}) as Record<string, Saved>;
                this.#saved = map[docId] || null;
                this.#pendingScroll = !!this.#saved;
                // Страница закладки могла отрендериться раньше, чем вернулся storage —
                // тогда onTextLayer для неё уже не сработает, рисуем по факту.
                this.#drawIfRendered();
                resolve(this.#saved ? this.#saved.pageIndex : null);
            });
        });
    };

    // Нарисовать маркер, если слой страницы закладки уже есть в DOM.
    #drawIfRendered = () => {
        if (!this.#saved) {
            return;
        }
        const pageEl = document.querySelector(`.page[data-page="${this.#saved.pageIndex}"]`) as HTMLElement | null;
        const layer = pageEl?.querySelector(".textLayer") as HTMLElement | null;
        if (pageEl && layer) {
            this.onTextLayer(layer);
        }
    };

    has = (): boolean => !!this.#saved;

    /**
     * Alt+Click: поставить/перенести закладку в позицию каретки. true — если
     * попали в текстовый слой (жест перехвачен, обычный клик гасим выше).
     */
    place = (x: number, y: number): boolean => {
        const caret = this.#caretFromPoint(x, y);
        if (!caret || caret.node.nodeType !== Node.TEXT_NODE) {
            return false;
        }
        const node = caret.node as Text;
        const parent = node.parentElement;
        const layer = parent?.closest(".textLayer") as HTMLElement | null;
        const pageEl = parent?.closest(".page") as HTMLElement | null;
        if (!layer || !pageEl) {
            return false;
        }
        const pageIndex = Number(pageEl.dataset.page) || 1;
        const charOffset = this.#offsetOf(layer, node, caret.offset);
        this.#saved = {pageIndex, charOffset, title: this.#title, updatedAt: Date.now()};
        this.#pendingScroll = false;
        this.#draw(pageEl, layer);
        this.#persist();
        return true;
    };

    /** Текстовый слой страницы отрисован — если это страница закладки, нарисовать маркер. */
    onTextLayer = (layer: HTMLElement) => {
        if (!this.#saved) {
            return;
        }
        const pageEl = layer.closest(".page") as HTMLElement | null;
        if (!pageEl || (Number(pageEl.dataset.page) || 1) !== this.#saved.pageIndex) {
            return;
        }
        this.#draw(pageEl, layer);
        if (this.#pendingScroll) {
            this.#pendingScroll = false;
            this.#marker?.scrollIntoView({block: "center"});
        }
    };

    /** Прыжок к закладке (кнопка тулбара / клавиша B). */
    jump = () => {
        if (!this.#saved) {
            return;
        }
        if (this.#marker && this.#marker.isConnected) {
            this.#marker.scrollIntoView({block: "center"});
            return;
        }
        // Страница ещё не отрисована — доведём скролл к маркеру после её рендера.
        this.#pendingScroll = true;
        this.#onJump && this.#onJump(this.#saved.pageIndex);
    };

    // Нарисовать каретку-маркер у сохранённого смещения внутри слоя страницы.
    #draw = (pageEl: HTMLElement, layer: HTMLElement) => {
        if (!this.#saved) {
            return;
        }
        const loc = this.#locate(layer, this.#saved.charOffset);
        if (!loc) {
            return;
        }
        const range = document.createRange();
        range.setStart(loc.node, Math.min(loc.offset, loc.node.length));
        range.collapse(true);
        const rects = range.getClientRects();
        const rect = rects.length ? rects[0] : range.getBoundingClientRect();
        const pageRect = pageEl.getBoundingClientRect();

        this.#removeMarker();
        const marker = document.createElement("div");
        marker.className = "reckue-bookmark";
        markUi(marker);
        marker.style.left = (rect.left - pageRect.left) + "px";
        marker.style.top = (rect.top - pageRect.top) + "px";
        marker.style.height = (rect.height || 16) + "px";
        pageEl.appendChild(marker);
        this.#marker = marker;
    };

    #removeMarker = () => {
        this.#marker && this.#marker.remove();
        this.#marker = null;
    };

    #persist = () => {
        chrome.storage.local.get([KEY], (s) => {
            const map = (s[KEY] || {}) as Record<string, Saved>;
            if (this.#saved) {
                map[this.#docId] = this.#saved;
            }
            chrome.storage.local.set({[KEY]: map});
        });
    };

    // Смещение (node, offset) в логическом тексте слоя (без фильтрации — те же
    // ноды, что и в #locate, чтобы прямой и обратный обход совпадали).
    #offsetOf = (layer: HTMLElement, target: Text, offset: number): number => {
        let total = 0;
        const walker = document.createTreeWalker(layer, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
            if (node === target) {
                return total + offset;
            }
            total += (node.nodeValue ?? "").length;
        }
        return total + offset;
    };

    // Обратно: по смещению найти text-ноду и локальный offset.
    #locate = (layer: HTMLElement, charOffset: number): { node: Text, offset: number } | null => {
        let total = 0;
        const walker = document.createTreeWalker(layer, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
            const len = (node.nodeValue ?? "").length;
            if (charOffset <= total + len) {
                return {node: node as Text, offset: charOffset - total};
            }
            total += len;
        }
        return null;
    };

    #caretFromPoint = (x: number, y: number): { node: Node, offset: number } | null => {
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
    };
}
