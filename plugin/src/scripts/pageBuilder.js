const editLatestNodesToRebuildPage = (editableNodes, wordbook) => {
    window.console.log("Reckue language app: Rebuilding page...");
    editableNodes.forEach((editable) => {
        const bundleList = editable.bundleWordsAndClearWordsList;
        appendText(editable.node, bundleList, getSavedWordsList(wordbook));
    });
    window.console.log("Reckue language app: Rebuilding page complete!");
}

const appendText = (node, bundleList, savedWordsList) => {
    const text = node.parentNode;
    bundleList.forEach((bundle) => {
        const word = bundle.word;
        const clearWord = bundle.clearWord;
        if (word === "") {
            text.insertBefore(createTextNode(" "), node);
        }
        if (savedWordsList.indexOf(clearWord) !== -1) {
            text.insertBefore(createLink(bundle), node);
        } else {
            text.insertBefore(createTextNode(bundle.word), node);
        }
    });
    node.remove();
}

const createLink = (bundle) => {
    window.console.log(`Reckue language app: Creating link to word ${bundle.clearWord}.`);
    const word = bundle.word;
    const clearWord = bundle.clearWord;
    const a = document.createElement('a');
    a.innerText = word;
    a.href = `https://translate.google.com/#view=home&op=translate&sl=en&tl=ru&text=${clearWord}`;
    a.target = "_blank";
    return a;
};

const createTextNode = (word) => {
    return document.createTextNode(word);
}

const getSavedWordsList = (oldWB) => {
    const wordbook = [];
    oldWB.forEach((bundle) => {
        wordbook.push(bundle.word);
    });
    return wordbook;
}