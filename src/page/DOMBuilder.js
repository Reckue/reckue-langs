import {Logger} from "../Logger";
import {WordPopup} from "../menu/WordPopup";
import {InteractiveWord} from "./InteractiveWord";

export class DOMBuilder {

    #logger = new Logger();
    #notSavedWords = new Set();
    #wordbook;
    #nodes;
    #language;
    #popup;

    constructor(language, wordbook) {
        this.#language = language;
        this.#popup = new WordPopup(wordbook);
        this.#wordbook = wordbook;
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
        this.#logger.log(`Found not saved words - ${this.#notSavedWords.size}`);
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
        const interactiveWord = new InteractiveWord(this.#language, this.#popup, this.#wordbook);
        if (interactiveWord.isSaved(clear)) {
            return interactiveWord.createInteractiveWord(bundle, clear);
        } else {
            return this.#createNotSavedWord(bundle, clear);
        }
    }

    #createNotSavedWord = (bundle, clear) => {
        if (clear !== " ") {
            this.#notSavedWords.add(clear);
        }
        return this.#createTextNode(bundle.word);
    }

    #doAppend = (where, updated, previous) => {
        previous.after(updated, previous);
    }

    #createTextNode = (word) => {
        return document.createTextNode(word);
    }
}