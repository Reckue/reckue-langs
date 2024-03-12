import {TextBlocks} from "../../realtime/blocks/TextBlocks";
import {CacheModel} from "./models/CacheModel";
import {FocusBlockModel} from "../../realtime/blocks/FocusBlockModel";
import { CloneBlockService } from "../../../lib/services/CloneBlockService";
import { SizeModel } from "../../../lib/models/SizeModel";

export class CacheManager {

    #blackList;
    #cachedBlocks;

    cloneBlockService: CloneBlockService;

    constructor() {
        this.#blackList = new Set();
        this.#cachedBlocks = new Map();

        this.cloneBlockService = new CloneBlockService();
    }

    getOrUpdateCache = (event: MouseEvent) => {
        let cache = this.getCache(event);
        if (!cache) {
            if (this.#getTextNodes(event).length > 0) {
                cache = this.#updateCache(event);
            } else {
                this.#blackList.add(event.target);
            }
        }
        return cache;
    }

    getCache = (event: MouseEvent) => {
        return this.#cachedBlocks.get(event.target);
    }

    validateNoneBlackListElement = (event: MouseEvent, execute: Function) => {
        if (!this.#blackList.has(event.target)) {
            execute();
        }
    }

    #updateCache = (event: MouseEvent) => {
        const ref = <HTMLElement> event.target;
        const text = ref.innerText;
        const {width, height} = ref.getBoundingClientRect();

        const clone = this.cloneBlockService.getSize(ref, text, new SizeModel(width, height));
        const cache = new CacheModel(clone);
        this.#cachedBlocks.set(event.target, cache);
        return cache;
    }

    #whereWeAre = (event: MouseEvent) => {
        return new FocusBlockModel(event);
    }

    // What is this!?
    #getTextNodes = (event: MouseEvent) => {
        const array = Array
            .from((<Node> event.target).childNodes)
            .filter(node => node.nodeName === "#text");
        //Почему пропускает вложенные элементы?    
        //array.map((el) => console.log(el));
        return array;
    };
}