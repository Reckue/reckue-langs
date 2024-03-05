import { TextBlocks } from "../../blocks/TextBlocks";
import { CoordinateBlockModel } from "../models/CoordinateBlockModel";
import { CursorModel } from "../models/CursorModel";
import { NetGraphModel } from "../models/NetGraphModel";
import {CloneBlockService} from "../../../../lib/services/CloneBlockService";
import {SizeModel} from "../../../../lib/models/SizeModel";

export class ParserService {

    getWord = (index: number, text: string ) => {
    
        const word = [""];
    
        this.next(word, text, index, (word: Array<string>, symbol: string, index: number) => {
            word[0] = word[0] + symbol;
            return index + 1;
        });
    
        this.next(word, text, index-1, (word: Array<string>, symbol: string, index: number) => {
            word[0] = symbol + word[0];
            return index - 1;
        });
    
        return word[0];
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