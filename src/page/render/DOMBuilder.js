import {Logger} from "../../core/Logger";
import {Menu} from "./menu/Menu";
import {PageWord} from "./PageWord";
import {Context} from "../../core/Context";

export class DOMBuilder {

    #isActive = false;
    #logger = new Logger();
    #wordsList;

    constructor(wordsList) {
        this.#wordsList = wordsList;
        Context.add("menu", new Menu());
        Context.add("notSavedWords", new Set());
        Context.add("refs", new Map());
    }

    rebuildPage = () => {
        this.#isActive = true;
        this.#logAspect(() => this.#wordsList.forEach((bundle) => this.#appendText(bundle.ref, bundle.words)));
        this.#isActive = false;
    }

    updateWords = (wordsList) => {
        this.#wordsList = wordsList;
    }

    isActive = () => {
        return this.#isActive;
    }

    #logAspect = (logic) => {
        this.#logger.log("Rebuilding page...");
        logic();
        this.#logger.log("Rebuilding page complete!");
        this.#logger.log(`Found not saved words - ${Context.get("notSavedWords").size}`);
    }

    #appendText = (textRef, list) => {
        list.forEach((word) => {
            const wordRef = this.#createRef(word);
            if (wordRef.textContent !== "") {
                this.#saveRef(word.getClear(), wordRef);
                this.#doAppend(wordRef, textRef);
            }
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
            const pageWord = new PageWord(word);
            return pageWord.create();
        }
        return this.#createTextNode(" ");
    }

    #doAppend = (updated, previous) => {
        previous.after(updated, previous);
    }

    #createTextNode = (word) => {
        return document.createTextNode(word);
    }
}