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
import { CursorModel } from "../realtime/parser/models/CursorModel";


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
            const cursor = new CursorModel(event.offsetX, event.offsetY);

            console.log("X: " + cursor.x);
            console.log("Y: " + cursor.y);
            
            const textLength = (<HTMLElement> event.target).innerText.length

            const blockWidth = cache.clone.block.width;
            const inlineHeight = cache.clone.inline.height
            const inlineWidth = cache.clone.inline.width

            const currentLine = Math.round(cursor.y / inlineHeight);
            const currentPositionByXInline = (blockWidth * (currentLine - 1)) + cursor.x;
            
            const offsetPercent = currentPositionByXInline / inlineWidth;
            const symbolIndexInline = Math.round(textLength * offsetPercent);
            
            console.log("currentPositionByXInline: " + currentPositionByXInline);
            console.log("offsetPercent: " + offsetPercent);
            console.log("symbolIndexInline: " + symbolIndexInline);

            // const highlighting = new BlockHighlighting(
            //     cache.focusBlock,
            //     cache.textBlocks
            // );

            // highlighting.draw();

            this.onclick(event);
        });
    }
}