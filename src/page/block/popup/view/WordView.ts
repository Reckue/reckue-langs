import {AbstractContainerView} from "./AbstractContainerView";
import {Context} from "../../../../core/Context";

export class WordView extends AbstractContainerView {

    #parent: HTMLElement;

    constructor(parent: HTMLElement) {
        super(parent);
        this.#parent = parent;
        this.#parent.prepend(this.getRef());
    }
    /**
     * Берем собранный Href > делаем ссылку со словом
     * > оборачиваем через HTMLMapper в див
     * Заменяем old контейнер на новый ref
     */
    updateLink = (word: string, netGraph: any) => {
        //const href = this.#buildHref(word);
        const html = this.#renderDisplay(word, netGraph);
        const ref = this.getHTMLMapper().toElement(html);
        const old = this.getRef();
        this.setRef(ref);
        this.#parent.replaceChild(this.getRef(), old);
    }

    /**
     * Debug-дисплей слова: ссылка-перевод + метрики netGraph.
     * Раньше собирался pug-шаблоном word-display.pug.
     */
    #renderDisplay = (word: string, netGraph: any) => {
        const row = (label: string, value: any) => `<div><span>${label}:</span><span>${value ?? ""}</span></div>`;
        return `<div class="display-word-menu">`
            + `<a class="translate-link" target="_blank">${word}</a>`
            + row("cursor-x", netGraph?.cursor?.x)
            + row("cursor-y", netGraph?.cursor?.y)
            + row("block-width", netGraph?.block?.width)
            + row("block-height", netGraph?.block?.height)
            + row("text-length", netGraph?.textLength)
            + row("text-blocks-count", netGraph?.textBlocksCount)
            + row("text-block-index", netGraph?.currentLine)
            + row("text-block-size-width", netGraph?.currentTextBlockSize?.width)
            + row("text-block-size-height", netGraph?.currentTextBlockSize?.height)
            + row("real-height", netGraph?.realHeight)
            + row("coefficient", netGraph?.coefficient)
            + `</div>`;
    }

    /*
    *Делаем ссылку на слово в гугл-переводчик
    */
    #buildHref = (word: string) => {
        const language = Context.get("language");
        const url = `${Context.get("TRANSLATE_URL")}&sl=${language.sl}&tl=${language.tl}&text=${word}`;
        this.#printPageContent(url);
        return url;
    }

    /*
    * window.open(url, name, params) - метод возвращает ссылку на объект window нового окна.
    * Name - имя, params - настройки окна (не обязательные)
    */
    #printPageContent = (url: string) => {
        window.console.log(chrome.tabs);
        const opened = window.open(url, "_blank");
        opened!.close();
    }
}
