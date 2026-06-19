import {WordbookService} from "./words/WordbookService";
import {Context} from "./Context";

interface LogicService {
    run: () => void;
}

export class App {

    #context: Context;
    #wordbookService: WordbookService;
    #logicService: LogicService;

    constructor(logicService: LogicService) {
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
