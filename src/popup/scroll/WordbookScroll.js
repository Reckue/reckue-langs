import {Context} from "../../core/Context";
import {WordsAppender} from "./WordsAppender";
import {ChangePageButtons} from "./ChangePageButtons";
import {Filter} from "./Filter";

export class WordbookScroll {

    #wordbookService;
    #wordsAppender;
    #pageButtons;
    #filter;

    constructor() {
        this.#wordbookService = Context.getWordbookService();
        this.#wordsAppender = new WordsAppender();
        this.#pageButtons = new ChangePageButtons(this.fillScroll);
        this.#filter = new Filter(this.#pageButtons.buildPageButtons, this.fillScroll);
        Context.add("filter", this.#filter);
    }

    fillScroll = (page) => {
        this.#pageButtons.buildPageButtons(page);
        const loaded = this.#loadWords(page);
        this.#fillWords(loaded);
    }

    #loadWords = (page) => {
        return this.#wordbookService.getFilteredWordbook(this.#filter.get()).getPage(page);
    }

    #fillWords = (loaded) => {
        this.#wordsAppender.clearScroll();
        loaded.forEach((level, word) => {
            const ref = this.#wordsAppender.addWord(word, level);
            this.#whenChangeOption(ref, word);
            this.#whenEditWord(ref, word);
        });
    }

    #whenEditWord = (ref, word) => {
        const input = ref.getElementsByTagName("input")[0];
        input.addEventListener("change", (event) => this.#changeWord(event, word));
    }

    #whenChangeOption = (ref, word) => {
        const select = ref.getElementsByClassName("level")[0];
        select.addEventListener("change", (event) => this.#changeLevel(event, word));
    }

    #changeWord = (event, word) => {
        const level = this.#wordbookService.getWordbookCache().get(word);
        const edited = event.target.value;
        this.#wordbookService.remove(word);
        this.#updateWord(edited, level);
        this.fillScroll(0);
    }

    #changeLevel = (event, word) => {
        const level = event.target.value;
        this.#updateWord(word, level);
    }

    #updateWord = (word, level) => {
        this.#wordbookService.set([{word, level}]);
    }
}