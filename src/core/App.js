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
        this.#factory = new WordbookServiceFactory(); // API режим
        this.#wordbookService = this.#factory.createService();
    }

    start = async () => {
        try {
            // Инициализация API адаптера
            const initialized = await this.#wordbookService.initialize();
            if (!initialized) {
                throw new Error('Failed to initialize API adapter');
            }

            // Загрузка основного словаря
            await this.#wordbookService.loadMainWordbook();
            
            // Проверяем, что словарь действительно загружен
            if (!this.#wordbookService.isWordbookReady()) {
                console.warn('Wordbook not fully loaded, but continuing...');
            } else {
                console.log('Wordbook is ready, starting service...');
            }
            
            this.#runService();
        } catch (error) {
            console.error('Failed to start with API mode:', error);
            throw error; // Не fallback на локальный режим
        }
    }

    #runService = () => {
        Context.add("wordbook", this.#wordbookService);
        this.#logicService.run();
    }
}