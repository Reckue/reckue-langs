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
    const wordsListWithSpaces = [];
    wordsList.forEach((word, index) => {
        if (index !== 0) {
            wordsListWithSpaces.push("")
            wordsListWithSpaces.push(word);
        } else {
            wordsListWithSpaces.push(word);
        }
    })
    return wordsListWithSpaces;
}

const bundle = (wordsList) => {
    const bundle = [];
    wordsList.forEach((word) => {
        const clearWord = getClearWord(word);
        bundle.push({word, clearWord});
    });
    return bundle;
}

const getClearWord = (word) => word.toString().toLowerCase().replace(/[\W]/g, '');