import {LevelDisplay, POPUP_WIDTH} from "./level/LevelDisplay";
import {BaseBlock} from "./BaseBlock";
import {Context} from "../../../core/Context";
import {HTMLMapper} from "../../../core/HTMLMapper";

export class WordPopup {

    #ref;
    #HTMLMapper;

    #link;
    #wordContainer;
    #levelContainer;

    #left = "0";
    #top = "0";
    
    constructor() {
        this.#HTMLMapper = new HTMLMapper();
        this.#createPopup();
        this.#createWordContainer();
        this.#createLevelContainer();
        this.#appendPopup();
    }

    setContent = (word, level, href) => {
        this.#levelContainer.setWord(word);
        this.#levelContainer.updateLevel();

        this.#link.href = href;
        this.#link.textContent = word;
        this.#link.target = "_blank";

        this.#setWordPosition();
    }

    setPosition = (left, top) => {
        const offset = POPUP_WIDTH / 2;
        this.#left = `${left - offset}px`;
        this.#top = `${top}px`;
        this.#updatePosition();
    }

    displayOn = () => {
        this.#ref.style.display = "block";
    }

    displayOff = () => {
        this.#ref.style.display = "none";
    }

    #appendPopup = () => {
        const body = window.document.querySelector('body');
        body.appendChild(this.#ref);
    }

    #createPopup = () => {
        const html = require("apply-loader!pug-loader!./popup.pug");
        this.#ref = this.#HTMLMapper.toElement(html);

        this.displayOff();
        this.#onMouseOver();
        this.#updatePosition();
    }

    #createWordContainer = () => {
        this.#wordContainer = new BaseBlock(this.#ref);
        this.#setBaseStyles(this.#wordContainer);
        this.#setRelativeBaseStyles(this.#wordContainer, "absolute", "10px","1000", "14px");

        this.#wordContainer.setStyle("height", "30px");
        this.#wordContainer.setStyle("minWidth", "60px");
        this.#link = window.document.createElement("a");
        this.#wordContainer.getRef().appendChild(this.#link);
    }

    #createLevelContainer = () => {
        this.#levelContainer = new LevelDisplay(this.#ref);
        this.#setBaseStyles(this.#levelContainer);
        this.#setRelativeBaseStyles(this.#levelContainer,
            "relative", "18px","1001", "10px");
    }

    #setBaseStyles = (ref) => {
        ref.setStyle("background", "white");
        ref.setStyle("border", "1px #1e81c6 solid");
    }

    #setRelativeBaseStyles = (ref, position, fontSize, zIndex, borderRadius) => {
        ref.setStyle("position", position);
        ref.setStyle("fontSize", fontSize);
        ref.setStyle("zIndex", zIndex);
        ref.setStyle("borderRadius", borderRadius);
    }

    #updatePosition = () => {
        this.#ref.style.left = this.#left;
        this.#ref.style.top = this.#top;
    }

    #onMouseOver() {
        this.#ref.addEventListener("mouseover", () => this.displayOn());
        this.#ref.addEventListener("mouseout", () => this.displayOff());
    }

    #setWordPosition = () => {
        const offset = this.#getOffset(this.#wordContainer.getRef().offsetWidth);
        const position = this.#getOffset(POPUP_WIDTH) - offset;
        this.#wordContainer.getRef().style.left = `${position}px`;
    }

    #getOffset = (width) => width / 2;
}