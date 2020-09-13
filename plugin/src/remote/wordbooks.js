const base_url = 'http://localhost:3000/';
const config = {method: '', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: ''};

const getJson = async (url) => {
    return await fetch(url).then(response => response.json());
};

const getWordbook = async (...addition) => {
    return getJson(base_url + addition);
};

const createTerm = async (word) => {
    config.method = 'POST';
    config.body = JSON.stringify({word, level: 'bad'});
    return fetch(base_url, config).then(response => response.json());
};

const deleteTerm = async (id) => {
    return fetch(base_url + id,{method: 'DELETE'}).then(ignore => {});
};

const editTerm = (term) => {
    config.method = 'PUT';
    config.body = JSON.stringify(term);
    return fetch('http://localhost:3000/', config).then(response => response.json());
};
