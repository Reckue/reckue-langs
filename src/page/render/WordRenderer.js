import {Context} from "../../core/Context";
import {Levels} from "../../core/enum/Levels";

export class WordRenderer {

    onHover(ref, word) {
        const popup = Context.get("menu");
        ref.addEventListener("click", (event) => this.#showPopup(event, popup, word));
        ref.addEventListener("mouseout", popup.displayOff);
    }

    #showPopup = (event, popup, word) => {
        popup.displayOn();
        popup.setPosition(event.clientX, event.clientY);
        popup.setContent(word);
    }

    onHoverAll = (clear) => {
        const refs = Context.get("refs");
        const words = refs.get(clear);
        words.forEach((word) => {
            this.onHover(word, clear);
        });
    }

    renderAll = (clear, level) => {
        const refs = Context.get("refs");
        const words = refs.get(clear);
        words.forEach((word) => {
            this.resolveColor(word, level)
        });
    }

    createRef = (word) => {
        const ref = document.createElement('a');
        word = word.replace(/\r?\n/g, "");
        ref.innerText = word;
        ref.style.cursor = "pointer";
        return ref;
    }

    resolveColor = (ref, level) => {
        switch (level) {
            case Levels.NATIVE.name:
                ref.style.color = Levels.NATIVE.hex;
                break;
            case Levels.ADVANCED.name:
                ref.style.color = Levels.ADVANCED.hex;
                break;
            case Levels.INTERMEDIATE.name:
                ref.style.color = Levels.INTERMEDIATE.hex;
                break;
            case Levels.ELEMENTARY.name:
                ref.style.color = Levels.ELEMENTARY.hex;
                break;
            case Levels.BEGINNER.name:
                ref.style.color = Levels.BEGINNER.hex;
                break;
        }
    }
}