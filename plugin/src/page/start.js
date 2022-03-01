const wordbook = new Wordbook();
// wordbook.set(mockWordbook)
wordbook.loadWordbooks();

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
setTimeout(() => {
    chrome.storage.local.get(['enable'], function(app) {
        window.console.log(`Reckue language app: Reach join point with app.enable=${app.enable}`);
        if (app.enable) {
            window.console.log(`Reckue language app: isServerSideParsingEnable=${IS_SERVER_SIDE_PARSING_ENABLE}`);
            if (IS_SERVER_SIDE_PARSING_ENABLE) {
                const htmlAfterParsing = prepareAndSendRequestToServerSideParser("userId", "collectionId");
                updateDom(htmlAfterParsing);
            } else {
                const parser = new Parser();
                const textNodesList = parser.parsePage();
                const parsedTextNodesList = parser.textParsing(textNodesList);
                // Возможность выгрузить текущий wordbook в файл.
                // saveFile(mapToString(wordbook));
                const builder = new DOMBuilder({sl: "en", tl: "ru"});
                builder.rebuildPage(parsedTextNodesList);
            }
        }
    });
}, 100);