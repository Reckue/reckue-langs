const BASE_GOOGLE_TRANSLATE_URL = "https://translate.google.com/#view=home&op=translate";

class InteractiveWord {

    #popup;
    #language;

    constructor(language, popup) {
        this.#language = language;
        this.#popup = popup;
    }

    createLink = (bundle, level) => {
        // window.console.log(`Reckue language app: Creating link to word ${bundle.clearWord}.`);
        const a = document.createElement('a');
        this.#setupColor(a, level);
        a.innerText = bundle.word;
        a.href = this.#buildHref(bundle.clearWord);
        a.target = "_blank";
        this.#onHover(a);
        return a;
    };

    #buildHref = (word) => `${BASE_GOOGLE_TRANSLATE_URL}&sl=${this.#language.sl}&tl=${this.#language.tl}&text=${word}`;

    #setupColor = (tag, level) => {
        // window.console.log(level);
        switch (level) {
            case Levels.NATIVE.name:
                tag.style.color = Levels.NATIVE.hex;
                break;
            case Levels.ADVANCED.name:
                tag.style.color = Levels.ADVANCED.hex;
                break;
            case Levels.INTERMEDIATE.name:
                tag.style.color = Levels.INTERMEDIATE.hex;
                break;
            case Levels.ELEMENTARY.name:
                tag.style.color = Levels.ELEMENTARY.hex;
                break;
            case Levels.BEGINNER.name:
                tag.style.color = Levels.BEGINNER.hex;
                break;
            default:
                tag.style.color = "rgb(30,30,30)";
                break;
        }
    }

    #showPopup = (event) => {
        this.#popup.displayOn();
        this.#popup.setPosition(event.clientX, event.clientY);
    }

    #onHover(a) {
        a.addEventListener("mouseover", (event) => this.#showPopup(event));
        a.addEventListener("mouseout", () => this.#popup.displayOff());
    }
}