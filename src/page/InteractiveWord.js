import {colorResolver} from "../utils/Resolver";
import {Context} from "../core/Context";
import {Levels} from "../enum/Levels";

export const BASE_GOOGLE_TRANSLATE_URL = "https://translate.google.com/#view=home&op=translate";

export class InteractiveWord {

    #cache;
    #wordbook;
    #popup;
    #language;

    constructor(language, popup) {
        this.#language = language;
        this.#popup = popup;
        this.#cache = Context.getWordbook().get();
        this.#wordbook = Context.getWordbook();
        Context.add("render", this.#render);
    }

    createInteractiveWord = (bundle, clear) => {
        // window.console.log(`Reckue language app: Creating link to word ${bundle.clearWord}.`);
        const level = this.#cache.get(clear);
        const ref = this.#createLink(bundle, level);
        //a.href = this.#buildHref(bundle.clearWord);
        this.#onHover(ref, bundle.clearWord, level);
        return ref;
    };

    createNotSavedWord = (bundle, clear) => {
        if (clear !== " ") {
            Context.get("notSavedWords").add(clear);
        }
        const ref = this.#createLink(bundle);
        ref.addEventListener("click", () => {
            const level = Levels.BEGINNER.name;
            this.#wordbook.set([{word: clear, level}]);
            this.#render(clear, level);
            this.#onHover(ref, bundle.clearWord, level);
        });
        return ref;
    }

    #render = (clear, level) => {
        const refs = Context.get("refs");
        const words = refs.get(clear);
        words.forEach((word) => {
            colorResolver(word, level)
        });
    }

    #createLink = (bundle, level) => {
        const ref = document.createElement('a');
        colorResolver(ref, level);
        let word = bundle.word;
        word = word.replace(/\r?\n/g, "");
        if (word === "") {
            return document.createTextNode(word);
        }
        ref.innerText = word;
        ref.style.cursor = "pointer";
        return ref;
    }

    isSaved = (clear) => this.#cache.get(clear) !== undefined;

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