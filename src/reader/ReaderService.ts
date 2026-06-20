import {PageManager} from "../page/PageManager";
import {Context} from "../core/Context";
import {WordMatcher} from "../page/word/WordMatcher";
import {HighlightStore} from "../page/highlight/HighlightStore";
import {PdfViewer} from "./pdf/PdfViewer";
import {WordStitcher} from "./pdf/WordStitcher";
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

        // Сшивка слов, разорванных текстовым слоем PDF.js на несколько спанов
        // (перенос по слогам, буквица). Свой store под отдельным namespace, чтобы
        // не конфликтовать с подсветкой движка. Строим до движка — его
        // ClickController берёт у сшивателя resolveWord (клик по фрагменту → целое слово).
        const stitcher = this.#buildStitcher();

        // Движок стартует до загрузки PDF: страницы добавятся лениво, а
        // MutationPipeline (observe document.body) подхватит их текст по мере появления.
        this.#manager.run({background: true, resolveWord: stitcher ? stitcher.wordAt : undefined});

        this.#viewer = new PdfViewer(pages, stitcher ? {
            onTextLayer: stitcher.add,
            onReset: stitcher.reset,
        } : {});
        this.#toolbar = new Toolbar(toolbar, {
            onOpenFile: (file) => this.#openFile(file),
            onZoom: (factor) => this.#viewer.zoomBy(factor),
        });

        this.#enableDrop();

        const source = PdfSource.fromQuery();
        if (source) {
            this.#load(source, this.#fileName(source));
        } else {
            this.#toolbar.setTitle("Откройте PDF");
        }
    };

    #buildStitcher = (): WordStitcher | null => {
        const service = Context.getWordbookService();
        if (!service || !HighlightStore.supported()) {
            return null;
        }
        const matcher = new WordMatcher(service.getWordbookCache());
        const store = new HighlightStore({background: true, namespace: "reckue-stitch-"});
        store.init(document);
        const stitcher = new WordStitcher(matcher, store);

        // Кэш словаря — живая Map (мутируется на service.set), поэтому после
        // сохранения слова в reader достаточно пересобрать сшивку. Сигнал —
        // запись словаря в storage (ключи wordbook*).
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === "local" && Object.keys(changes).some((k) => k.startsWith("wordbook"))) {
                stitcher.refresh();
            }
        });

        return stitcher;
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
