import {DOMBuilder} from "../render/DOMBuilder";
import {Context} from "../../core/Context";
import {Parser} from "../parser/Parser";
import {Queue} from "./Queue";
import {Logger} from "../../core/Logger";
import {franc} from "franc";

export class QueueProcessor {

    #builder;
    #parser;
    #logger;
    #isWordbookReady = false;

    constructor() {
        Context.add("render-queue", new Queue());
        Context.add("page-elements-queue", new Queue());
        Context.add("text-elements-queue", new Queue());
        this.#logger = new Logger();
        this.#parser = new Parser();
        this.#builder =  new DOMBuilder();
        
        // Проверяем готовность словаря
        this.#checkWordbookReady();
        
        // Подписываемся на уведомления о готовности словаря
        this.#subscribeToWordbookReady();
    }

    #checkWordbookReady = () => {
        const checkInterval = setInterval(() => {
            try {
                const wordbookService = Context.getWordbookService();
                if (wordbookService && wordbookService.isWordbookReady()) {
                    const cache = wordbookService.getWordbookCache();
                    this.#logger.log(`Wordbook is ready with ${cache.size} words`);
                    this.#isWordbookReady = true;
                    clearInterval(checkInterval);
                    
                    // Принудительно запускаем перерендер после загрузки словаря
                    this.#forceRerenderAfterWordbookReady();
                } else if (wordbookService && wordbookService.isInitialized()) {
                    const cache = wordbookService.getWordbookCache();
                    this.#logger.log(`Wordbook initialized but cache has ${cache.size} words, waiting for data...`);
                } else {
                    this.#logger.log('Wordbook service not initialized, waiting...');
                }
            } catch (error) {
                this.#logger.log(`Error checking wordbook ready: ${error.message}`);
            }
        }, 500); // Проверяем каждые 500мс
        
        // Таймаут на случай, если данные не загрузятся
        setTimeout(() => {
            if (!this.#isWordbookReady) {
                this.#logger.log('Wordbook ready timeout, starting with empty cache');
                this.#isWordbookReady = true;
                clearInterval(checkInterval);
                
                // Принудительно запускаем перерендер даже при таймауте
                this.#forceRerenderAfterWordbookReady();
            }
        }, 10000); // 10 секунд таймаут
    }
    
    #subscribeToWordbookReady = () => {
        // Подписываемся на уведомления о готовности словаря
        setTimeout(() => {
            try {
                const wordbookService = Context.getWordbookService();
                if (wordbookService && typeof wordbookService.onWordbookReady === 'function') {
                    wordbookService.onWordbookReady(() => {
                        this.#logger.log('Received wordbook ready notification');
                        if (!this.#isWordbookReady) {
                            this.#isWordbookReady = true;
                            this.#forceRerenderAfterWordbookReady();
                        }
                    });
                }
                
                // Если словарь уже готов при подписке, запускаем перерендер
                if (wordbookService && wordbookService.isWordbookReady() && !this.#isWordbookReady) {
                    this.#logger.log('Wordbook already ready at subscription time');
                    this.#isWordbookReady = true;
                    this.#forceRerenderAfterWordbookReady();
                }
            } catch (error) {
                this.#logger.log(`Error subscribing to wordbook ready: ${error.message}`);
            }
        }, 1000); // Небольшая задержка для инициализации
    }
    
    #forceRerenderAfterWordbookReady = () => {
        this.#logger.log('Forcing rerender after wordbook ready...');
        
        // Принудительно запускаем парсинг страницы заново
        setTimeout(() => {
            try {
                const body = window.document.querySelector('body');
                if (body) {
                    this.#logger.log('Re-parsing page after wordbook ready');
                    this.#parser.putInQueue(body);
                }
            } catch (error) {
                this.#logger.log(`Error re-parsing page: ${error.message}`);
            }
        }, 100);
        
        // Принудительно запускаем рендеринг
        setTimeout(() => {
            try {
                this.#logger.log('Forcing page rebuild after wordbook ready');
                this.#builder.rebuildPage();
            } catch (error) {
                this.#logger.log(`Error forcing rebuild: ${error.message}`);
            }
        }, 200);
    }

    runInfinityParsing = () => {
        // Ждём готовности словаря перед началом парсинга
        const startParsing = () => {
            if (this.#isWordbookReady) {
                this.#logger.log('Starting infinite parsing - wordbook is ready');
                this.#startPageParsing();
                this.#startTextsParsing();
            } else {
                setTimeout(startParsing, 100);
            }
        };
        startParsing();
    }

    #startPageParsing = () => {
        let body = window.document.querySelector('body');
        this.#detectPageLanguage(body);
        this.#parser.putInQueue(body);
        setInterval(() => {
            if (this.#isParsingQueueReady() && this.#isParsingPageQueueReady()) {
                this.#parser.parsePage();
            }
        }, 100);
    }

    #detectPageLanguage = (bodyElement) => {
        try {
            // Получаем весь текст со страницы для анализа
            const pageText = bodyElement.textContent || bodyElement.innerText || '';
            
            // Ограничиваем текст для более быстрого анализа (первые 1000 символов)
            const sampleText = pageText.substring(0, 1000);
            
            // Определяем язык с помощью franc
            const detectedLanguage = franc(sampleText);
            
            this.#logger.log(`Detected page language: ${detectedLanguage}`);
            
        } catch (error) {
            this.#logger.log(`Error detecting page language: ${error.message}`);
        }
    }

    #startTextsParsing = () => {
        setInterval(() => {
            if (this.#isParsingQueueReady() && this.#isParsingTextsQueueReady()) {
                this.#parser.textBlocksParsing();
            }
        }, 100);
    }

    runInfinityRender = () => {
        // Ждём готовности словаря перед началом рендеринга
        const startRender = () => {
            if (this.#isWordbookReady) {
                this.#logger.log('Starting infinite render - wordbook is ready');
                setInterval(() => {
                    if (this.#isRenderQueueReady()) {
                        this.#builder.rebuildPage();
                    }
                }, 100);
            } else {
                setTimeout(startRender, 100);
            }
        };
        startRender();
    }

    #isRenderQueueReady = () => {
        const queue = Context.get("render-queue");
        return !queue.isActive() && !queue.isEmpty();
    }

    #isParsingQueueReady = () => {
        const render = Context.get("render-queue");
        return !render.isActive();
    }

    #isParsingPageQueueReady = () => {
        const page = Context.get("page-elements-queue");
        return !page.isActive() && !page.isEmpty();
    }

    #isParsingTextsQueueReady = () => {
        const texts = Context.get("text-elements-queue");
        return !texts.isActive() && !texts.isEmpty();
    }
}