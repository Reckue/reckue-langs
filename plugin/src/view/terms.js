const terms = window.document.getElementsByClassName('terms')[0];
const input = window.document.getElementById('create-term');
const filter = window.document.getElementById('filter-terms');
let store = [];

const createTermAndUpdatePopup = (event) => {
    postTerm(event.target.value).then(ignore => getAndUpdateTerms());
    event.target.value = '';
};

const filterTermsAndUpdatePopup = (event) => {
    terms.innerHTML = '';
    const filtered = store.filter(term => term.value.includes(event.target.value));
    updateTerms(filtered);
};

const getAndUpdateTerms = () => {
    terms.innerHTML = '';
    getTerms().then(terms => {
        store = terms;
        updateTerms(terms);
    });
};

const updateTerms = (terms) => {
    let counter = 0;
    terms.forEach(term => createTermRow(++counter, term, deleteTermAndUpdatePopup));
};

const createTermRow = (id, term, removeFunc) => {
    const divRow = document.createElement('div');
    configureRow(divRow, term.id);
    configureColumn('span', id, 'index', divRow);
    configureColumn('span', term.value, 'term', divRow);
    const select = configureSelect('level', divRow, term);
    configureOption(select, 'NATIVE', term.level);
    configureOption(select, 'ADVANCED', term.level);
    configureOption(select, 'KNOW_PART', term.level);
    configureOption(select, 'UNDERSTAND', term.level);
    configureOption(select, 'LEARNING', term.level);
    configureOption(select, 'FAMILIAR', term.level);
    configureOption(select, 'DONT_KNOW', term.level);
    configureOption(select, 'USELESS', term.level);
    configureOption(select, 'UNDEFINED', term.level);
    configureRemove(divRow, {id: term.id}, removeFunc);
};

const deleteTermAndUpdatePopup = (id) => deleteTerm(id).then(ignore => window.document.getElementById(id).remove());

input.addEventListener("change",event => createTermAndUpdatePopup(event));
filter.addEventListener("change",event => filterTermsAndUpdatePopup(event));
getAndUpdateTerms();
