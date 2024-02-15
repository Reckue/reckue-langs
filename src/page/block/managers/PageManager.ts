import {BlockHighlighting} from "../../realtime/highlighting/BlockHighlighting";
import {Parser} from "../../realtime/parser/Parser";
import {CacheManager} from "./CacheManager";
import {PopupManager} from "./PopupManager";
import {CacheModel} from "./CacheModel";


export class PageManager {

    cacheManager: CacheManager;
    #popupManager: PopupManager;

    constructor() {
        this.cacheManager = new CacheManager();
        this.#popupManager = new PopupManager("menu");
    }

    run = () => {
        addEventListener("click", this.onclick);
        addEventListener("mousemove", this.onmousemove);
        addEventListener("scroll", this.onmousemove);
    }

    onclick = (event: MouseEvent) => {
        let cache: CacheModel = this.cacheManager.getCache(event);
        if (cache) {
            const parser = new Parser(event, cache.textBlocks);
            const word = parser.getWord();

            const netGraph = parser.getNetGraph();

            this.#popupManager.updatePopup(word, netGraph);
        }
    }

    onmousemove = (event: MouseEvent) => {
        this.cacheManager.validateNoneBlackListElement(event, () => {
            let cache: CacheModel = this.cacheManager.getOrUpdateCache(event);

            const highlighting = new BlockHighlighting(
                cache.focusBlock,
                cache.textBlocks
            );

            highlighting.draw();

            this.onclick(event);
        });
    }
}