import {WordbookService} from "./WordbookService.js";

export class App {

    #wordbookService = new WordbookService();
    #logicService;

    constructor(logicService) {
        this.#logicService = logicService;
    }

    start = () => {
        this.#wordbookService.executeAfter(this.#runService);
        this.#wordbookService.loadWordbooks();
    }

    #runService = () => {
        this.#logicService.setWordbook(this.#wordbookService);
        this.#logicService.run();
    }
}