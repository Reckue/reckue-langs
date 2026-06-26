import {WordbookService} from "./words/WordbookService";
import {Wordbooks} from "./words/Wordbooks";
import {Context} from "./Context";

interface LogicService {
    run: () => void;
}

export class App {

    #context: Context;
    #wordbookService!: WordbookService;
    #logicService: LogicService;

    constructor(logicService: LogicService) {
        this.#context = new Context();
        this.#logicService = logicService;
    }

    start = () => {
        // Грузим активный словарь: на странице/в reader подсвечиваются и
        // сохраняются слова именно того словаря, что выбран в попапе.
        Wordbooks.getActiveId().then((id) => {
            this.#wordbookService = new WordbookService(id);
            this.#wordbookService.executeAfter(this.#runService);
            this.#wordbookService.loadWordbooks();
        });
    }

    #runService = () => {
        Context.add("wordbook", this.#wordbookService);
        this.#logicService.run();
    }
}
