const termsDiv = window.document.getElementsByClassName('terms')[0];
const input = window.document.getElementById('create-term');
const filter = window.document.getElementById('filter-terms');
const loadBtn = window.document.getElementById('load-more');
const defaultFilters = {limit: 100, offset: 0};
let counter = 0;
let store = [];

const createTermAndUpdatePopup = (event) => {
    postTerm(event.target.value).then(ignore => getAndUpdateTerms(defaultFilters, "", true));
    event.target.value = '';
};

const filterTermsAndUpdatePopup = (event) => {
    store = [];
    getAndUpdateTerms(defaultFilters, event.target.value, true);
};

const getAndUpdateTerms = (filters, example, needClear) => {
    const url = `user/${userId}?collectionId=${collectionId}`;
    const urlWithFilters = url + `&limit=${filters.limit}` + `&offset=${filters.offset}`;
    const fullUrl = urlWithFilters + `&example=${example}`;
    getTerms(fullUrl).then(terms => {
        store.push(...terms);
        updateTerms(terms, needClear);
    });
};

const updateTerms = (terms, needClear) => {
    needClear && (termsDiv.innerHTML = '');
    needClear && (counter = 0);
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

const loadMore = () => {
    const counter = store.length;
    const filters = {limit: counter + 100, offset: counter};
    getAndUpdateTerms(filters, "")
};

input.addEventListener("change",event => createTermAndUpdatePopup(event));
filter.addEventListener("change",event => filterTermsAndUpdatePopup(event));
loadBtn.addEventListener('click', ignore => loadMore());
getAndUpdateTerms(defaultFilters, "", true);
