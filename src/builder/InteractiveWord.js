import {colorResolver} from "../utils/Resolver";

export const BASE_GOOGLE_TRANSLATE_URL = "https://translate.google.com/#view=home&op=translate";

export class InteractiveWord {

    #wordbook;
    #popup;
    #language;

    constructor(language, popup, wordbook) {
        this.#language = language;
        this.#popup = popup;
        this.#wordbook = wordbook.get();
    }

    createInteractiveWord = (bundle, clear) => {
        // window.console.log(`Reckue language app: Creating link to word ${bundle.clearWord}.`);
        const level = this.#wordbook.get(clear);
        const ref = document.createElement('a');
        colorResolver(ref, level);
        ref.innerText = bundle.word;
        ref.style.cursor = "pointer";
        //a.href = this.#buildHref(bundle.clearWord);
        this.#onHover(ref, bundle.clearWord, level);
        return ref;
    };

    isSaved = (clear) => this.#wordbook.get(clear) !== undefined;

    #buildHref = (word) => `${BASE_GOOGLE_TRANSLATE_URL}&sl=${this.#language.sl}&tl=${this.#language.tl}&text=${word}`;

    #showPopup = (ref, event, word, level) => {
        this.#popup.displayOn();
        this.#popup.setPosition(event.clientX, event.clientY);
        this.#popup.setContent(word, level);
        this.#popup.setRealWordRef(ref);
    }

    #onHover(ref, word, level) {
        ref.addEventListener("click", (event) => this.#showPopup(ref, event, word, level));
        ref.addEventListener("mouseout", () => this.#popup.displayOff());
    }
}