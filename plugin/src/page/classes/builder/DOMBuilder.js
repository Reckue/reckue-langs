class DOMBuilder {

    #logger = new Logger();
    #wordbook;
    #notSavedWords = new Set();
    #nodes;
    #language;
    #popup;

    constructor(language) {
        this.#language = language;
        this.#wordbook = getWordbook();
        this.#popup = new WordPopup();
    }

    rebuildPage = (nodes) => {
        this.#nodes = nodes;
        this.#logAspect(this.#mainLogic);
        // saveFile(mapToString(this.#notSavedWords));
    }

    #mainLogic = () => {
        this.#nodes.forEach((editable) => {
            const bundleList = editable.bundleWordsAndClearWordsList;
            const node = editable.node;
            this.#appendText(node, bundleList);
        });
    }

    #logAspect = (logic) => {
        this.#logger.log("Rebuilding page...");
        logic();
        this.#logger.log("Rebuilding page complete!");
        this.#logger.log(`Found not saved words - ${this.#notSavedWords.size}`);
    }

    #printWordbook = async () => {
        const wordbook = await getWordbook();
        window.console.log(wordbook);
    };

    #appendText = (node, bundleList) => {
        const text = node.parentNode;
        bundleList.forEach((bundle) => {
            this.#appendWord(text, bundle, node);
        });
        node.remove();
    }

    #appendWord = (text, bundle, node) => {
        const word = bundle.word;
        const clearWord = bundle.clearWord;
        if (word === "") {
            text.insertBefore(this.#createTextNode(" "), node);
        }
        if (this.#wordbook.get(clearWord) !== undefined) {
            const interactiveWord = new InteractiveWord(this.#language, this.#popup);
            const link = interactiveWord.createLink(bundle, this.#wordbook.get(clearWord));
            text.insertBefore(link, node);
        } else {
            if (clearWord !== " ") {
                this.#notSavedWords.add(clearWord);
            }
            text.insertBefore(this.#createTextNode(bundle.word), node);
        }
    }

    #createTextNode = (word) => {
        return document.createTextNode(word);
    }
}