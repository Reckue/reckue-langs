import {Logger} from "../../core/Logger";
import {WordPopup} from "./menu/WordPopup";
import {InteractiveWord} from "./InteractiveWord";
import {Context} from "../../core/Context";

export class DOMBuilder {

    #logger = new Logger();
    #wordsList;

    constructor(wordsList) {
        this.#wordsList = wordsList;
        Context.add("popup", new WordPopup());
        Context.add("notSavedWords", new Set());
        Context.add("refs", new Map());
    }

    rebuildPage = () => {
        this.#logAspect(() => this.#wordsList.forEach((bundle) => this.#appendText(bundle.ref, bundle.words)));
    }

    #logAspect = (logic) => {
        this.#logger.log("Rebuilding page...");
        logic();
        this.#logger.log("Rebuilding page complete!");
        this.#logger.log(`Found not saved words - ${Context.get("notSavedWords").size}`);
    }

    #appendText = (textRef, list) => {
        const text = textRef.parentNode;
        list.forEach((word) => {
            const wordRef = this.#createRef(word);
            this.#saveRef(word.getClear(), wordRef);
            this.#doAppend(text, wordRef, textRef);
        });
        textRef.textContent = "";
    }

    #saveRef = (clear, wordRef) => {
        const map = Context.get("refs");
        let refs = map.get(clear);
        !refs && (refs = []);
        refs.push(wordRef);
        map.set(clear, refs);
    }

    #createRef = (word) => {
        if (word.get() !== "") {
            const interactiveWord = new InteractiveWord(word);
            return interactiveWord.create();
        }
        return this.#createTextNode(" ");
    }

    #doAppend = (where, updated, previous) => {
        previous.after(updated, previous);
    }

    #createTextNode = (word) => {
        return document.createTextNode(word);
    }
}