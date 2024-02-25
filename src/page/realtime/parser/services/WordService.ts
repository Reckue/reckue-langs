import { notUnsupportedSymbol } from "./utils/NotUnsupportedSymbol";

export class WordService {

    word: Array<string> = [""];

    getWord(text: string, index: number): string {
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
        if (notUnsupportedSymbol(symbol)) {
            const nextIndex = execute(word, symbol, index);
            this.next(word, text, nextIndex, execute);
        }
    }

}

console.log(new WordService().getWord("my viktor's supertext", 1));