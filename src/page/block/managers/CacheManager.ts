import {TextBlocks} from "../../realtime/blocks/TextBlocks";
import {CacheModel} from "./models/CacheModel";
import {FocusBlockModel} from "../../realtime/blocks/FocusBlockModel";

export class CacheManager {

    #blackList;
    #cachedBlocks;

    constructor() {
        this.#blackList = new Set();
        this.#cachedBlocks = new Map();
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
        const focusBlock = this.#whereWeAre(event);
        const textBlocks = new TextBlocks(focusBlock);
        const cache = new CacheModel(focusBlock, textBlocks);
        this.#cachedBlocks.set(event.target, cache);
        return cache;
    }

    #whereWeAre = (event: MouseEvent) => {
        return new FocusBlockModel(event);
    }

    #getTextNodes = (event: MouseEvent) => {
        return Array
            .from((<Node> event.target).childNodes)
            .filter(node => node.nodeName === "#text");
    };
}