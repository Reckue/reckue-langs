import {markUi} from "../../page/ui/Ui";

interface ToolbarHandlers {
    onOpenFile: (file: File) => void;
    onZoom: (factor: number) => void;
}

/**
 * Тонкая панель вьювера: открыть файл, зум, заголовок, счётчик страниц.
 * Помечена reckue-ui — сканер слов её не трогает, MutationPipeline игнорирует.
 */
export class Toolbar {

    readonly #handlers: ToolbarHandlers;
    #title!: HTMLElement;
    #pages!: HTMLElement;
    #input!: HTMLInputElement;

    constructor(container: HTMLElement, handlers: ToolbarHandlers) {
        this.#handlers = handlers;
        this.#build(container);
    }

    setTitle = (name: string) => {
        this.#title.textContent = name;
    };

    setPages = (count: number) => {
        this.#pages.textContent = count ? `${count} стр.` : "";
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
        const zoomOut = this.#button("−", () => this.#handlers.onZoom(1 / 1.2));
        const zoomIn = this.#button("+", () => this.#handlers.onZoom(1.2));

        this.#title = document.createElement("span");
        this.#title.className = "title";
        this.#pages = document.createElement("span");
        this.#pages.className = "pages";

        container.append(open, this.#title, this.#pages, zoomOut, zoomIn, this.#input);
    };

    #button = (label: string, onClick: () => void): HTMLButtonElement => {
        const button = document.createElement("button");
        button.textContent = label;
        button.addEventListener("click", onClick);
        return button;
    };
}
