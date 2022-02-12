class DOMBuilder {

    #wordbook;
    #notSavedWords = new Set();

    constructor() {
        this.#wordbook = getWordbook();
    }

    rebuildPage = (editableNodes) => {
        window.console.log("Reckue language app: Rebuilding page...");
        editableNodes.forEach((editable) => {
            const bundleList = editable.bundleWordsAndClearWordsList;
            const node = editable.node;
            this.#appendText(node, bundleList);
        });
        window.console.log("Reckue language app: Rebuilding page complete!");
        window.console.log(`Reckue language app: Found not saved words - ${this.#notSavedWords.size}`);
        // saveFile(mapToString(this.#notSavedWords));
    }

    #printWordbook = async () => {
        const wordbook = await getWordbook();
        window.console.log(wordbook);
    };

    #appendText = (node, bundleList) => {
        const text = node.parentNode;
        bundleList.forEach((bundle) => {
            const word = bundle.word;
            const clearWord = bundle.clearWord;
            if (word === "") {
                text.insertBefore(this.#createTextNode(" "), node);
            }
            if (this.#wordbook.get(clearWord) !== undefined) {
                text.insertBefore(this.#createLink(bundle, this.#wordbook.get(clearWord)), node);
            } else {
                this.#notSavedWords.add(clearWord);
                text.insertBefore(this.#createTextNode(bundle.word), node);
            }
        });
        node.remove();
    }

    #createLink = (bundle, level) => {
        // window.console.log(`Reckue language app: Creating link to word ${bundle.clearWord}.`);
        const word = bundle.word;
        const clearWord = bundle.clearWord;
        const a = document.createElement('a');
        this.#setupColor(a, level);
        a.innerText = word;
        a.href = `https://translate.google.com/#view=home&op=translate&sl=en&tl=ru&text=${clearWord}`;
        a.target = "_blank";
        return a;
    };

    #setupColor = (tag, level) => {
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

    #createTextNode = (word) => {
        return document.createTextNode(word);
    }
}