import {Logger} from "../../core/Logger";
import {WordPopup} from "./menu/WordPopup";
import {InteractiveWord} from "./InteractiveWord";
import {Context} from "../../core/Context";

export class DOMBuilder {

    #logger = new Logger();
    #wordsList;
    #language;
    #popup;

    constructor(language) {
        this.#language = language;
        this.#popup = new WordPopup();
        Context.add("notSavedWords", new Set());
        Context.add("refs", new Map());
    }

    rebuildPage = (wordsList) => {
        this.#wordsList = wordsList;
        this.#logAspect(() => this.#wordsList.forEach((bundle) => this.#appendText(bundle.ref, bundle.words)));
    }

    #logAspect = (logic) => {
        this.#logger.log("Rebuilding page...");
        logic();
        this.#logger.log("Rebuilding page complete!");
        this.#logger.log(`Found not saved words - ${Context.get("notSavedWords").size}`);
    }

    #appendText = (ref, list) => {
        const text = ref.parentNode;
        list.forEach((word) => {
            const interactive = this.#createWord(word);
            this.#addRef(word.getClear(), interactive);
            this.#doAppend(text, interactive, ref);
        });
        ref.textContent = "";
    }

    #addRef = (clear, word) => {
        const refs = Context.get("refs");
        const words = refs.get(clear);
        if (words) {
            words.push(word);
            refs.set(clear, words);
        } else {
            refs.set(clear, [word]);
        }
    }

    #createWord = (word) => {
        if (word.get() === "") {
            return this.#createTextNode(" ");
        }
        return this.#createInteractiveNode(word.get(), word.getClear());
    }

    #createInteractiveNode = (original, clear) => {
        const interactiveWord = new InteractiveWord(this.#language, this.#popup);
        if (interactiveWord.isSaved(clear)) {
            return interactiveWord.createInteractiveWord(original, clear);
        } else {
            return interactiveWord.createNotSavedWord(original, clear);
        }
    }

    #doAppend = (where, updated, previous) => {
        previous.after(updated, previous);
    }

    #createTextNode = (word) => {
        return document.createTextNode(word);
    }
}