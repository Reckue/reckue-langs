import {TextClone} from "../manager/TextClone";

export class Parser {

    #cursor;
    #block;
    #event;
    #text;
    #clone;
    #netGraph;
    #currentTextBlock;
    #textBlockSizes;
    #realHeight;
    #coefficient;
    // #gapHeight = 0;

    constructor(event) {
        this.#event = event;
        try {
            this.#setupText(event);
            this.#setupCursor(event);
            this.#setupBlock(event);
            this.#netGraph = {
                cursor: this.#cursor,
                block: this.#block,
                textLength: this.#text.length
            }
            this.#textBlockSizes = this.getTextBlocks().map((textBlock) => {
                const clone = new TextClone(event.target, textBlock);
                const size = clone.getSize(this.#block);
                if (!size.height)  {
                    size.height = 20;
                }
                return size;
            });
            // let countGaps = 0;
            this.#realHeight = this.#textBlockSizes.reduce((result, size) => {
                // if (size.height === 0) {
                //     countGaps++;
                // }
                return result + size.height;
            }, 0);

            this.#coefficient = this.#block.height / this.#realHeight;

            // if (countGaps) {
            //     this.#gapHeight = (this.#block.height - this.#realHeight) / countGaps;
            // }
            // this.#netGraph.gapHeight = this.#gapHeight;
            this.#netGraph.coefficient = this.#coefficient;
            // this.#netGraph.countGaps = countGaps;
            this.#netGraph.realHeight = this.#realHeight;
            const currentLine = this.getTextBlockIndex();
            this.#netGraph.currentLine = currentLine;
            this.#netGraph.textBlocksCount = this.getTextBlocks().length;
            this.#currentTextBlock = this.getTextBlocks()[currentLine];
            this.#clone = new TextClone(event.target, this.#currentTextBlock);
        } catch (e) {
            // ignore
        }
    }

    getWord = () => {

        const textBlockSize = this.getCurrentTextBlockSize();

        const cursorPercentage = this.getCursorPercentage(textBlockSize);

        const oneSymbolPercentage = 1 / this.#currentTextBlock.length;
        const index = Math.floor(cursorPercentage / oneSymbolPercentage);

        const word = [""];

        this.#next(word, this.#currentTextBlock, index, (word, symbol, index) => {
            word[0] = word[0] + symbol;
            return index + 1;
        });

        this.#next(word, this.#currentTextBlock, index-1, (word, symbol, index) => {
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
        return this.#netGraph;
    }

    getText = () => {
        //TODO:: DELETE
        return this.#text;
    }

    getTextBlocks = () => {
        return this.getText().split("\n");
    }

    getCurrentTextBlockSize = () => {
        const size = this.#clone.getSize();
        this.#netGraph.currentTextBlockSize = {...size};
        return size;
    }

    getCursorPercentage = (textBlock) => {
        return this.#cursor.x / textBlock.width;
    }

    getTextBlockIndex = () => {
        if (!this.#cursor) {
            return;
        }
        let counter = 0;
        let index = 0;
        while (this.#cursor.y > counter) {
            const size = this.#textBlockSizes[index];
            // if (size.height === 0) {
            //     counter += this.#gapHeight;
            // } else {
            //     //const gap = (size.height / 4) - 5;
            //     counter += size.height * this.#coefficient //+ gap;
            // }
            counter += size.height * this.#coefficient;
            index++;
        }
        return index - 1;
    }

    #setupText = (event) => {
        if (!event.target) {
            throw new DOMException();
        }
        this.#text = event.target.innerText;
    }

    #setupCursor = (event) => {
        this.#cursor = {};
        this.#cursor.x = event.offsetX;
        this.#cursor.y = event.offsetY;
    }

    #setupBlock = (event) => {
        this.#block = {};
        this.#block.width = event.target.offsetWidth;
        this.#block.height = event.target.offsetHeight;
        this.#block.x = event.target.offsetLeft;
        this.#block.y = event.target.offsetTop;
        let parent = event.target.offsetParent;
        while (parent && parent.offsetParent) {
            parent = parent.offsetParent;
            this.#block.x += parent.offsetLeft;
            this.#block.y += parent.offsetTop;
        }
    }

    // #nextSymbol = (word, text, index) => {
    //     let symbol = text[index];
    //     if(this.#notUnsupportedSymbol(symbol)) {
    //         word[0] = word[0] + symbol;
    //         this.#nextSymbol(word, text, index + 1);
    //     }
    // }
    //
    // #prevSymbol = (word, text, index) => {
    //     let symbol = text[index];
    //     if(this.#notUnsupportedSymbol(symbol)) {
    //         word[0] = symbol + word[0];
    //         this.#prevSymbol(word, text, index - 1);
    //     }
    // }

    #next = (word, text, index, execute) => {
        let symbol = text[index];
        if (this.#notUnsupportedSymbol(symbol)) {
            const nextIndex = execute(word, symbol, index);
            this.#next(word, text, nextIndex, execute);
        }
    }

    #notUnsupportedSymbol = (symbol) => {
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