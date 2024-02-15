import {BlockHighlighting} from "../../realtime/highlighting/BlockHighlighting";
import {Parser} from "../../realtime/parser/Parser";
import {CacheProvider} from "./CacheProvider";
import {PopupManager} from "./PopupManager";
import {CacheModel} from "./CacheModel";


export class PageManager {

    #cacheProvider: CacheProvider;
    #popupManager: PopupManager;

    constructor() {
        this.#cacheProvider = new CacheProvider();
        this.#popupManager = new PopupManager("menu");
    }

    run = () => {
        addEventListener("click", this.onclick);
        addEventListener("mousemove", this.onmousemove);
        addEventListener("scroll", this.onmousemove);
    }

    onclick = (event: MouseEvent) => {
        let cache: CacheModel = this.#cacheProvider.getCache(event);
        if (cache) {
            const positions = cache.textBlocks.getPositions();
            let counter = 0;
            while (positions[counter] && positions[counter].y < event.offsetY) {
                counter++;
            }
            const parser = new Parser(event, cache.textBlocks);
            const word = parser.getWord();

            const netGraph = parser.getNetGraph();

            this.#popupManager.updatePopup(word, netGraph);
        }
    }

    onmousemove = (event: MouseEvent) => {
        this.#cacheProvider.validateNoneBlackListElement(event, () => {
            let cache: CacheModel = this.#cacheProvider.getOrUpdateCache(event);

            const highlighting = new BlockHighlighting(
                cache.focusBlock,
                cache.textBlocks
            );

            highlighting.draw();

            this.onclick(event);
        });
    }
}