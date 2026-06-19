import {Context} from "../../core/Context";
import {Levels} from "../../core/enum/Levels";

export class WordRenderer {

    onHover(ref: HTMLElement, word: string) {
        const popup = Context.get("menu");
        ref.addEventListener("click", (event) => this.#showPopup(event, popup, word));
        ref.addEventListener("mouseout", popup.displayOff);
    }

    #showPopup = (event: MouseEvent, popup: any, word: string) => {
        popup.displayOn();
        popup.setPosition(event.clientX, event.clientY);
        popup.setContent(word);
    }

    onHoverAll = (clear: string) => {
        const refs = Context.get("refs");
        const words = refs.get(clear);
        words.forEach((word: HTMLElement) => {
            this.onHover(word, clear);
        });
    }

    renderAll = (clear: string, level: string) => {
        const refs = Context.get("refs");
        const words = refs.get(clear);
        words.forEach((word: HTMLElement) => {
            this.resolveColor(word, level)
        });
    }

    createRef = (word: string) => {
        const ref = document.createElement('a');
        word = word.replace(/\r?\n/g, "");
        ref.innerText = word;
        ref.style.cursor = "pointer";
        return ref;
    }

    resolveColor = (ref: HTMLElement, level: string) => {
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
