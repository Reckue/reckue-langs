import * as pdfjsLib from "pdfjs-dist";
import {PageView} from "./PageView";
import {PdfSourceDescriptor} from "../source/PdfSource";

// Worker лежит рядом в dist/reader (кладёт copy-webpack-plugin). CDN недоступен из-за CSP MV3.
pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("dist/reader/pdf.worker.mjs");

/**
 * Загружает документ и раскладывает страницы в контейнер. Рендер постраничный и
 * ленивый (IntersectionObserver): видна только часть книги — остальное рисуется
 * по мере прокрутки. Плейсхолдеры создаются мгновенно (размер оценивается по 1-й
 * странице), поэтому открытие не зависит от объёма документа. Зум перекладывает
 * заново, сохраняя текущую позицию прокрутки.
 */
interface ViewerHooks {
    onTextLayer?: (el: HTMLElement) => void;        // текстовый слой страницы отрисован
    onReset?: () => void;                            // перекладка (зум) — страницы пересоздаются
    onPageChange?: (page: number, total: number) => void;  // сменилась текущая видимая страница
}

interface Anchor {
    page: number;
    frac: number;   // доля прокрутки внутри страницы [0..1)
}

export class PdfViewer {

    readonly #container: HTMLElement;
    readonly #hooks: ViewerHooks;
    #doc: pdfjsLib.PDFDocumentProxy | null = null;
    #fitScale = 1;
    #zoom = 1;
    #observer: IntersectionObserver | null = null;
    #views: PageView[] = [];
    #tops: number[] = [];   // top каждой страницы в системе прокрутки контейнера
    #current = 1;
    #scrollRaf = 0;

    constructor(container: HTMLElement, hooks: ViewerHooks = {}) {
        this.#container = container;
        this.#hooks = hooks;
        this.#container.addEventListener("scroll", this.#onScroll, {passive: true});
    }

    open = async (source: PdfSourceDescriptor): Promise<number> => {
        const params = "url" in source
            ? {url: source.url, withCredentials: source.withCredentials}
            : {data: source.data};
        this.#doc = await pdfjsLib.getDocument(params as any).promise;
        const first = await this.#doc.getPage(1);
        const unscaled = first.getViewport({scale: 1});
        const target = Math.min(this.#container.clientWidth - 24, 1000);
        this.#fitScale = target > 0 ? target / unscaled.width : 1;
        await this.#layout();
        return this.#doc.numPages;
    };

    pageCount = (): number => this.#doc ? this.#doc.numPages : 0;

    scrollToPage = (page: number) => {
        const view = this.#views[page - 1];
        view && view.el.scrollIntoView({block: "start"});
    };

    zoomBy = async (factor: number) => {
        const anchor = this.#anchor();
        this.#zoom = Math.min(4, Math.max(0.25, this.#zoom * factor));
        await this.#layout();
        this.#restore(anchor);
    };

    #layout = async () => {
        const doc = this.#doc;
        if (!doc) {
            return;
        }
        this.#observer?.disconnect();
        this.#container.textContent = "";
        this.#views = [];
        this.#hooks.onReset && this.#hooks.onReset();

        const scale = this.#fitScale * this.#zoom;
        // Оценка размера по 1-й странице: плейсхолдеры всех страниц создаём сразу,
        // без await getPage на каждую — иначе открытие линейно по числу страниц.
        const first = await doc.getPage(1);
        const est = first.getViewport({scale});

        const observer = new IntersectionObserver(this.#onIntersect, {rootMargin: "200% 0px"});
        for (let i = 1; i <= doc.numPages; i++) {
            const view = new PageView(() => doc.getPage(i), i, scale, est.width, est.height, this.#hooks.onTextLayer);
            this.#views.push(view);
            this.#container.appendChild(view.el);
            observer.observe(view.el);
        }
        this.#observer = observer;
        this.#measure();
    };

    #onIntersect = (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) {
                continue;
            }
            const view = this.#views.find((v) => v.el === entry.target);
            view?.render();
        }
    };

    // Кэш вертикальных позиций страниц для дешёвого определения текущей при скролле
    // (один проход getBoundingClientRect на перекладку, а не на каждый кадр скролла).
    #measure = () => {
        const base = this.#container.getBoundingClientRect().top - this.#container.scrollTop;
        this.#tops = this.#views.map((v) => v.el.getBoundingClientRect().top - base);
    };

    #onScroll = () => {
        if (this.#scrollRaf) {
            return;
        }
        this.#scrollRaf = requestAnimationFrame(() => {
            this.#scrollRaf = 0;
            this.#updateCurrent();
        });
    };

    #updateCurrent = () => {
        const mark = this.#container.scrollTop + this.#container.clientHeight * 0.3;
        let page = 1;
        for (let i = 0; i < this.#tops.length; i++) {
            if (this.#tops[i] <= mark) {
                page = i + 1;
            } else {
                break;
            }
        }
        if (page !== this.#current) {
            this.#current = page;
            this.#hooks.onPageChange && this.#hooks.onPageChange(page, this.pageCount());
        }
    };

    #anchor = (): Anchor | null => {
        const view = this.#views[this.#current - 1];
        if (!view) {
            return null;
        }
        const top = this.#tops[this.#current - 1] ?? 0;
        const h = view.el.offsetHeight || 1;
        return {page: this.#current, frac: (this.#container.scrollTop - top) / h};
    };

    #restore = (anchor: Anchor | null) => {
        if (!anchor) {
            return;
        }
        const view = this.#views[anchor.page - 1];
        if (!view) {
            return;
        }
        const top = this.#tops[anchor.page - 1] ?? 0;
        this.#container.scrollTop = top + anchor.frac * (view.el.offsetHeight || 1);
    };
}
