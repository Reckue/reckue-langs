import * as pdfjsLib from "pdfjs-dist";

/**
 * Одна страница PDF: растр в <canvas> + прозрачный текстовый слой PDF.js поверх.
 * Подсветка слов работает по text-нодам этого слоя (см. HighlightStore в background-режиме).
 *
 * Рендер ленивый: el создаётся сразу с оценкой размера (по 1-й странице) — чтобы
 * не блокировать открытие и не прыгал скролл, — а сама страница (proxy + canvas +
 * textLayer) подтягивается только когда близка к вьюпорту. Реальный размер
 * уточняется при рендере, если отличается от оценки (неоднородный документ).
 */
export class PageView {

    readonly el: HTMLElement;
    readonly #getPage: () => Promise<pdfjsLib.PDFPageProxy>;
    readonly #scale: number;
    readonly #onTextLayer?: (el: HTMLElement) => void;
    #rendered = false;

    constructor(getPage: () => Promise<pdfjsLib.PDFPageProxy>, pageNumber: number,
                scale: number, estWidth: number, estHeight: number,
                onTextLayer?: (el: HTMLElement) => void) {
        this.#getPage = getPage;
        this.#scale = scale;
        this.#onTextLayer = onTextLayer;
        const el = document.createElement("div");
        el.className = "page";
        el.dataset.page = String(pageNumber);
        el.style.setProperty("--scale-factor", String(scale));
        el.style.width = Math.floor(estWidth) + "px";
        el.style.height = Math.floor(estHeight) + "px";
        this.el = el;
    }

    render = async () => {
        if (this.#rendered) {
            return;
        }
        this.#rendered = true;

        const page = await this.#getPage();
        const viewport = page.getViewport({scale: this.#scale});

        // Уточнить плейсхолдер, если реальный размер страницы отличается от оценки.
        if (Math.floor(viewport.width) !== this.el.clientWidth
            || Math.floor(viewport.height) !== this.el.clientHeight) {
            this.el.style.width = Math.floor(viewport.width) + "px";
            this.el.style.height = Math.floor(viewport.height) + "px";
        }

        const outputScale = window.devicePixelRatio || 1;

        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";
        this.el.appendChild(canvas);

        const textLayerDiv = document.createElement("div");
        textLayerDiv.className = "textLayer";
        this.el.appendChild(textLayerDiv);

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;
        await page.render({canvas, viewport, transform} as any).promise;

        const textLayer = new pdfjsLib.TextLayer({
            textContentSource: page.streamTextContent(),
            container: textLayerDiv,
            viewport,
        });
        await textLayer.render();

        // Слой готов и спозиционирован — отдаём сшивателю слов (перенос/буквица).
        this.#onTextLayer && this.#onTextLayer(textLayerDiv);
    };
}
