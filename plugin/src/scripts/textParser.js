const parseEditableNodes = (textNodesList) => {
    const editableNodes = [];
    textNodesList.forEach(node => {
        const wordsList = parseWordsList(node)
        const bundleWordsAndClearWordsList = bundle(wordsList);
        editableNodes.push({node, bundleWordsAndClearWordsList})
    });
    return editableNodes;
}

const parseWordsList = (node) => {
    const text = node.textContent;
    const wordsList = text.split(' ');
    return restoreSpaces(wordsList);
}

/**
 * Метод который добавляет пробелы в список, чтобы они не терялись после разделения методом split
 *
 * @param wordsList
 * @returns {[]}
 */
const restoreSpaces = (wordsList) => {
    const wordsListWithSpaces = [];
    wordsList.forEach((word, index) => {
        if (index !== 0) {
            wordsListWithSpaces.push("");
        }
        wordsListWithSpaces.push(word);
    })
    return wordsListWithSpaces;
}

/**
 * Создаём связку слов и чистых слов без всяких точек, запятых, пробелов и тд.
 * Это нужно чтобы упростить сложность алгоритма построения страницы в дальнейшем.
 *
 * @param wordsList - список слов
 * @returns {[]} - список связок (слов и чистых слов)
 */
const bundle = (wordsList) => {
    const bundle = [];
    wordsList.forEach((word) => {
        const clearWord = getClearWord(word);
        bundle.push({word, clearWord});
    });
    return bundle;
}

/**
 * Очищаем слово от лишних символов, ставим его в LowerCase
 * @param word - изначальное слово
 * @returns {string} - чистое слово
 */
const getClearWord = (word) => word.toString().toLowerCase().replace(/[\W]/g, '');