import {WordbookServiceFactory} from "./api/WordbookServiceFactory.js";
import {Context} from "./Context";

export class App {

    #context;
    #wordbookService;
    #logicService;
    #factory;

    constructor(logicService) {
        this.#context = new Context();
        this.#logicService = logicService;
        this.#factory = new WordbookServiceFactory(true); // Включаем API режим
        this.#wordbookService = this.#factory.createService();
    }

    start = async () => {
        try {
            // Инициализация API адаптера
            if (this.#wordbookService.initialize) {
                const initialized = await this.#wordbookService.initialize();
                if (!initialized) {
                    throw new Error('Failed to initialize API adapter');
                }
            }

            // Загрузка основного словаря
            if (this.#wordbookService.loadMainWordbook) {
                await this.#wordbookService.loadMainWordbook();
            } else {
                // Fallback для локального режима
                this.#wordbookService.executeAfter(this.#runService);
                this.#wordbookService.loadWordbooks();
                return;
            }

            this.#runService();
        } catch (error) {
            console.error('Failed to start with API mode, falling back to local mode:', error);
            // Fallback на локальный режим при ошибке API
            this.#factory.setUseApi(false);
            this.#wordbookService = this.#factory.createService();
            this.#wordbookService.executeAfter(this.#runService);
            this.#wordbookService.loadWordbooks();
        }
    }

    #runService = () => {
        Context.add("wordbook", this.#wordbookService);
        this.#logicService.run();
    }
}