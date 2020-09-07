const terms = window.document.getElementsByClassName('terms')[0];
const input = window.document.getElementById('create-term');

const createTermAndUpdatePopup = (event) => {
    createTerm(event.target.value).then(ignore => updateTerms());
    event.target.value = '';
};

const updateTerms = () => {
    terms.innerHTML = '';
    getWordbook().then(rows => {
        let counter = 0;
        rows.forEach(row => createTermRow(++counter, row, deleteTermAndUpdatePopup));
    });
};

const createTermRow = (id, row, removeFunc) => {
    const divRow = document.createElement('div');
    configureRow(divRow, row._id);
    configureColumn('span', id, 'index', divRow);
    configureColumn('span', row.word, 'term', divRow);
    const select = configureSelect('level', divRow, row);
    configureOption(select, 'good', row.level);
    configureOption(select, 'average', row.level);
    configureOption(select, 'bad', row.level);
    configureRemove(divRow, {_id: row._id}, removeFunc);
};

const deleteTermAndUpdatePopup = (id) => deleteTerm(id).then(ignore => window.document.getElementById(id).remove());

input.addEventListener("change",event => createTermAndUpdatePopup(event));
updateTerms();
