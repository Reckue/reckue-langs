import {BlockHighlighting} from "../realtime/highlighting/BlockHighlighting";
import {CacheManager} from "./cache/CacheManager";
import {PopupManager} from "./popup/PopupManager";
import {CacheModel} from "./cache/models/CacheModel";
import {ParserService} from "../realtime/parser/ParserService";
import {HighlightingService} from "./highlighting/HighlightingService";


export class PageManager {

    private readonly cacheManager: CacheManager;
    private readonly popupManager: PopupManager;
    private readonly highlightingService: HighlightingService;

    constructor() {
        this.cacheManager = new CacheManager();
        this.popupManager = new PopupManager("menu");
        this.highlightingService = new HighlightingService();
    }

    run = () => {
        addEventListener("click", this.onclick);
        addEventListener("mousemove", this.onmousemove);
        addEventListener("scroll", this.onmousemove);
    }

    onclick = (event: MouseEvent) => {
        let cache: CacheModel = this.cacheManager.getCache(event);
        if (cache) {
            // const parser = new ParserService(event, cache.textBlocks);
            // // const word = node.getWord();
            //
            // const netGraph = parser.getNetGraph();
            //
            // // this.#popupManager.updatePopup(word, netGraph);
        }
    }

    onmousemove = (event: MouseEvent) => {
        this.cacheManager.validateNoneBlackListElement(event, () => {
            let cache: CacheModel = this.cacheManager.getOrUpdateCache(event);

            // const highlighting = new BlockHighlighting(
            //     cache.focusBlock,
            //     cache.textBlocks
            // );
            //
            // highlighting.draw();
            //
            // this.onclick(event);
        });
    }
}