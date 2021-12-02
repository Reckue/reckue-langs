const base_url = 'http://localhost:8080/terms/';
const userId = 'hardelele';
const collectionId = 'english';
const config = {method: 'GET', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: ''};

const getJson = async (url) => {
    return await fetch(url).then(response => response.json());
};

const getTerms = async (...addition) => {
    return getJson(base_url + addition);
};

const postTerm = async (value) => {
    config.method = 'POST';
    config.body = JSON.stringify({value, userId, collectionId, level: 'UNDEFINED'});
    const url = base_url + 'create/';
    return fetch(url, config).then(response => response.json());
};

const editTerm = (term) => {
    config.method = 'POST';
    config.body = JSON.stringify(term);
    const url = base_url + 'edit/';
    return fetch(url, config).then(response => response.json());
};

const deleteTerm = (id) => {
    config.method = 'DELETE';
    const url = base_url + 'delete/' + id;
    return fetch(url, config).then(response => response.json());
};
