import {BlockHighlighting} from "../../realtime/highlighting/BlockHighlighting";
import {CacheManager} from "./CacheManager";
import {PopupManager} from "./PopupManager";
import {CacheModel} from "./models/CacheModel";
import {ParserService} from "../../realtime/parser/services/ParserService";


export class PageManager {

    private readonly cacheManager: CacheManager;
    private readonly popupManager: PopupManager;

    constructor() {
        this.cacheManager = new CacheManager();
        this.popupManager = new PopupManager("menu");
    }

    run = () => {
        addEventListener("click", this.onclick);
        addEventListener("mousemove", this.onmousemove);
        addEventListener("scroll", this.onmousemove);
    }

    onclick = (event: MouseEvent) => {
        let cache: CacheModel = this.cacheManager.getCache(event);
        if (cache) {
            //TODO Move to constructor
            const parser = new ParserService(event, cache.textBlocks);
            //TODO Create BlockMetaService
            const word = parser.getWord(
                //TODO Provide BlockMetaModel 
            );

            const netGraph = parser.getNetGraphProperties();

            this.popupManager.updatePopup(word, netGraph);
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