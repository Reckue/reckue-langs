import {Word, WORD_TOKEN} from "./Word";

export interface WordMatch {
    start: number;
    end: number;
    level: string;
}

/**
 * Матчинг текстовой ноды против словаря (бывш. TextBlocksParser из 0.5.0).
 * Токенизирует текст и для каждого токена ищет уровень в кэше словаря.
 * Кэш — это живая Map из Wordbook.get(), поэтому после service.set новые слова
 * видны сразу, без перезагрузки.
 */
export class WordMatcher {

    private readonly cache: Map<string, string>;

    constructor(cache: Map<string, string>) {
        this.cache = cache;
    }

    matchNode = (node: Text): WordMatch[] => {
        const text = node.nodeValue ?? "";
        const matches: WordMatch[] = [];
        for (const match of text.matchAll(WORD_TOKEN)) {
            if (match.index === undefined) {
                continue;
            }
            const level = this.lookup(new Word(match[0]));
            if (level) {
                matches.push({start: match.index, end: match.index + match[0].length, level});
            }
        }
        return matches;
    };

    has = (raw: string): boolean => {
        return this.lookup(new Word(raw)) !== undefined;
    };

    private lookup = (word: Word): string | undefined => {
        for (const candidate of word.candidates()) {
            const level = this.cache.get(candidate);
            if (level) {
                return level;
            }
        }
        return undefined;
    };
}
