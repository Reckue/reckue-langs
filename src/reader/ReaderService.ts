import {PageManager} from "../page/PageManager";
import {PdfViewer} from "./pdf/PdfViewer";
import {PdfSource, PdfSourceDescriptor} from "./source/PdfSource";
import {Toolbar} from "./ui/Toolbar";

/**
 * Reader-поверхность (третья, рядом с page/popup): свой вьювер PDF на PDF.js.
 * Нативный вьювер Chrome контент-скрипту недоступен, поэтому PDF рендерится в
 * обычный DOM с текстовым слоем — а по нему запускается тот же движок слов,
 * что и на странице (PageManager в background-режиме подсветки).
 */
export class ReaderService {

    readonly #manager = new PageManager();
    #viewer!: PdfViewer;
    #toolbar!: Toolbar;

    run = () => {
        const pages = document.getElementById("pages");
        const toolbar = document.getElementById("toolbar");
        if (!pages || !toolbar) {
            return;
        }

        this.#viewer = new PdfViewer(pages);
        this.#toolbar = new Toolbar(toolbar, {
            onOpenFile: (file) => this.#openFile(file),
            onZoom: (factor) => this.#viewer.zoomBy(factor),
        });

        // Движок стартует до загрузки PDF: страницы добавятся лениво, а
        // MutationPipeline (observe document.body) подхватит их текст по мере появления.
        this.#manager.run({background: true});

        this.#enableDrop();

        const source = PdfSource.fromQuery();
        if (source) {
            this.#load(source, this.#fileName(source));
        } else {
            this.#toolbar.setTitle("Откройте PDF");
        }
    };

    #openFile = async (file: File) => {
        this.#load(await PdfSource.fromFile(file), file.name);
    };

    #load = async (source: PdfSourceDescriptor, name: string) => {
        this.#toolbar.setTitle(name);
        try {
            const count = await this.#viewer.open(source);
            this.#toolbar.setPages(count);
        } catch (e) {
            this.#toolbar.setTitle("Не удалось открыть PDF");
            window.console.warn("Reckue reader:", e);
        }
    };

    #fileName = (source: PdfSourceDescriptor): string => {
        if ("url" in source) {
            try {
                const path = new URL(source.url).pathname;
                return decodeURIComponent(path.split("/").pop() || source.url);
            } catch {
                return source.url;
            }
        }
        return "Документ";
    };

    #enableDrop = () => {
        document.addEventListener("dragover", (e) => e.preventDefault());
        document.addEventListener("drop", (e) => {
            e.preventDefault();
            const file = e.dataTransfer && e.dataTransfer.files[0];
            if (file && file.type === "application/pdf") {
                this.#openFile(file);
            }
        });
    };
}
