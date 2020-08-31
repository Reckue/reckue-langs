const resultHeader = window.document.getElementsByClassName('result-header')[0];
const instantlyCreateButton = document.createElement('button');
instantlyCreateButton.className = 'instantly-create-button';
instantlyCreateButton.innerText = 'Add to wordbook';
instantlyCreateButton.addEventListener("click", () => collectDataAndAddWord());
resultHeader.appendChild(instantlyCreateButton);

const addWord = (word, translate, definition) => {
    const config = {method: '', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: ''};
    config.method = 'POST';
    config.body = JSON.stringify({word, translate, definition, level: 'bad'});
    fetch('http://localhost:3000/', config).then(ignore => updateWords());
    event.target.value = '';
};


const collectDataAndAddWord = () => {
    const word = window.document.getElementById('source').value;
    const translate = window.document.getElementsByClassName('tlid-translation translation')[0].innerText;
    const definition = window.document.getElementsByClassName('gt-def-row')[0].firstChild.nodeValue;
    addWord(word, translate, definition);
};
