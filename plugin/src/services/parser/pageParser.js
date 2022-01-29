/**
 * Парсим html страницу и выдаём как результат список всех
 * текстовых элементов на странице, с ссылками на эти самые элементы
 *
 * @returns {*[]} - latestNodesList (список всех текстовых элементов / это всегда конечные ноды)
 */
const parseTextNodes = () => {
    window.console.log("Reckue language app: Start offline parsing.");
    let body = window.document.querySelector('body');
    window.console.log("Reckue language app: Start building latest nodes list...");
    return buildLatestNodesList(body);
}

/**
 * Логирует процент парсинга страницы в спискок референсов, пока что работает топорно от тега BODY.
 * По какой-то причине ускоряет работу алгоритма парсинга. Магия не иначе :b
 *
 * @param node - берём отсюда название тега (определяем BODY) и общий объём работы (количество всех тэгов)
 * @param currIndex - текущий тэг, который и опредяет наш процент выполненной работы.
 * Когда currIndex === maxIndex (node.childNodes.length) - мы распарсили страницу.
 */
const logPercent = (node, currIndex) => {
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
const buildLatestNodesList = (node) => {
    const localLastNodesList = [];
    node.childNodes.forEach((childNode, index) => {
        logPercent(node, index);
        if (notInteractiveElement(childNode)) {
            parseCurrentNode(localLastNodesList, childNode);
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
const parseCurrentNode = (localLastNodesList, node) => {
    if (node.hasChildNodes()) {
        parseChildNodes(localLastNodesList, node);
    } else {
        pushLastNode(localLastNodesList, node);
    }
}

/**
 * Заходим на 2 круг в buildLatestNodesList, но уже в более глубокой точке дерева,
 * получаем кусок масива TEXT элементов, который добавляем к уже имеющимуся списку всех TEXT элементов
 *
 * @param localLastNodesList
 * @param node
 */
const parseChildNodes = (localLastNodesList, node) => {
    const childLastNodesList = buildLatestNodesList(node);
    localLastNodesList.push(...childLastNodesList);
}

/**
 * Проводим все необходимые проверки и складываем ссылку на тэг
 * и его содержимое в локальный (не полный) список TEXT элементов
 *
 * @param list - локальный (не полный) список TEXT элементов
 * @param node - тэг с текстом
 */
const pushLastNode = (list, node) => {
    list.push(node);
}

/**
 * Дебаг метод, при необходимости убрать в другое место.
 * Считывает всю информацию о ноде и её родителе, пишет её в консоль.
 * Рекомендуется для использования в методе pushLastNode, после запонения листа.
 *
 * @param node - Вся нужная информация для дебага содержится в этой ноде.
 */
const typeOfNode = (node) => {
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
const notInteractiveElement = (node) => {
    return !isScript(node) && !isSVG(node) && !isImage(node) && !isInput(node) && !isLink(node) && !isBr(node)
        && !isStyle(node) && !isForm(node) && !isComment(node) && !isUnverifiableInteractiveElement(node);
}
const isScript = (node) => node instanceof HTMLScriptElement;
const isForm = (node) => node instanceof HTMLFormElement;
const isImage = (node) => node instanceof HTMLImageElement;
const isInput = (node) => node instanceof HTMLInputElement;
const isLink = (node) => node instanceof HTMLLinkElement;
const isStyle = (node) => node instanceof HTMLStyleElement;
const isBr = (node) => node instanceof HTMLBRElement;
const isSVG = (node) => node instanceof SVGSVGElement;
const isComment = (node) => node instanceof Comment;
const isUnverifiableInteractiveElement = (node) => node.nodeName === "CODE" || node.nodeName === "A"