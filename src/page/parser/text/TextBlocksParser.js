import {Context} from "../../../core/Context";
import {Word} from "../../../core/words/Word";

export class TextBlocksParser {

    #wordsList;
    #wordbook;

    constructor() {
        this.#wordbook = Context.getWordbookService().getWordbookCache();
        this.#wordsList = [];
    }

    parse = (textBlocks) => {
        textBlocks.forEach(ref => {
            const originals = this.#parseWords(ref)
            this.#collectWords(ref, originals);
        });
        return this.#wordsList;
    }

    #parseWords = (ref) => {
        const text = ref.textContent;
        const wordsList = text.split(' ');
        return this.#restoreSpacesAndSymbols(wordsList);
    }

    /**
     * Метод который добавляет пробелы в список, чтобы они не терялись после разделения методом split
     * Также проверяет слова на наличие тире, в случае наличия - делит слова на два и добавляет дэш.
     * На случай если слово сливается с запятой или точкой также проверяет и эти случаи. Аналогично с тире.
     *
     * @param wordsList
     * @returns {[]}
     */
    #restoreSpacesAndSymbols = (wordsList) => {
        const wordsListWithSpaces = [];
        wordsList.forEach((word, index) => {
            if (index !== 0) {
                wordsListWithSpaces.push("");
            }
            this.#restoreSymbols(wordsListWithSpaces, word, "-") ||
            this.#restoreSymbols(wordsListWithSpaces, word, ".") ||
            this.#restoreSymbols(wordsListWithSpaces, word, "...") ||
            this.#restoreSymbols(wordsListWithSpaces, word, ",") ||
            this.#restoreEndings(wordsListWithSpaces, word);
        })
        return wordsListWithSpaces;
    }

    #restoreEndings = (words, word) => {
        if (word.endsWith("n't") && !word.includes("can't")) {
            this.#restoreSpecificEnding(words, word, "n't", "not");
        } else if (word.endsWith("'ll")) {
            this.#restoreSpecificEnding(words, word, "'ll", "will");
        } else {
            words.push(word);
        }
    }

    #restoreSpecificEnding = (words, word, ending, restored) => {
        const clear = this.#checkByEnding(word, ending);
        words.push(clear, "", restored);
    }

    #checkByEnding = (word, ending) => {
        const removedPastEndingWord = this.#removeEnding(word, ending);
        return this.#findMatches(removedPastEndingWord);
    }

    #removeEnding = (word, ending) => word.substr(0,word.length - ending.length);

    #findMatches = (word) => {
        if (this.#found(word)) return word;
        if (this.#found(word + 'e')) return word + 'e';
        return word;
    }

    #found = (word) => this.#wordbook.get(word);

    /**
     *  Непосредственно проверка наличия символа, разделение слова на
     *  два и добавление их вместе с символом в общий массив слов.
     *
     * @param words - общий массив слов
     * @param word - слово, которое проверяем на наличие символа.
     * @param symbol - символ, который проверяем
     *
     * @returns {boolean} - если сделали restore - вернём true, в дальнейшем проверяем это условие.
     * Если ни один из символов не будет найден, то в итоге просто добавим word в общий массив слов.
     */
    #restoreSymbols = (words, word, symbol) => {
        const splinted = word.split(symbol);
        if (splinted.length === 2) {
            const first = splinted[0];
            const second = splinted[1];
            words.push(first, symbol, second);
            return true;
        }
        return false;
    }

    /**
     * Создаём связку слов и чистых слов без всяких точек, запятых, пробелов и тд.
     * Это нужно чтобы упростить сложность алгоритма построения страницы в дальнейшем.
     *
     * Складываем связку вместе с ссылкой на изначальный элемент.
     *
     * @param ref - ссылка на элемент, из которого построен массив слов.
     * @param originals - список изначальных слов (В том виде в котором они на странице).
     * @returns {[]} - список связок (слов и чистых слов)
     */
    #collectWords = (ref, originals) => {
        const words = [];
        originals.forEach((original) => words.push(new Word(original)));
        this.#wordsList.push({ref, words});
    }
}