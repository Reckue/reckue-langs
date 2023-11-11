import {LevelDisplay} from "./blocks/LevelDisplay";
import {Context} from "../../../core/Context";
import {HTMLMapper} from "../../../core/HTMLMapper";
import {WordDisplay} from "./blocks/WordDisplay";

export class Menu {

    #ref;
    #HTMLMapper;

    #wordContainer;
    #levelContainer;

    #left = "0";
    #top = "0";
    
    constructor() {
        this.#HTMLMapper = new HTMLMapper();
        Context.add("POPUP_WIDTH", 120);
        Context.add("TRANSLATE_URL", "https://translate.google.com/#view=home&op=translate");
        this.#createPopup();
    }

    setContent = (word, netGraph) => {
        this.#levelContainer.setWord(word);
        //this.#levelContainer.updateLevel();

        this.#wordContainer.updateLink(word, netGraph);

        this.#setWordPosition();
    }

    setPosition = (left, top) => {
        const offset = Context.get("POPUP_WIDTH") / 2;
        this.#left = `${left - offset}px`;
        this.#top = `${top}px`;
        this.#updatePosition();
    }

    /*
    *  Показывать попап
    */
    displayOn = () => {
        this.#ref.style.visibility = "visible";
    }

    /*
    *  Скрывать попап
    */
    displayOff = () => {
        this.#ref.style.visibility = "hidden";
    }
    
    /*
    *  Добавление попапа в body
    */
    #appendPopup = () => {
        const body = window.document.querySelector('body');
        body.appendChild(this.#ref);
    }

    /*
    * Добавляем препроцессор popup'а в обертку HTMLMapper
    * По дефолту попап скрыт, но на него вешаем addEventListner'ы с открытием\закрытием попапа
    * Создаем контейнеры для слов и для уровня
    */
    #createPopup = () => {
        const html = require("apply-loader!pug-loader!./blocks/templates/popup.pug");
        this.#ref = this.#HTMLMapper.toElement(html);

        this.displayOff();
        this.#onMouseOver();

        this.#wordContainer = new WordDisplay(this.#ref);
        this.#levelContainer = new LevelDisplay(this.#ref);
        this.#appendPopup();
    }

    #updatePosition = () => {
        this.#ref.style.left = this.#left;
        this.#ref.style.top = this.#top;
    }

    #onMouseOver() {
        this.#ref.addEventListener("mouseover", () => this.displayOn());
        this.#ref.addEventListener("mouseout", () => this.displayOff());
    }

    /*
    * Определяем положение слова, используя ширину wordContaner'a и ширину попапа
    */
    #setWordPosition = () => {
        const offset = this.#getOffset(this.#wordContainer.getRef().offsetWidth);
        const position = this.#getOffset(Context.get("POPUP_WIDTH")) - offset;
        this.#wordContainer.getRef().style.left = `${position}px`;
    }

    #getOffset = (width) => width / 2;
}