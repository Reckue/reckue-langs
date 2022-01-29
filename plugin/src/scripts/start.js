/**
 * Выгружаем wordbook из storage.
 *
 * Поскольку невозможно хранить его целиком,
 * грузим кусками по 100 слов в каждом.
 */
for (let i = 0; i < wordbooksArray.length; i++) {
    const name = "wordbook" + i;
    chrome.storage.sync.get([name], function(app) {
        loadWordbook(app[name]);
    });
}

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
chrome.storage.sync.get(['enable'], function(app) {
    window.console.log(`Reckue language app: Reach join point with app.enable=${app.enable}`);
    if (app.enable) {
        window.console.log(`Reckue language app: isServerSideParsingEnable=${IS_SERVER_SIDE_PARSING_ENABLE}`);
        if (IS_SERVER_SIDE_PARSING_ENABLE) {
            const htmlAfterParsing = prepareAndSendRequestToServerSideParser("userId", "collectionId");
            updateDom(htmlAfterParsing);
        } else {
            const textNodesList = parseTextNodes();
            const editableList = parseEditableNodes(textNodesList);
            const wordbook = getWordbook();
            // Возможность выгрузить текущий wordbook в файл.
            // saveFile(mapToString(wordbook));
            rebuildPage(editableList, wordbook);
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