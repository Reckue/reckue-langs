import {TextBlocks} from "../../realtime/blocks/TextBlocks";
import {CacheModel} from "./CacheModel";
import {FocusBlockModel} from "../../realtime/blocks/FocusBlockModel";

export class CacheProvider {

    #blackList;
    #cachedBlocks;

    constructor() {
        this.#blackList = new Set();
        this.#cachedBlocks = new Map();
    }

    getOrUpdateCache = (event) => {
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

    getCache = (event) => {
        return this.#cachedBlocks.get(event.target);
    }

    validateNoneBlackListElement = (event, execute) => {
        if (!this.#blackList.has(event.target)) {
            execute();
        }
    }

    #updateCache = (event) => {
        const focusBlock = this.#whereWeAre(event);
        const textBlocks = new TextBlocks(focusBlock);
        const cache = new CacheModel(focusBlock, textBlocks);
        this.#cachedBlocks.set(event.target, cache);
        return cache;
    }

    #whereWeAre = (event) => {
        return new FocusBlockModel(event);
    }

    #getTextNodes = (event) => Array
        .from(event.target.childNodes)
        .filter(node => node.nodeName === "#text");
}