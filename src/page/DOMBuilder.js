import {Logger} from "../Logger";
import {WordPopup} from "../menu/WordPopup";
import {InteractiveWord} from "./InteractiveWord";
import {Context} from "../core/Context";

export class DOMBuilder {

    #logger = new Logger();
    #wordbook;
    #nodes;
    #language;
    #popup;

    constructor(language) {
        this.#language = language;
        this.#wordbook = Context.getWordbook();
        this.#popup = new WordPopup();
        Context.add("notSavedWords", new Set());
    }

    rebuildPage = (nodes) => {
        this.#nodes = nodes;
        this.#logAspect(this.#mainLogic);
        // saveFile(mapToString(this.#notSavedWords));
    }

    #mainLogic = () => {
        this.#nodes.forEach((editable) => {
            const bundleList = editable.bundleWordsAndClearWordsList;
            const node = editable.node;
            this.#appendText(node, bundleList);
        });
    }

    #logAspect = (logic) => {
        this.#logger.log("Rebuilding page...");
        logic();
        this.#logger.log("Rebuilding page complete!");
        this.#logger.log(`Found not saved words - ${Context.get("notSavedWords").size}`);
    }

    #appendText = (previous, bundleList) => {
        const text = previous.parentNode;

        bundleList.forEach((bundle) => {
            const word = this.#createWord(text, bundle);
            this.#doAppend(text, word, previous);
        });

        previous.textContent = "";
    }

    #createWord = (text, bundle) => {
        const word = bundle.word;
        const clear = bundle.clearWord;
        if (word === "") {
            return this.#createTextNode(" ");
        }
        return this.#createInteractiveNode(bundle, clear);
    }

    #createInteractiveNode = (bundle, clear) => {
        const interactiveWord = new InteractiveWord(this.#language, this.#popup);
        if (interactiveWord.isSaved(clear)) {
            return interactiveWord.createInteractiveWord(bundle, clear);
        } else {
            return interactiveWord.createNotSavedWord(bundle, clear);
        }
    }

    #doAppend = (where, updated, previous) => {
        previous.after(updated, previous);
    }

    #createTextNode = (word) => {
        return document.createTextNode(word);
    }
}