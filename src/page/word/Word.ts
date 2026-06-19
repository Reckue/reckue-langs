export const WORD_TOKEN = /[\p{L}\p{M}]+/gu;
export const WORD_CHAR = /[\p{L}\p{M}]/u;

/**
 * Value-объект токена: сырьё как на странице + clear-форма (lowercase).
 * Лемматизация вынесена в отдельную стратегию ([[Inflector]]), чтобы её можно
 * было заменить/усилить, не трогая матчинг.
 *
 * Замечание о границах: полное разворачивание сокращений из 0.5.0 (n't→not,
 * 'll→will) с Highlight API недостижимо — подсветка красит только физические
 * участки текста, вставить отсутствующее слово, не переписывая DOM, нельзя.
 */
export class Word {

    readonly raw: string;
    readonly clear: string;

    constructor(raw: string) {
        this.raw = raw;
        this.clear = raw.toLowerCase();
    }
}
