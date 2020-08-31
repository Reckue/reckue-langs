const wordsBlock = window.document.getElementsByClassName('words')[0];
const addWordInput = window.document.getElementById('add');
const updateButton = window.document.getElementsByClassName('update-btn')[0];

const config = {method: '', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: ''};

const addWord = (event) => {
    config.method = 'POST';
    config.body = JSON.stringify({word: event.target.value, level: 'bad'});
    fetch('http://localhost:3000/', config).then(ignore => updateWords());
    event.target.value = '';
};

const callContentScript = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: 'contentScript.js'});
    });
};

addWordInput.addEventListener("change",event => addWord(event));
updateButton.addEventListener("click", () => callContentScript());

const getWordbook = async () => {
    return await fetch('http://localhost:3000/').then(response => response.json());
};

const updateWords = () => {
    wordsBlock.innerHTML = '';
    getWordbook().then(rows => {
        let counter = 0;
        rows.forEach(row => createWordRow(wordsBlock, row, counter++));
    });
};

const createWordRow = (wordbookBlock, row, counter) => {
    const div = document.createElement('div');
    div.style.background = counter % 2 === 0 ? '#fdfdfd' : '#f5f5f5';
    const closeButton = document.createElement('button');
    closeButton.className = 'delete-button';
    closeButton.innerText = 'x';
    closeButton.addEventListener("click", function (event) {
        deleteWord(row._id);
    });
    createElement('div', counter, 'number', div);
    createElement('div', row.word, 'word', div);
    createElement('input', row.translate, 'translate', div, "change", (event) => {
        row.translate = event.target.value;
        updateRow(row);
    });
    createElement('input', row.definition, 'definition', div, "change", (event) => {
        row.definition = event.target.value;
        updateRow(row);
    });
    const select = createElement('select', row.level, 'level', div, "change", (event) => {
        row.level = event.target.value;
        updateRow(row);
    });
    createOption(select, 'good', row.level);
    createOption(select, 'average', row.level);
    createOption(select, 'bad', row.level);
    div.appendChild(closeButton);
    wordbookBlock.appendChild(div);
};

const createOption = (select, value, selected) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = value;
    option.selected = selected === value;
    select.appendChild(option)
}

const updateRow = (row) => {
    fetch('http://localhost:3000/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(row)
    }).then(ignore => updateWords());
};

const createElement = (type, content, className, parent, eventType, callback) => {
    const element = document.createElement(type);
    if (content === null || content === undefined && type === 'input') {
        element.placeholder = className;
    } else if (type === 'input') {
        element.value = content;
    } else {
        element.innerText = content;
    }
    element.classList.add(className);
    element.addEventListener(eventType, callback);
    parent.appendChild(element);
    return element;
};

const deleteWord = (id) => {
    fetch(`http://localhost:3000/${id}`,{method: 'DELETE'}).then(ignore => updateWords());
};

updateWords();
