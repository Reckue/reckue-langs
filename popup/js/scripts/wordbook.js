import {enumForEach} from '../enum.js';

const displayWordbook = () => {
    chrome.storage.local.get(['wordbook3'], function(app) {
        getWordbook(app.wordbook3);
        const wordbook = getWordbook();
        wordbook.forEach((level, word) => displayWord(word, level));
    });
};

const displayWord = (word, level) => {
    const wordbook = getWordbookElement();
    const row = buildRow(word, level);
    wordbook.appendChild(row);
}

const getWordbookElement = () => window.document.getElementsByClassName('words')[0];

const buildRow = (word, level) => {
    const row = create('div');
    row.textContent = word;
    configureSelect(row, level);
    return row;
};

const configureSelect = (row, level) => {
    const select = create('select');
    addClass(select,'level');
    row.appendChild(select);
    addOptions(select, level);
    return select;
};

const addOptions = (select, selected) => {
    enumForEach(Levels, (level) => {
        configureOption(select, level.name, selected);
    });
}

const configureOption = (select, value, selected) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = value;
    option.selected = selected === value;
    select.appendChild(option)
};

const configureColumn = (content, className, parent) => {
    const span = create('span');
    span.innerText = content;
    span.classList.add(className);
    parent.appendChild(span);
};

displayWordbook();