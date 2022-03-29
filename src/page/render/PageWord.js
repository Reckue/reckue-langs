import {Context} from "../../core/Context";
import {Levels} from "../../enum/Levels";
import {WordRenderer} from "./WordRenderer";

export class PageWord {

    #wordbookService;
    #word;
    #renderer;

    constructor(word) {
        this.#word = word;
        this.#renderer = new WordRenderer();
        this.#wordbookService = Context.getWordbookService();
    }

    create = () => {
        if (this.#word.get() === "") return this.#blank();
        const ref = this.#renderer.createRef(this.#word.get());
        const level = this.#wordbookService.getWordbook().get(this.#word.getClear());
        if (this.#isSaved(level)) return this.#saved(ref, level);
        return this.#notSaved(ref);
    }

    #blank = () => {
        return document.createTextNode(this.#word.get());
    }

    #saved = (ref, level) => {
        this.#renderer.onHover(ref, this.#word.getClear());
        this.#renderer.resolveColor(ref, level)
        return ref;
    }

    #notSaved = (ref) => {
        this.#pullInContext();
        ref.addEventListener("click", this.#saveWord, {once: true});
        return ref;
    }

    #saveWord = () => {
        const level = Levels.BEGINNER.name;
        const word = this.#word.getClear();
        this.#wordbookService.set([{word, level}]);
        this.#renderer.renderAll(word, level);
        this.#renderer.onHoverAll(this.#word.getClear());
    }

    #pullInContext = () => (this.#word.getClear() !== " ") && Context.get("notSavedWords").add(this.#word.getClear());

    #isSaved = (level) => level !== undefined;
}