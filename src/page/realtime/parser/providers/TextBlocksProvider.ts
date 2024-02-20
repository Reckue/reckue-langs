export class TextBlocksProvider {

    getTextBlocks = (text: string) : Array<string> => {
        const texts = text.split("\n");
        const last = texts.pop();
        if (last) {
            texts.push(last);
        }
        return texts;
    }
}