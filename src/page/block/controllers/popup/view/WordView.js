import {AbstractContainerView} from "./AbstractContainerView";
import {Context} from "../../../../../core/Context";

export class WordView extends AbstractContainerView {

    #templateFunction;
    #parent;

    constructor(parent) {
        super(parent);
        this.#templateFunction = require("pug-loader!../templates/word-display.pug");
        this.#parent = parent;
        this.#parent.prepend(this.getRef());
    }
    /**
     * Берем собранный Href > делаем через pug ссылку со словом
     * > оборачиваем через HTMLMapper в див
     * Заменяем old контейнер на новый ref
     */
    updateLink = (word, netGraph) => {
        //const href = this.#buildHref(word);
        const html = this.#templateFunction({word, netGraph});
        const ref = this.getHTMLMapper().toElement(html);
        const old = this.getRef();
        this.setRef(ref);
        this.#parent.replaceChild(this.getRef(), old);
    }

    /*
    *Делаем ссылку на слово в гугл-переводчик
    */
    #buildHref = (word) => {
        const language = Context.get("language");
        const url = `${Context.get("TRANSLATE_URL")}&sl=${language.sl}&tl=${language.tl}&text=${word}`;
        this.#printPageContent(url);
        return url;
    }

    /*
    * window.open(url, name, params) - метод возвращает ссылку на объект window нового окна.
    * Name - имя, params - настройки окна (не обязательные)
    */
    #printPageContent = (url) => {
        window.console.log(chrome.tabs);
        const opened = window.open(url, "_blank");
        opened.close();
    }
}