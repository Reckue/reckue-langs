const terms = window.document.getElementsByClassName('terms')[0];
const input = window.document.getElementById('create-term');

const config = {method: '', headers: {'Content-Type': 'application/json;charset=utf-8'}, body: ''};

const addTerm = (event) => {
    config.method = 'POST';
    config.body = JSON.stringify({word: event.target.value, level: 'bad'});
    fetch('http://localhost:3000/', config).then(ignore => updateTerms());
    event.target.value = '';
};

const updateTerms = () => {
    terms.innerHTML = '';
    getWordbook().then(rows => {
        let counter = 0;
        rows.forEach(row => createTermRow(++counter, row, removeTerm));
    });
};

const createTermRow = (id, row, removeTerm) => {
    const divRow = document.createElement('div');
    configureRow(divRow, row._id);
    configureColumn('span', id, 'index', divRow);
    configureColumn('span', row.word, 'term', divRow);
    const select = configureSelect('level', divRow, row);
    configureOption(select, 'good', row.level);
    configureOption(select, 'average', row.level);
    configureOption(select, 'bad', row.level);
    configureRemove(divRow, {_id: row._id}, removeTerm);
};

const removeTerm = (id) => {
    fetch(`http://localhost:3000/${id}`,{method: 'DELETE'}).then(ignore => {
        window.document.getElementById(id).remove();
    });
};

input.addEventListener("change",event => addTerm(event));

updateTerms();
