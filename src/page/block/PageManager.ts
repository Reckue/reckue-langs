import {BlockHighlighting} from "../realtime/highlighting/BlockHighlighting";
import {CacheManager} from "./cache/CacheManager";
import {PopupManager} from "./popup/PopupManager";
import {CacheModel} from "./cache/models/CacheModel";
import {wordService} from "../realtime/parser/services/WordService";
import {HighlightingService} from "./highlighting/HighlightingService";
import { CloneBlockModel } from "../../lib/models/CloneBlockModel";
import { CloneBlockService } from "../../lib/services/CloneBlockService";
import { getSize } from "../realtime/parser/services/BlockService";
import { TextBlockModel } from "../realtime/blocks/TextBlockModel";
import { TextBlocks } from "../realtime/blocks/TextBlocks";


export class PageManager {

    private readonly cacheManager: CacheManager;
    private readonly popupManager: PopupManager;
    private readonly highlightingService: HighlightingService;
    private cloneBlockService : CloneBlockService;

    constructor() {
        this.cacheManager = new CacheManager();
        this.popupManager = new PopupManager("menu");
        this.highlightingService = new HighlightingService();
        this.cloneBlockService = new CloneBlockService();
    }

    run = () => {
        addEventListener("click", this.onclick);
        addEventListener("mousemove", this.onmousemove);
        addEventListener("scroll", this.onmousemove);
    }

    onclick = (event: MouseEvent) => {
        let cache: CacheModel = this.cacheManager.getCache(event);
        if (cache) {
        }
    }

    onmousemove = (event: MouseEvent) => {
        this.cacheManager.validateNoneBlackListElement(event, () => {
            let cache: CacheModel = this.cacheManager.getOrUpdateCache(event);



            console.log("Inline width");
            console.log(cache.clone.inline.width);
            console.log("Inline height");
            console.log(cache.clone.inline.height);
            console.log("Block width");
            console.log(cache.clone.block.width);
            console.log("Block height");
            console.log(cache.clone.block.height);

            // const highlighting = new BlockHighlighting(
            //     cache.focusBlock,
            //     cache.textBlocks
            // );

            // highlighting.draw();

            this.onclick(event);
        });
    }
}