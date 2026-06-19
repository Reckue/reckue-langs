export const WORD_TOKEN = /[\p{L}\p{M}]+/gu;
export const WORD_CHAR = /[\p{L}\p{M}]/u;

/**
 * Лингвистическое представление токена — слой, унаследованный по смыслу из 0.5.0
 * (там были clear-форма, восстановление эндингов и тире). Здесь это место для
 * роста лемматизации: матчинг идёт по candidates(), а не по сырому toLowerCase().
 *
 * Полное разворачивание сокращений (n't→not, 'll→will) как в 0.5.0 с Highlight API
 * недостижимо: подсветка красит только физические участки текста — вставить
 * отсутствующее слово, не переписывая DOM, нельзя. Это плата за событийный движок.
 */
export class Word {

    readonly raw: string;
    readonly clear: string;

    constructor(raw: string) {
        this.raw = raw;
        this.clear = raw.toLowerCase();
    }

    candidates = (): string[] => {
        return [this.clear];
    };
}
