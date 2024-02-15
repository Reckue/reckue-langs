import {BlockHighlighting} from "../../realtime/highlighting/BlockHighlighting";
import {Parser} from "../../realtime/parser/Parser";
import {CacheProvider} from "./CacheProvider";
import {PopupManager} from "./PopupManager";


export class PageManager {

    #cacheProvider;
    #popupManager;

    constructor() {
        this.#cacheProvider = new CacheProvider();
        this.#popupManager = new PopupManager("menu");
    }

    run = () => {
        addEventListener("click", this.onclick);
        addEventListener("mousemove", this.onmousemove);
        addEventListener("scroll", this.onmousemove);
    }

    onclick = (event) => {
        let cache = this.#cacheProvider.getCache(event);
        if (cache) {
            const positions = cache.getTextBlocks().getPositions();
            let counter = 0;
            while (positions[counter] && positions[counter].y < event.offsetY) {
                counter++;
            }
            const parser = new Parser(event, cache.getTextBlocks());
            const word = parser.getWord();

            const netGraph = parser.getNetGraph();

            this.#popupManager.updatePopup(word, netGraph);
        }
    }

    onmousemove = (event) => {
        this.#cacheProvider.validateNoneBlackListElement(event, () => {
            let cache = this.#cacheProvider.getOrUpdateCache(event);

            const highlighting = new BlockHighlighting(
                cache.getFocusBlock(),
                cache.getTextBlocks()
            );

            highlighting.draw();

            this.onclick(event);
        });
    }
}