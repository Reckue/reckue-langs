import {LevelContainer, WORD_POPUP_WIDTH} from "./LevelContainer";
import {Container} from "./Container";
import {Context} from "../../core/Context";

export class WordPopup {

    #ref;

    #link;
    #wordContainer;
    #levelContainer;

    #wordbook;

    #left = "0";
    #top = "0";
    
    constructor() {
        this.#wordbook = Context.getWordbook();
        this.#createPopup();
        this.#createWordContainer();
        this.#createLevelContainer();
        this.#appendPopup();
    }

    setContent = (word, level, href) => {

        this.#levelContainer.setWord(word);
        this.#levelContainer.setLevel();

        this.#link.href = href;
        this.#link.textContent = word;
        this.#link.target = "_blank";

        this.#setWordPosition();
    }

    setPosition = (left, top) => {
        const offset = WORD_POPUP_WIDTH / 2;
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

    setRealWordRef = (ref) => {
        this.#levelContainer.setRealWordRef(ref);
    }

    #appendPopup = () => {
        const body = window.document.querySelector('body');
        body.appendChild(this.#ref);
    }

    #createPopup = () => {
        this.#ref = window.document.createElement("div");

        this.#ref.style.position = "fixed";
        this.#ref.style.userSelect = "none";
        this.#ref.style.color = "#1e81c6";
        this.#ref.style.zIndex = "1000";

        this.displayOff();
        this.#onMouseOver();
        this.#updatePosition();
    }

    #createWordContainer = () => {
        this.#wordContainer = new Container(this.#ref);
        this.#setBaseStyles(this.#wordContainer);
        this.#setRelativeBaseStyles(this.#wordContainer,
            "absolute", "10px","1000", "14px");

        this.#wordContainer.setStyle("height", "30px");
        this.#wordContainer.setStyle("minWidth", "60px");
        this.#link = window.document.createElement("a");
        this.#wordContainer.getRef().appendChild(this.#link);
    }

    #createLevelContainer = () => {
        this.#levelContainer = new LevelContainer(this.#ref);
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
        const position = this.#getOffset(WORD_POPUP_WIDTH) - offset;
        this.#wordContainer.getRef().style.left = `${position}px`;
    }

    #getOffset = (width) => width / 2;
}