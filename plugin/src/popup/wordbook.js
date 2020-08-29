const wordbookBlock = window.document.getElementsByClassName('words')[0];
const addWordInput = window.document.getElementById('add');
const updateButton = window.document.getElementsByClassName('update-btn')[0];

addWordInput.addEventListener("change", function (event) {
    fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({word: event.target.value})
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
        console.log(rows);
        for (const row of rows) {
            createWordRow(wordbookBlock, row.word);
        }
    });
};

const createWordRow = (wordbookBlock, word) => {
    const div = document.createElement('div');
    const closeButton = document.createElement('button');
    closeButton.addEventListener("click", function (event) {
        deleteWord(word);
    });
    createElement('div', word, 'word', div);
    createElement('div', 'translate', 'translate', div);
    createElement('div', 'definition', 'definition', div);
    div.appendChild(closeButton);
    wordbookBlock.appendChild(div);
};

const createElement = (type, content, className, parent) => {
    const element = document.createElement(type);
    element.innerText = content;
    element.classList.add(className);
    parent.appendChild(element);
};

const deleteWord = (word) => {
    fetch(`http://localhost:3000/${word}`,{method: 'DELETE'}).then(ignore => updateWords());
};

updateWords();
