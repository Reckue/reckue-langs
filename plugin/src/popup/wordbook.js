const wordbookBlock = window.document.getElementsByClassName('words')[0];
const addWordInput = window.document.getElementById('add');
const updateButton = window.document.getElementsByClassName('update-btn')[0];

addWordInput.addEventListener("change", function (event) {
    fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({word: event.target.value, level: 'bad'})
        }).then(response => response.json())
        .then(rows => updateWords());
    event.target.value = '';
});

updateButton.addEventListener("click", function (event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {file: 'contentScript.js'});
    });
});

const getWordbook = async () => {
    return await fetch('http://localhost:3000/').then(response => response.json());
};

const updateWords = () => {
    wordbookBlock.innerHTML = '';
    getWordbook().then(rows => {
        let counter = 0;
        for (const row of rows) {
            createWordRow(wordbookBlock, row, counter % 2);
            counter++;
        }
    });
};

const createWordRow = (wordbookBlock, row, parity) => {
    const div = document.createElement('div');
    div.style.background = parity === 0 ? '#fdfdfd' : '#f5f5f5';
    div.style.padding = '0 8px';
    const closeButton = document.createElement('button');
    closeButton.innerText = 'x';
    closeButton.addEventListener("click", function (event) {
        deleteWord(row._id);
    });
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
