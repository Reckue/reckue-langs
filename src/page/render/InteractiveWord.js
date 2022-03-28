import {colorResolver} from "../../utils/Resolver";
import {Context} from "../../core/Context";
import {Levels} from "../../enum/Levels";

export const BASE_GOOGLE_TRANSLATE_URL = "https://translate.google.com/#view=home&op=translate";

export class InteractiveWord {

    #wordbookService;
    #popup;
    #word;

    constructor(word) {
        this.#word = word;
        this.#popup = Context.get("popup");
        this.#wordbookService = Context.getWordbookService();
        Context.add("render", this.#render);
    }

    create = () => {
        if (this.#isSaved(this.#word.getClear())) {
            return this.#createSaved();
        } else {
            return this.#createNotSaved();
        }
    }

    #createSaved = () => {
        const level = this.#wordbookService.getWordbook().get(this.#word.getClear());
        const ref = this.#createRef(this.#word.get(), level);
        this.#onHover(ref, this.#word.getClear(), level);
        return ref;
    }

    #createNotSaved = () => {
        if (this.#word.getClear() !== " ") {
            Context.get("notSavedWords").add(this.#word.getClear());
        }
        const ref = this.#createRef(this.#word.get());
        ref.addEventListener("click", () => {
            const level = Levels.BEGINNER.name;
            this.#wordbookService.set([{word: this.#word.getClear(), level}]);
            this.#render(this.#word.getClear(), level);
            this.#onHover(ref, this.#word.getClear(), level);
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

    #createRef = (word, level) => {
        const ref = document.createElement('a');
        colorResolver(ref, level);
        word = word.replace(/\r?\n/g, "");
        if (word === "") {
            return document.createTextNode(word);
        }
        ref.innerText = word;
        ref.style.cursor = "pointer";
        return ref;
    }

    #isSaved = (clear) => this.#wordbookService.getWordbook().get(clear) !== undefined;

    #buildHref = (word) => {
        const language = Context.get("language");
        return `${BASE_GOOGLE_TRANSLATE_URL}&sl=${language.sl}&tl=${language.tl}&text=${word}`;
    }

    #showPopup = (ref, event, word, level) => {
        this.#popup.displayOn();
        this.#popup.setPosition(event.clientX, event.clientY);
        this.#popup.setContent(word, level, this.#buildHref(word));
    }

    #onHover(ref, word, level) {
        ref.addEventListener("click", (event) => this.#showPopup(ref, event, word, level));
        ref.addEventListener("mouseout", () => this.#popup.displayOff());
    }
}