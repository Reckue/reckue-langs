import {PageManager} from "../page/PageManager";
import {Context} from "../core/Context";
import {WordMatcher} from "../page/word/WordMatcher";
import {HighlightStore} from "../page/highlight/HighlightStore";
import {PdfViewer} from "./pdf/PdfViewer";
import {WordStitcher} from "./pdf/WordStitcher";
import {Bookmark} from "./bookmark/Bookmark";
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
    readonly #bookmark = new Bookmark((page) => this.#viewer.scrollToPage(page));
    #viewer!: PdfViewer;
    #toolbar!: Toolbar;
    #current = 1;

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

        // Текстовый слой страницы готов → сшивка слов + восстановление маркера закладки.
        const onTextLayer = (el: HTMLElement) => {
            stitcher && stitcher.add(el);
            this.#bookmark.onTextLayer(el);
        };
        this.#viewer = new PdfViewer(pages, {
            onTextLayer,
            onReset: stitcher ? stitcher.reset : undefined,
            onPageChange: (page) => {
                this.#current = page;
                this.#toolbar.setCurrent(page);
            },
        });
        this.#toolbar = new Toolbar(toolbar, {
            onOpenFile: (file) => this.#openFile(file),
            onZoom: (factor) => this.#viewer.zoomBy(factor),
            onPrev: () => this.#viewer.scrollToPage(this.#current - 1),
            onNext: () => this.#viewer.scrollToPage(this.#current + 1),
            onGoto: (page) => this.#viewer.scrollToPage(page),
            onBookmark: () => this.#bookmark.jump(),
        });

        this.#enableDrop();
        this.#enableBookmarkGesture();
        this.#enableKeys();

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
        // запись словаря в storage (ключи wordbook*). Откладываем в idle и
        // коалесим: запись словаря идёт несколькими ключами (кусками) → одно
        // изменение может прийти пачкой; держать перекраску на синхронном пути
        // не нужно — иначе лагает попап смены уровня.
        const refresh = this.#coalesce(stitcher.refresh);
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === "local" && Object.keys(changes).some((k) => k.startsWith("wordbook"))) {
                refresh();
            }
        });

        return stitcher;
    };

    // Схлопнуть серию вызовов в один запуск в простое (rIC, запасной rAF).
    #coalesce = (fn: () => void): (() => void) => {
        let scheduled = false;
        const run = () => {
            scheduled = false;
            fn();
        };
        return () => {
            if (scheduled) {
                return;
            }
            scheduled = true;
            const ric = (window as any).requestIdleCallback;
            ric ? ric(run, {timeout: 300}) : requestAnimationFrame(run);
        };
    };

    #openFile = async (file: File) => {
        this.#load(await PdfSource.fromFile(file), file.name);
    };

    #load = async (source: PdfSourceDescriptor, name: string) => {
        this.#toolbar.setTitle(name);
        try {
            const count = await this.#viewer.open(source);
            this.#toolbar.setPages(count);
            // Закладка-прогресс: при наличии сразу прыгаем к сохранённой позиции.
            const page = await this.#bookmark.load(source.id, name);
            this.#toolbar.setHasBookmark(this.#bookmark.has());
            if (page) {
                this.#viewer.scrollToPage(page);
            }
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

    // Alt+Click ставит/переносит закладку-прогресс. Перехватываем на фазе capture
    // и гасим распространение — ClickController (bubble) этот клик не увидит, поэтому
    // жест не конфликтует с сохранением слова (Ctrl+Click / обычный клик в fastMode).
    #enableBookmarkGesture = () => {
        document.addEventListener("click", (e: MouseEvent) => {
            if (!e.altKey) {
                return;
            }
            if (this.#bookmark.place(e.clientX, e.clientY)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                this.#toolbar.setHasBookmark(true);
            }
        }, true);
    };

    #enableKeys = () => {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
                return;
            }
            const pages = document.getElementById("pages");
            if (!pages) {
                return;
            }
            switch (e.key) {
                case "PageDown":
                    pages.scrollBy({top: pages.clientHeight * 0.9});
                    e.preventDefault();
                    break;
                case "PageUp":
                    pages.scrollBy({top: -pages.clientHeight * 0.9});
                    e.preventDefault();
                    break;
                case "Home":
                    pages.scrollTo({top: 0});
                    e.preventDefault();
                    break;
                case "End":
                    pages.scrollTo({top: pages.scrollHeight});
                    e.preventDefault();
                    break;
                case "b":
                case "B":
                case "и":
                case "И":
                    this.#bookmark.jump();
                    break;
            }
        });
    };
}
