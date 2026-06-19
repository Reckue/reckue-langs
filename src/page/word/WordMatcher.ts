import {Word, WORD_TOKEN} from "./Word";
import {Inflector} from "./Inflector";

export interface WordMatch {
    start: number;
    end: number;
    level: string;
}

/**
 * Матчинг текстовой ноды против словаря (бывш. TextBlocksParser из 0.5.0).
 * Токенизирует текст и для каждого токена ищет уровень: сперва точное совпадение,
 * затем базовые формы из Inflector (runs→run). Кэш — это живая Map из Wordbook.get(),
 * поэтому после service.set новые слова видны сразу, без перезагрузки.
 */
export class WordMatcher {

    private readonly cache: Map<string, string>;
    private readonly inflector: Inflector;

    constructor(cache: Map<string, string>, inflector: Inflector = new Inflector()) {
        this.cache = cache;
        this.inflector = inflector;
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
        const direct = this.cache.get(word.clear);
        if (direct) {
            return direct;
        }
        for (const base of this.inflector.bases(word.clear)) {
            const level = this.cache.get(base);
            if (level) {
                return level;
            }
        }
        return undefined;
    };
}
