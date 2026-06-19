import * as pdfjsLib from "pdfjs-dist";
import {PageView} from "./PageView";
import {PdfSourceDescriptor} from "../source/PdfSource";

// Worker лежит рядом в dist/reader (кладёт copy-webpack-plugin). CDN недоступен из-за CSP MV3.
pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("dist/reader/pdf.worker.mjs");

/**
 * Загружает документ и раскладывает страницы в контейнер. Рендер постраничный и
 * ленивый (IntersectionObserver): видна только часть книги — остальное рисуется
 * по мере прокрутки. Зум перекладывает всё заново с новым масштабом.
 */
export class PdfViewer {

    readonly #container: HTMLElement;
    #doc: pdfjsLib.PDFDocumentProxy | null = null;
    #fitScale = 1;
    #zoom = 1;
    #observer: IntersectionObserver | null = null;
    #views: PageView[] = [];

    constructor(container: HTMLElement) {
        this.#container = container;
    }

    open = async (source: PdfSourceDescriptor): Promise<number> => {
        this.#doc = await pdfjsLib.getDocument(source as any).promise;
        const first = await this.#doc.getPage(1);
        const unscaled = first.getViewport({scale: 1});
        const target = Math.min(this.#container.clientWidth - 24, 1000);
        this.#fitScale = target > 0 ? target / unscaled.width : 1;
        await this.#layout();
        return this.#doc.numPages;
    };

    zoomBy = async (factor: number) => {
        this.#zoom = Math.min(4, Math.max(0.25, this.#zoom * factor));
        await this.#layout();
    };

    #layout = async () => {
        const doc = this.#doc;
        if (!doc) {
            return;
        }
        this.#observer?.disconnect();
        this.#container.textContent = "";
        this.#views = [];

        const scale = this.#fitScale * this.#zoom;
        const observer = new IntersectionObserver(this.#onIntersect, {rootMargin: "200% 0px"});
        for (let i = 1; i <= doc.numPages; i++) {
            const page = await doc.getPage(i);
            const view = new PageView(page, scale);
            this.#views.push(view);
            this.#container.appendChild(view.el);
            observer.observe(view.el);
        }
        this.#observer = observer;
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
}
