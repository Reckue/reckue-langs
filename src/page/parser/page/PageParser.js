import {Logger} from "../../../core/Logger";

export class PageParser {

    #textBlocks;
    #logger;

    constructor() {
        this.#logger = new Logger();
        this.#textBlocks = [];
    }

    /**
     * Парсим html страницу и выдаём как результат список всех
     * текстовых элементов на странице, с ссылками на эти самые элементы
     *
     * @returns {*[]} - latestNodesList (список всех текстовых элементов / это всегда конечные ноды)
     */
    parse = () => {
        this.#logger.log("Local parsing in progress...");
        let body = window.document.querySelector('body');
        this.#parsingTextBlocks(body);
        return this.#textBlocks;
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
            this.#logger.log(`processed ${percent}% of the page!`);
        }
    }

    /**
     * Принимает тэг и возвращает список всех TEXT элементов
     * (Они всегда расположены на вершинах дерева html документа)
     *
     * @param node - Текущий тэг
     * @returns {[]}
     */
    #parsingTextBlocks = (node) => {
        node.childNodes.forEach((childNode, index) => {
            this.#logPercent(node, index);
            if (this.#notInteractiveElement(childNode)) {
                this.#parseCurrentNode(childNode);
            }
        });
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
    #isUnverifiableInteractiveElement = (node) => node.nodeName === "CODE" || node.nodeName === "A";

    /**
     * Если текущий элемент не в конце дерева, идём парсить дальше,
     * иначе пробуем добавить его в массив всех TEXT элементов
     *
     * @param node - текущий элемент
     */
    #parseCurrentNode = (node) => {
        if (node.hasChildNodes()) {
            this.#parsingTextBlocks(node);
        } else {
            this.#textBlocks.push(node);
        }
    }
}