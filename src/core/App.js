import {WordbookService} from "./words/WordbookService.js";
import {Context} from "./Context";

export class App {

    #context;
    #wordbookService;
    #logicService;

    constructor(logicService) {
        this.#context = new Context();
        this.#logicService = logicService;
        this.#wordbookService = new WordbookService();
    }

    start = () => {
        this.#wordbookService.executeAfter(this.#runService);
        this.#wordbookService.loadWordbooks();
    }

    #runService = () => {
        Context.add("wordbook", this.#wordbookService);
        this.#logicService.run();
    }
}