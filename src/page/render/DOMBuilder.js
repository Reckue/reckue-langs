import {Logger} from "../../core/Logger";
import {Menu} from "./menu/Menu";
import {PageWord} from "./PageWord";
import {Context} from "../../core/Context";

export class DOMBuilder {

    #logger = new Logger();

    constructor() {
        Context.add("menu", new Menu());
        Context.add("notSavedWords", new Set());
        Context.add("refs", new Map());
    }

    rebuildPage = () => {
        this.#logAspect((bundle) => this.#appendText(bundle.ref, bundle.words));
    }

    #logAspect = (logic) => {
        this.#logger.log("Rebuilding page...");
        const queue = Context.get("render-queue");
        queue.takeTurns(logic);
        this.#logger.log("Rebuilding page complete!");
        this.#logger.log(`Found not saved words - ${Context.get("notSavedWords").size}`);
    }

    #appendText = (textRef, list) => {
        // Проверяем, что элемент не находится внутри popup меню
        if (textRef.parentNode.nodeName !== "A" && !this.#isInsidePopup(textRef)) {
            list.forEach((word) => {
                const wordRef = this.#createRef(word);
                if (wordRef.textContent !== "") {
                    this.#saveRef(word.getClear(), wordRef);
                    this.#doAppend(wordRef, textRef);
                }
            });
            textRef.textContent = "";
        }
    }

    #isInsidePopup = (element) => {
        let current = element;
        while (current && current !== document.body) {
            // Проверяем, есть ли у элемента или его родителей атрибут data-popup
            if (current.getAttribute && current.getAttribute('data-popup') === 'true') {
                return true;
            }
            current = current.parentNode;
        }
        return false;
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