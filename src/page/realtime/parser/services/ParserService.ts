import { ElementExactSizeService } from "../../../../lib/services/ElementExactSizeService";
import { TextBlockModel } from "../../blocks/TextBlockModel";
import { TextBlocks } from "../../blocks/TextBlocks";
import { SizeModel } from "../../size/SizeModel";
import { NetGraphManager } from "../managers/NetGraphManager";
import { CoordinateBlockModel } from "../models/CoordinateBlockModel";
import { CursorModel } from "../models/CursorModel";
import { NetGraphModel } from "../models/NetGraphModel";
import { TargetBlockProvider } from "../providers/TargetBlockProvider";
import { CursorProvider } from "../providers/CursorProvider";
import { NetGraphProvider } from "../providers/NetGraphProvider";
import { TextBlocksProvider } from "../providers/TextBlocksProvider";
import { CursorManager } from "../managers/CursorManager";
import { StringUtil } from "../utils/StringUtil";
import { TextProvider } from "../providers/TextProvider";

export class ParserService {

    private netGraphManager: NetGraphManager;
    private cursorProvider: CursorProvider;
    private cursorManager: CursorManager;
    private blockProvider: TargetBlockProvider;
    private elementExactSizeService: ElementExactSizeService;
    private textBlockProvider: TextBlocksProvider;
    private stringUtil: StringUtil;
    private textProvider: TextProvider;
    private netGraphProvider: NetGraphProvider;

    constructor(event: MouseEvent, innerTextBlocks: TextBlocks) {
        this.netGraphManager = new NetGraphManager();
        this.cursorProvider = new CursorProvider();
        this.blockProvider = new TargetBlockProvider();
        this.elementExactSizeService = new ElementExactSizeService();
    }

    getBlockMetaModel = (event: MouseEvent) => {
        const text = this.textProvider.getText(event);
        const cursor = this.cursorProvider.getCursor(event);
        const block = this.blockProvider.getBlock(event);
        const textBlocks = this.textBlockProvider.getTextBlocks(text);
        this.cursorManager = new CursorManager(cursor)
        this.stringUtil = new StringUtil()
        this.netGraphProvider.getNetGraph(cursor, block, text.length);
        const textBlockSizes = this.getTextBlockSizes(event, textBlocks, block)
        const realHeight = textBlockSizes.reduce((result, size) => {
            return result + size.height;
        }, 0);

        this.netGraphManager.setCursor(this.cursorProvider.getCursor(event));
        this.netGraphManager.setBlock(this.blockProvider.getBlock(event));

        const coefficient = block.height / realHeight;

        this.netGraphManager.setProperty("coefficient", coefficient)
        this.netGraphManager.setProperty("real-height", realHeight)
        const currentLine = this.getTextBlockIndex(event);
        this.netGraphManager.setProperty("current-line", currentLine)
        this.netGraphManager.setProperty("text-block-count", textBlocks.length)
        const currentTextBlock = textBlocks[currentLine];
    }

    getWord = () => {

        const textBlockSize = this.getCurrentTextBlockSize();

        const cursorPercentage = this.cursorManager.getCursorPercentageX(textBlockSize);

        const oneSymbolPercentage = 1 / this.currentTextBlock.length;

        const index = Math.floor(cursorPercentage / oneSymbolPercentage);

        const word = [""];

        this.next(word, this.currentTextBlock, index, (word: Array<string>, symbol: string, index: number) => {
            word[0] = word[0] + symbol;
            return index + 1;
        });

        this.next(word, this.currentTextBlock, index-1, (word: Array<string>, symbol: string, index: number) => {
            word[0] = symbol + word[0];
            return index - 1;
        });

        return word[0];
    }

    getNetGraphProperties = () => {
        return this.netGraphManager.getNetGraphProperties();
    }

    getCurrentTextBlockSize = (event: MouseEvent, textBlock: string, refSize: SizeModel) => {
        const size = this.elementExactSizeService.getSize(<HTMLElement> event.target, textBlock, refSize).inline;
        this.netGraphManager.setInlineBlockSize(<SizeModel> {...size});
        return size;
    }

    getTextBlockIndex = (event: MouseEvent) => {
        if (!this.cursorProvider.getCursor(event)) {
            return;
        }
        let counter = 0;
        let index = 0;
        while (this.cursorProvider.getCursor(event).y > counter) {
            const size = this.textBlockSizes[index];
            counter += size.height * this.coefficient;
            index++;
        }
        return index - 1;
    }

    getTextBlockSizes = (event: MouseEvent, textBlocks: Array<string>, block: CoordinateBlockModel) => {
        return textBlocks.map((textBlock) => {
            const size: any = this.elementExactSizeService.getSize(<HTMLElement> event.target, textBlock, block);
            if (!size.height)  {
                size.height = 20;
            }
            return size;
        });
    }

    private next = (word: Array<string>, text: string, index: number, execute: Function) => {
        let symbol = text[index];
        if (this.stringUtil.notUnsupportedSymbol(symbol)) {
            const nextIndex = execute(word, symbol, index);
            this.next(word, text, nextIndex, execute);
        }
    }

}