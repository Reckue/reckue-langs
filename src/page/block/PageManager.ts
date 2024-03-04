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
        // console.log(`offsetWidth: ${(<HTMLElement> event.target).offsetWidth}`);
        // console.log(`offsetHeight: ${(<HTMLElement> event.target).offsetHeight}`);
        let cache: CacheModel = this.cacheManager.getCache(event);
        if (cache) {
            // cache.textBlocks.getBlocks()[0]
        //     console.log();

            // const parser = new ParserService(event, cache.textBlocks);
            // const text = (<HTMLElement> event.target).innerText;
            // this.cloneBlockService.getSize(<HTMLElement> event.target, text, getSize(<HTMLElement> event.target));
            // const line = "Say my name";
            // const index = 2;
            // const word = wordService.getWord(line, index);

            // const netGraph = parser.getNetGraph();

            // this.#popupManager.updatePopup(word, netGraph);
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