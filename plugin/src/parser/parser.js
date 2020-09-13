let parents = [];
const userId = 'hardelele';
const collectionId = 'english';

chrome.storage.sync.get(['enable', 'collectionId'], function(app) {
    if (app.enable) {
        processing(userId, collectionId);
    }
});

const processing = (userId, collectionId) => {
    const url = `http://localhost:8080/parser/?userId=${userId}&collectionId=${collectionId}`;
    config.method = 'POST';
    config.body = window.document.querySelector('body').innerHTML;
    fetch(url, config).then(resp => resp.json()).then(json => {
        createDom(json[0]);
    });
};

createDom = (html) => {
    document.querySelector('body').innerHTML = html;
}
