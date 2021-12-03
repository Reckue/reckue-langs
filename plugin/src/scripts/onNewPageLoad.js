//TODO:: Убрать все лишние переменные из этого файла
const PARSER_URL = "http://localhost:8080/parser";
const POST_METHOD = 'POST';
const isServerSideParsingEnable = false;

/**
 * Идём в chrome.storage и берём оттуда два параметра.
 * enable - toggle указывающий на то включен плагин или нет.
 * collectionId - мусорный, потом уберу.
 *
 * Если плагин включен - то делаем парсинг страницы, при заходе на неё.
 *
 * Либо отработает логика серверного парсинга, либо распарсим у себя локально.
 * Второй вариант чуть дольше и ресурсо-затратнее.
 */
//TODO:: Заменить collectionId на wordbook. В параметре wordbook хранить всё что должно быть на сервере,
// но для локальной работы. По возможности релизовать механизмы синхронизации.
chrome.storage.sync.get(['enable', 'collectionId'], function(app) {
    window.console.log(`Reckue language app: Reach join point with app.enable=${app.enable}`);
    if (app.enable) {
        //делаем реквест с моковыми данными
        window.console.log(`Reckue language app: isServerSideParsingEnable=${isServerSideParsingEnable}`);
        if (isServerSideParsingEnable) {
            const htmlAfterParsing = prepareAndSendRequestToServerSideParser("userId", "collectionId");
            updateDom(htmlAfterParsing);
        } else {
            const latestNodesList = parseTextNodes();
            editLatestNodesToRebuildPage(latestNodesList);
        }
    }
});

/**
 * Собираем url и данные для отправки реквеста на сервер, отправляем этот реквест
 *
 * @param userId - id пользака
 * @param collectionId - мусорный параметр, в дальнейшем надо переработать,
 * пока что он принимается сервером, так что шлём его
 */
const prepareAndSendRequestToServerSideParser = (userId, collectionId) => {
    //TODO:: перенести всё что связанно с отправкой реквеста на сервер в dir ./remote
    const url = buildRequestUrl(userId, collectionId);
    const htmlBeforeParsing = window.document.querySelector('body').innerHTML;
    fillConfigPayload(htmlBeforeParsing);
    return doServerSideParsing(url, config);
};

/**
 * Вспомогательный метод, собирающий ссылку по которой пойдём на сервер
 *
 * @param userId - мусор на 03.12.21
 * @param collectionId - мусор на 03.12.21
 * @returns {string} - готовая ссылка
 */
buildRequestUrl = (userId, collectionId) => {
    return PARSER_URL + `/?userId=${userId}&collectionId=${collectionId}`;
}

/**
 * Заполняем глобальную переменную config необходимыми данными для отправления реквеста на сервер
 *
 * @param htmlBeforeParsing - html документ текущей страницы в изначальном виде
 */
fillConfigPayload = (htmlBeforeParsing) => {
    config.method = POST_METHOD;
    config.body = htmlBeforeParsing;
}

/**
 * Делаем реквест на сервер, передаём не распаршеную страницу,
 * получаем результат парсинга и передаём его документу, чтобы тот его отрендерил
 *
 * @param url
 * @param config
 */
doServerSideParsing = (url, config) => {
    return fetch(url, config).then(resp => resp.json()).then(json => {
        return json[0];
    });
}

/**
 * Рендерим результат серверного парсига
 *
 * @param html - готовая, перестроенная на сервере страница
 */
updateDom = (html) => document.querySelector('body').innerHTML = html;