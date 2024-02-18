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

export class ParserService {

    private netGraphManager: NetGraphManager;
    private cursorProvider: CursorProvider;
    private blockProvider: TargetBlockProvider;
    private elementExactSizeService: ElementExactSizeService

    constructor(event: MouseEvent, innerTextBlocks: TextBlocks) {
        this.netGraphManager = new NetGraphManager();
        this.cursorProvider = new CursorProvider();
        this.blockProvider = new TargetBlockProvider();
        this.elementExactSizeService = new ElementExactSizeService();

    }

    getBlockMetaModel = () => {
        this.setupText(event);
        this.setupCursor(event);
        this.setupBlock(event);
        this.netGraphProvider.setupNetGraphModel(this.cursor, this.block, this.text.length);
        this.textBlockSizes = this.getTextBlocks().map((textBlock) => {
            const size: any = clone.getSize(<HTMLElement> event.target, textBlock, this.block);
            if (!size.height)  {
                size.height = 20;
            }
            return size;
        });
        this.realHeight = this.textBlockSizes.reduce((result, size) => {
            return result + size.height;
        }, 0);

            this.netGraphManager.setCursor(this.cursorProvider.setupCursor(event));
            this.netGraphManager.setBlock(this.blockProvider.setupBlock(event));

            this.coefficient = this.block.height / this.realHeight;

            this.netGraphManager.setProperty("coefficient", this.coefficient)
            this.netGraphManager.setProperty("real-height", this.realHeight)
            const currentLine = this.getTextBlockIndex();
            this.netGraphManager.setProperty("current-line", currentLine)
            this.netGraphManager.setProperty("text-block-count", this.getTextBlocks().length)
            this.currentTextBlock = this.getTextBlocks()[currentLine];
    }

    getWord = () => {

        const textBlockSize = this.getCurrentTextBlockSize();

        const cursorPercentage = this.getCursorPercentageX(textBlockSize);

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

    getTextBlocks = () : Array<string> => {
        const texts = this.text.split("\n");
        const last = texts.pop();
        if (last) {
            texts.push(last);
        }
        return texts;
    }

    getCurrentTextBlockSize = (event: MouseEvent, textBlock: string, refSize: SizeModel) => {
        const size = this.elementExactSizeService.getSize(<HTMLElement> event.target, textBlock, refSize).inline;
        this.netGraphManager.setInlineBlockSize(<SizeModel> {...size});
        return size;
    }

    getCursorPercentageX = (textBlock: SizeModel) => {
        return this.cursor.x / textBlock.width;
    }

    getTextBlockIndex = () => {
        if (!this.cursor) {
            return;
        }
        let counter = 0;
        let index = 0;
        while (this.cursor.y > counter) {
            const size = this.textBlockSizes[index];
            counter += size.height * this.coefficient;
            index++;
        }
        return index - 1;
    }

    private setupText = (event: MouseEvent) => {
        if (!event.target) {
            throw new DOMException();
        }
        this.text = (<HTMLElement> event.target).innerText;
    }

    private setupCursor = (event: MouseEvent) => {
        this.cursor = this.cursorProvider.setupCursor(event);
    }

    private setupBlock = (event: MouseEvent) => {
        this.blockProvider.setupBlock(event);
    }

    private next = (word: Array<string>, text: string, index: number, execute: Function) => {
        let symbol = text[index];
        if (this.notUnsupportedSymbol(symbol)) {
            const nextIndex = execute(word, symbol, index);
            this.next(word, text, nextIndex, execute);
        }
    }

    private notUnsupportedSymbol = (symbol: string) => {
        return symbol
            && symbol !== " "
            && symbol !== "."
            && symbol !== ","
            && symbol !== "“"
            && symbol !== "”"
            && symbol !== "!"
            && symbol !== "?";
    }
}