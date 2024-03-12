import { CursorModel } from "../realtime/parser/models/CursorModel";
import { CacheManager } from "./cache/CacheManager";
import { CacheModel } from "./cache/models/CacheModel";

export class IndexService {

    private readonly cacheManager: CacheManager;

    constructor() {
    this.cacheManager = new CacheManager();
    }
    
    getIndex(event: MouseEvent, blockInnerText: string) {
        let cache: CacheModel = this.cacheManager.getOrUpdateCache(event);
        const cursor = new CursorModel(event.offsetX, event.offsetY);

        const blockWidth = cache.clone.block.width;
        const inlineHeight = cache.clone.inline.height
        const inlineWidth = cache.clone.inline.width

        const currentLine = Math.round(cursor.y / inlineHeight);
        console.log('currentLine: ' + currentLine)
        const currentPositionByXInline = (blockWidth * (currentLine - 1)) + cursor.x;
    
        const offsetPercent = currentPositionByXInline / inlineWidth;
        const symbolIndexInline = Math.round(blockInnerText.length * offsetPercent);
    
        return symbolIndexInline
    }
}