const notSavedWords = new Set();

const rebuildPage = (editableNodes, wordbook) => {
    window.console.log("Reckue language app: Rebuilding page...");
    editableNodes.forEach((editable) => {
        const bundleList = editable.bundleWordsAndClearWordsList;
        const node = editable.node;
        appendText(node, bundleList, wordbook);
    });
    window.console.log("Reckue language app: Rebuilding page complete!");
    window.console.log(`Reckue language app: Found not saved words - ${notSavedWords.size}`);
    // saveFile(mapToString(notSavedWords));
}

const printWordbook = async () => {
    const wordbook = await getWordbook();
    window.console.log(wordbook);
};

const appendText = (node, bundleList, wordbookMap) => {
    const text = node.parentNode;
    bundleList.forEach((bundle) => {
        const word = bundle.word;
        const clearWord = bundle.clearWord;
        if (word === "") {
            text.insertBefore(createTextNode(" "), node);
        }
        if (wordbookMap.get(clearWord) !== undefined) {
            text.insertBefore(createLink(bundle, wordbookMap.get(clearWord)), node);
        } else {
            notSavedWords.add(clearWord);
            text.insertBefore(createTextNode(bundle.word), node);
        }
    });
    node.remove();
}

const createLink = (bundle, level) => {
    // window.console.log(`Reckue language app: Creating link to word ${bundle.clearWord}.`);
    const word = bundle.word;
    const clearWord = bundle.clearWord;
    const a = document.createElement('a');
    setupColor(a, level);
    a.innerText = word;
    a.href = `https://translate.google.com/#view=home&op=translate&sl=en&tl=ru&text=${clearWord}`;
    a.target = "_blank";
    return a;
};

const setupColor = (tag, level) => {
    // window.console.log(level);
    switch (level) {
        case Levels.NATIVE.name:
            tag.style.color = Levels.NATIVE.hex;
            break;
        case Levels.ADVANCED.name:
            tag.style.color = Levels.ADVANCED.hex;
            break;
        case Levels.INTERMEDIATE.name:
            tag.style.color = Levels.INTERMEDIATE.hex;
            break;
        case Levels.ELEMENTARY.name:
            tag.style.color = Levels.ELEMENTARY.hex;
            break;
        case Levels.BEGINNER.name:
            tag.style.color = Levels.BEGINNER.hex;
            break;
        default:
            tag.style.color = "rgb(30,30,30)";
            break;
    }
}

const createTextNode = (word) => {
    return document.createTextNode(word);
}