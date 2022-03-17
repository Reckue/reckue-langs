export class Parser {

    #wordbook;

    constructor(wordbook) {
        this.#wordbook = wordbook;
    }

    /**
     * Парсим html страницу и выдаём как результат список всех
     * текстовых элементов на странице, с ссылками на эти самые элементы
     *
     * @returns {*[]} - latestNodesList (список всех текстовых элементов / это всегда конечные ноды)
     */
    parsePage = () => {
        window.console.log("Reckue language app: Start offline parsing.");
        let body = window.document.querySelector('body');
        window.console.log("Reckue language app: Start building latest nodes list...");
        return this.#buildLatestNodesList(body);
    }

    /**
     * Логирует процент парсинга страницы в спискок референсов, пока что работает топорно от тега BODY.
     * По какой-то причине ускоряет работу алгоритма парсинга. Магия не иначе :b
     *
     * @param node - берём отсюда название тега (определяем BODY) и общий объём работы (количество всех тэгов)
     * @param currIndex - текущий тэг, который и опредяет наш процент выполненной работы.
     * Когда currIndex === maxIndex (node.childNodes.length) - мы распарсили страницу.
     */
    #logPercent = (node, currIndex) => {
        if (node.nodeName === "BODY") {
            const maxIndex = node.childNodes.length;
            const percent = (currIndex * 100 / maxIndex).toFixed(2);
            window.console.log(`Reckue language app: Build latest nodes list ${percent}%`);
        }
    }

    /**
     * Принимает тэг и возвращает список всех TEXT элементов
     * (Они всегда расположены в конце дерева html документа)
     *
     * @param node - Текущий тэг
     * @returns {[]}
     */
    #buildLatestNodesList = (node) => {
        const localLastNodesList = [];
        node.childNodes.forEach((childNode, index) => {
            this.#logPercent(node, index);
            if (this.#notInteractiveElement(childNode)) {
                this.#parseCurrentNode(localLastNodesList, childNode);
            }
        });
        return localLastNodesList;
    }

    /**
     * Если текущий элемент не в конце дерева, идём парсить дальше,
     * иначе пробуем добавить его в массив всех TEXT элементов
     *
     * @param localLastNodesList - список всех TEXT элементов
     * @param node - текущий элемент
     */
    #parseCurrentNode = (localLastNodesList, node) => {
        if (node.hasChildNodes()) {
            this.#parseChildNodes(localLastNodesList, node);
        } else {
            this.#pushLastNode(localLastNodesList, node);
        }
    }

    /**
     * Заходим на 2 круг в buildLatestNodesList, но уже в более глубокой точке дерева,
     * получаем кусок масива TEXT элементов, который добавляем к уже имеющимуся списку всех TEXT элементов
     *
     * @param localLastNodesList
     * @param node
     */
    #parseChildNodes = (localLastNodesList, node) => {
        const childLastNodesList = this.#buildLatestNodesList(node);
        localLastNodesList.push(...childLastNodesList);
    }

    /**
     * Проводим все необходимые проверки и складываем ссылку на тэг
     * и его содержимое в локальный (не полный) список TEXT элементов
     *
     * @param list - локальный (не полный) список TEXT элементов
     * @param node - тэг с текстом
     */
    #pushLastNode = (list, node) => {
        list.push(node);
    }

    /**
     * Дебаг метод, при необходимости убрать в другое место.
     * Считывает всю информацию о ноде и её родителе, пишет её в консоль.
     * Рекомендуется для использования в методе pushLastNode, после запонения листа.
     *
     * @param node - Вся нужная информация для дебага содержится в этой ноде.
     */
    #typeOfNode = (node) => {
        window.console.log(node.textContent);
        window.console.log(node.toString());
        window.console.log(node.parentNode.toString());
        window.console.log(node.parentNode.nodeName);
        window.console.log(node.parentNode.role);
    }

    /**
     * Этот метод и методы под ним используются для отсеивания тэгов, которые мы точно не хотим парсить.
     * Различный динамический контент, то что переводить не надо, картинки, вспомогательные файлы, скрипты и тд.
     *
     * @param node - Тэг, который подвергается проверке.
     * @returns {boolean} - ответ на вопрос: парсим мы тэг или нет?
     */
    #notInteractiveElement = (node) => {
        return !this.#isScript(node) && !this.#isSVG(node) && !this.#isImage(node)
            && !this.#isInput(node) && !this.#isLink(node) && !this.#isBr(node)
            && !this.#isStyle(node) && !this.#isForm(node) && !this.#isComment(node)
            && !this.#isUnverifiableInteractiveElement(node);
    }
    #isScript = (node) => node instanceof HTMLScriptElement;
    #isForm = (node) => node instanceof HTMLFormElement;
    #isImage = (node) => node instanceof HTMLImageElement;
    #isInput = (node) => node instanceof HTMLInputElement;
    #isLink = (node) => node instanceof HTMLLinkElement;
    #isStyle = (node) => node instanceof HTMLStyleElement;
    #isBr = (node) => node instanceof HTMLBRElement;
    #isSVG = (node) => node instanceof SVGSVGElement;
    #isComment = (node) => node instanceof Comment;
    #isUnverifiableInteractiveElement = (node) => node.nodeName === "CODE" || node.nodeName === "A"

    textParsing = (textNodesList) => {
        const editableNodes = [];
        textNodesList.forEach(node => {
            const wordsList = this.#parseWordsList(node)
            const bundleWordsAndClearWordsList = this.#bundle(wordsList);
            editableNodes.push({node, bundleWordsAndClearWordsList})
        });
        return editableNodes;
    }

    #parseWordsList = (node) => {
        const text = node.textContent;
        const wordsList = text.split(' ');
        return this.#restoreSpaces(wordsList);
    }

    /**
     * Метод который добавляет пробелы в список, чтобы они не терялись после разделения методом split
     *
     * @param wordsList
     * @returns {[]}
     */
    #restoreSpaces = (wordsList) => {
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
    #bundle = (wordsList) => {
        const bundle = [];
        wordsList.forEach((word) => {
            const clearWord = this.#getClearWord(word);
            bundle.push({word, clearWord});
        });
        return bundle;
    }

    /**
     * Очищаем слово от лишних символов, ставим его в LowerCase
     * @param word - изначальное слово
     * @returns {string} - чистое слово
     */
    #getClearWord = (word) => {
        const clearWord = word.toString().toLowerCase().replace(/[\W]/g, '');
        if (this.#found(clearWord)) return clearWord;
        if (clearWord.endsWith('ed')) {
            return this.#checkByEnding(clearWord,'ed');
        }
        if (clearWord.endsWith('s')) {
            return this.#checkByEnding(clearWord,'s');
        }
        if (clearWord.endsWith('ing')) {
            return this.#checkByEnding(clearWord,'ing');
        }
        return clearWord;
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

    #found = (word) => this.#map().get(word);

    #map = () => this.#wordbook.get();
}