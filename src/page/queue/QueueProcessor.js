import {DOMBuilder} from "../render/DOMBuilder";
import {Context} from "../../core/Context";
import {Parser} from "../parser/Parser";
import {Queue} from "./Queue";
import {Logger} from "../../core/Logger";

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
        this.#parser.putInQueue(body);
        setInterval(() => {
            if (this.#isParsingQueueReady() && this.#isParsingPageQueueReady()) {
                this.#parser.parsePage();
            }
        }, 100);
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