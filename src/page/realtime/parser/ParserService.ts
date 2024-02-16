import {PseudoTextBlockClone} from "../blocks/PseudoTextBlockClone";
import { TextBlockModel } from "../blocks/TextBlockModel";
import { TextBlocks } from "../blocks/TextBlocks";
import { SizeModel } from "../size/SizeModel";
import { CoordinateBlockModel } from "./models/CoordinateBlockModel";
import { CursorModel } from "./models/CursorModel";
import { NetGraphModel } from "./models/NetGraphModel";

export class ParserService {

    private cursor: CursorModel;
    private block: CoordinateBlockModel;
    private event;
    private text: string;
    private clone;
    private netGraph: NetGraphModel;
    private currentTextBlock;
    private textBlockSizes;
    private realHeight;
    private coefficient;

    private innerTextBlocks;
    // gapHeight = 0;

    constructor(event: MouseEvent, innerTextBlocks: TextBlocks) {
        this.event = event;
        this.innerTextBlocks = innerTextBlocks;
        try {
            this.setupText(event);
            this.setupCursor(event);
            this.setupBlock(event);
            this.netGraph = new NetGraphModel(
                this.cursor,
                this.block,
                this.text.length
            )
            this.textBlockSizes = this.getTextBlocks().map((textBlock) => {
                const clone = new PseudoTextBlockClone(event.target, textBlock);
                const size: any = clone.getSize(this.block);
                if (!size.height)  {
                    size.height = 20;
                }
                return size;
            });
            // let countGaps = 0;
            this.realHeight = this.textBlockSizes.reduce((result, size) => {
                // if (size.height === 0) {
                //     countGaps++;
                // }
                return result + size.height;
            }, 0);

            this.coefficient = this.block.height / this.realHeight;

            // if (countGaps) {
            //     this.gapHeight = (this.block.height - this.realHeight) / countGaps;
            // }
            // this.netGraph.gapHeight = this.gapHeight;
            this.netGraph.coefficient = this.coefficient;
            // this.netGraph.countGaps = countGaps;
            this.netGraph.realHeight = this.realHeight;
            const currentLine = this.getTextBlockIndex();
            this.netGraph.currentLine = currentLine;
            this.netGraph.textBlocksCount = this.getTextBlocks().length;
            this.currentTextBlock = this.getTextBlocks()[currentLine];
            this.clone = new PseudoTextBlockClone(event.target, this.currentTextBlock);
        } catch (e) {
            // ignore
        }
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

    // getNetGraph = () => {
    //     {
    //         textBlock,
    //         index,
    //         lineIndex,
    //         textBlocks[lineIndex].length,
    //         one,
    //         offset,
    //         {
    //             width: event.target.offsetWidth,
    //             height: event.target.offsetHeight
    //         },
    //         eventInfo
    //     }
    // }

    getNetGraph = () => {
        return this.netGraph;
    }

    getText = () => {
        //TODO:: DELETE
        return this.text;
    }

    getTextBlocks = () : Array<string> => {
        const texts = this.getText().split("\n");
        const last = texts.pop();
        if (last) {
            texts.push(last);
        }
        return texts;
    }

    getCurrentTextBlockSize = () => {
        const size = this.clone.getSize(this.block).inline;
        this.netGraph.currentTextBlockSize = <SizeModel> {...size};
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
        this.cursor = new CursorModel();
        this.cursor.x = event.offsetX;
        this.cursor.y = event.offsetY;
    }

    private setupBlock = (event: MouseEvent) => {
        this.block = new CoordinateBlockModel();
        const target = <HTMLElement> event.target;
        this.block.width = target.offsetWidth;
        this.block.height = target.offsetHeight;
        this.block.x = target.offsetLeft;
        this.block.y = target.offsetTop;
        let parent = <HTMLElement> target.offsetParent;
        while (parent && parent.offsetParent) {
            parent = <HTMLElement>parent.offsetParent;
            this.block.x += parent.offsetLeft;
            this.block.y += parent.offsetTop;
        }
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