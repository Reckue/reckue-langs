let parents = [];

chrome.storage.sync.get(['enable', 'collectionId'], function(app) {
    if (app.enable) {
        getWordbook('string').then(wordbook => processing('p', wordbook));
    }
});

const processing = (type, wordbook) => {
    const tagList = getEntryTagsList(window.document.getElementsByTagName(type));
    getParentsParagraphs().then(paragraphs => {
        parseParents(paragraphs, wordbook)
    });
    const filteredTagsList = filter(tagList);
    const paragraphs = getParagraphs(filteredTagsList);
    parseEntries(paragraphs, wordbook);
};
