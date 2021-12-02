//TODO:: Убрать все лишние переменные из этого файла
const BASE_URL = "http://localhost:8080/parser";
const POST_METHOD = 'POST';

/**
 * Если плагин включен - то делаем парсинг страницы, при заходе на неё.
 */
chrome.storage.sync.get(['enable', 'collectionId'], function(app) {
    if (app.enable) {
        //делаем реквест с моковыми данными
        prepareAndSendRequestToServerSideParser(userId, collectionId);
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
    doServerSideParsing(url, config);
};

buildRequestUrl = (userId, collectionId) => {
    return BASE_URL + `/?userId=${userId}&collectionId=${collectionId}`;
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
    fetch(url, config).then(resp => resp.json()).then(json => {
        const htmlAfterParsing = json[0];
        createDom(htmlAfterParsing);
    });
}

createDom = (html) => document.querySelector('body').innerHTML = html;