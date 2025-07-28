import {ApiWordbookService} from "./words/ApiWordbookService.js";
import {Context} from "./Context";

export class ApiApp {

    #context;
    #wordbookService;
    #logicService;

    constructor(logicService) {
        this.#context = new Context();
        this.#logicService = logicService;
        this.#wordbookService = new ApiWordbookService();
    }

    start = async () => { 
        // Инициализируем API сервис
        const isInitialized = await this.#wordbookService.initialize();
        
        if (isInitialized) {
            this.#wordbookService.executeAfter(this.#runService);
            await this.#wordbookService.loadWords();
        } else {
            // Если API недоступен, запускаем логику без инициализации
            this.#runService();
        }
    }

    #runService = () => {
        Context.add("wordbook", this.#wordbookService);
        this.#logicService.run();
    }
}