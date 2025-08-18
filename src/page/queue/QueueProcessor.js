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

    constructor() {
        Context.add("render-queue", new Queue());
        Context.add("page-elements-queue", new Queue());
        Context.add("text-elements-queue", new Queue());
        this.#logger = new Logger();
        this.#parser = new Parser();
        this.#builder =  new DOMBuilder();
    }

    runInfinityParsing = () => {
        this.#startPageParsing();
        this.#startTextsParsing();
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
А
    runInfinityRender = () => {
        setInterval(() => {
            if (this.#isRenderQueueReady()) {
                this.#builder.rebuildPage();
            }
        }, 100);
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