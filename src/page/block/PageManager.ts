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
import { IndexService } from "./IndexService";
import { NodeManager } from "./NodeManager";
import { SizeModel } from "../../lib/models/SizeModel";


export class PageManager {

    private readonly cacheManager: CacheManager;
    private readonly popupManager: PopupManager;
    private readonly highlightingService: HighlightingService;
    private cloneBlockService : CloneBlockService;
    private indexService: IndexService;
    private nodeManager: NodeManager

    constructor() {
        this.cacheManager = new CacheManager();
        this.popupManager = new PopupManager("menu");
        this.highlightingService = new HighlightingService();
        this.cloneBlockService = new CloneBlockService();
        this.indexService = new IndexService();
        this.nodeManager = new NodeManager();
    }

    run = () => {
        const body = document.querySelector('body'); 

        const textNodeArray: Array<any> = this.nodeManager.getTextNodes(body);

        console.log(textNodeArray)

        const cloneArray: Array<CloneBlockModel> = textNodeArray.map((el) => {
            const {width, height} = el.getBoundingClientRect();
            return this.cloneBlockService.getSize(el, el.textContent, new SizeModel(width, height));
        });

        console.log(cloneArray.length);

        cloneArray.forEach((el) => {
            console.log(el.inline.width);
            console.log(el.inline.height);
            console.log(el.block.width);
            console.log(el.block.height);
        })
}
 // => [div#root, div.page-wrapper.document-page, ...]

}
    // const nodes = span.childNodes
    // for (let i = 0; i < nodes.length; i++) {
    //   const item = nodes[i];
    //     if (item.innerHTML == undefined) {
    //         const split = item.textContent.split(' ')
    //         console.log(split)
    //     }
    // }
    // onclick = (event: MouseEvent) => {
    //     let cache: CacheModel = this.cacheManager.getCache(event);
    //     if (cache) {
    //     }
    // }

    // onmousemove = (event: MouseEvent) => {
    //     this.cacheManager.validateNoneBlackListElement(event, () => {
    //         // let cache: CacheModel = this.cacheManager.getOrUpdateCache(event);

    //         const blockInnerText = (<HTMLElement> event.target).innerText

    //         const index = new IndexService().getIndex(event, blockInnerText)
            
    //         const parser = new ParserService();
    //         const word = parser.getWord(index, blockInnerText);
    //         console.log(word)

    //         // const highlighting = new BlockHighlighting(
    //         //     cache.focusBlock,
    //         //     cache.textBlocks
    //         // );

    //         // highlighting.draw();

    //         this.onclick(event);
    //     });
    // }