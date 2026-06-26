import {markUi} from "../../page/ui/Ui";

interface ToolbarHandlers {
    onOpenFile: (file: File) => void;
    onZoom: (factor: number) => void;
    onPrev: () => void;
    onNext: () => void;
    onGoto: (page: number) => void;
    onBookmark: () => void;
}

/**
 * Панель вьювера: открыть файл, навигация (стр. N / всего, ‹ ›, переход по вводу),
 * прыжок к закладке, зум, заголовок. Помечена reckue-ui — сканер слов её не трогает.
 */
export class Toolbar {

    readonly #handlers: ToolbarHandlers;
    #title!: HTMLElement;
    #pageInput!: HTMLInputElement;
    #total!: HTMLElement;
    #bookmark!: HTMLButtonElement;
    #input!: HTMLInputElement;
    #count = 0;

    constructor(container: HTMLElement, handlers: ToolbarHandlers) {
        this.#handlers = handlers;
        this.#build(container);
    }

    setTitle = (name: string) => {
        this.#title.textContent = name;
    };

    setPages = (count: number) => {
        this.#count = count;
        this.#total.textContent = count ? `/ ${count}` : "";
        this.#pageInput.style.display = count ? "" : "none";
    };

    setCurrent = (page: number) => {
        if (document.activeElement !== this.#pageInput) {
            this.#pageInput.value = String(page);
        }
    };

    setHasBookmark = (has: boolean) => {
        this.#bookmark.disabled = !has;
        this.#bookmark.title = has ? "К закладке (B)" : "Закладка не поставлена — Alt+клик по тексту";
    };

    openDialog = () => {
        this.#input.click();
    };

    #build = (container: HTMLElement) => {
        markUi(container);

        this.#input = document.createElement("input");
        this.#input.type = "file";
        this.#input.accept = "application/pdf,.pdf";
        this.#input.style.display = "none";
        this.#input.addEventListener("change", () => {
            const file = this.#input.files && this.#input.files[0];
            if (file) {
                this.#handlers.onOpenFile(file);
            }
        });

        const open = this.#button("Открыть", () => this.openDialog());

        this.#title = document.createElement("span");
        this.#title.className = "title";

        const nav = document.createElement("span");
        nav.className = "nav";
        const prev = this.#button("‹", () => this.#handlers.onPrev());
        const next = this.#button("›", () => this.#handlers.onNext());
        this.#pageInput = document.createElement("input");
        this.#pageInput.className = "page-input";
        this.#pageInput.type = "number";
        this.#pageInput.min = "1";
        this.#pageInput.style.display = "none";
        this.#pageInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                this.#commitGoto();
            }
        });
        this.#pageInput.addEventListener("change", () => this.#commitGoto());
        this.#total = document.createElement("span");
        this.#total.className = "total";
        nav.append(prev, this.#pageInput, this.#total, next);

        this.#bookmark = this.#button("⌖ Закладка", () => this.#handlers.onBookmark());
        this.#bookmark.classList.add("bookmark");
        this.#bookmark.disabled = true;

        const zoomOut = this.#button("−", () => this.#handlers.onZoom(1 / 1.2));
        const zoomIn = this.#button("+", () => this.#handlers.onZoom(1.2));

        container.append(open, this.#title, nav, this.#bookmark, zoomOut, zoomIn, this.#input);
    };

    #commitGoto = () => {
        const page = Math.min(Math.max(1, Number(this.#pageInput.value) || 1), this.#count || 1);
        this.#pageInput.value = String(page);
        this.#handlers.onGoto(page);
    };

    #button = (label: string, onClick: () => void): HTMLButtonElement => {
        const button = document.createElement("button");
        button.textContent = label;
        button.addEventListener("click", onClick);
        return button;
    };
}
