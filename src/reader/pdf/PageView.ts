import * as pdfjsLib from "pdfjs-dist";

/**
 * Одна страница PDF: растр в <canvas> + прозрачный текстовый слой PDF.js поверх.
 * Подсветка слов работает по text-нодам этого слоя (см. HighlightStore в background-режиме).
 *
 * Рендер ленивый: el создаётся с финальными размерами сразу (чтобы не прыгал
 * скролл), а тяжёлый canvas/textLayer строится только когда страница близка к вьюпорту.
 */
export class PageView {

    readonly el: HTMLElement;
    readonly #page: pdfjsLib.PDFPageProxy;
    readonly #scale: number;
    #rendered = false;

    constructor(page: pdfjsLib.PDFPageProxy, scale: number) {
        this.#page = page;
        this.#scale = scale;
        const viewport = page.getViewport({scale});
        const el = document.createElement("div");
        el.className = "page";
        el.style.setProperty("--scale-factor", String(scale));
        el.style.width = Math.floor(viewport.width) + "px";
        el.style.height = Math.floor(viewport.height) + "px";
        this.el = el;
    }

    render = async () => {
        if (this.#rendered) {
            return;
        }
        this.#rendered = true;

        const viewport = this.#page.getViewport({scale: this.#scale});
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
        await this.#page.render({canvas, viewport, transform} as any).promise;

        const textLayer = new pdfjsLib.TextLayer({
            textContentSource: this.#page.streamTextContent(),
            container: textLayerDiv,
            viewport,
        });
        await textLayer.render();
    };
}
