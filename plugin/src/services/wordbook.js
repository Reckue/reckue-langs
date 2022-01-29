class Wordbook {

    length = 0;

    local = new Map();

    constructor() {
        this.loadAll();
    }

    loadAll = () => {
        const name = "wordbook" + this.length;
        this.loadFromStorage(name).then((isSuccess) => {
            window.console.log(isSuccess);
            this.length++;
            if (isSuccess) {
                this.loadAll();
            }
        });
    }

    loadFromStorage = (name) => {
        let isSuccess = false;
        const local = this.local;
        chrome.storage.sync.get([name], function(app) {
            const list = app[name];
            isSuccess = list !== undefined && list !== null && list.length > 0;
            if (isSuccess) {
                list.forEach((bundle) => {
                    local.set(bundle.word, bundle.level);
                });
            }
            return isSuccess;
        });
    }

    getWordbook = () => {
        return this.local;
    }

    saveInStorage = (list) => {
        chrome.storage.sync.set();
    }
}

const wordbook = new Map();

const getWordbook = () => {
    return wordbook;
}

const loadWordbook = (list) => {
    list.forEach((bundle) => {
        wordbook.set(bundle.word, bundle.level);
    });
}

const mapToString = (map) => {
    let str = "[";
    let index = 0;
    map.forEach((level, word) => {
        if (index % 100 === 0) {
            str += "\n [";
        }
        str += `\n  {word:"${word}", level: Levels.INTERMEDIATE.name}, `;
        index++;
        if (index % 100 === 0) {
            str += "\n ],";
        }
    });
    if (index % 100 !== 0) {
        str += "\n ]";
    }
    str += "\n]";
    return str;
}

const getWordbookName = (index) => {
    const number = Math.floor(index/100);
    return "wordbook" + number;
}

const getJson = (wordbook) => {
    let str = "";
    wordbook.forEach((level, word, index) => {
        const number = Math.floor(index/100);
        const name = "wordbook" + number;
        str += `[${word},${level}], `;
    });
    return str;
}

const getObject = (wordbook) => {
    const object = {};
    wordbook.forEach((level, word, index) => {
        const number = Math.floor(index/100);
        const name = "wordbook" + number;
        if (object[name]) {

        }
    });
    return object;
}

/**
 * Мапим Wordbook в полный лист, поделённый на 100 партиций
 * @param map - wordbook в виде мапы
 */
const mapToArray = (map) => {
    const all = [];
    let list = [];
    let index = 1;
    map.forEach((level, word) => {
        if (index % 100 === 0) {
            all.push(list);
            list = [];
        }
        list.push({word, level});
        index++;
    });
    return all;
}

const save = (list) => {
    chrome.storage.sync.set(list);
}