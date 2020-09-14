const absolute = window.document.getElementsByClassName('translations')[0];
const translations = absolute.getElementsByClassName('scroll')[0];

const updateTranslations = () => {
    terms.innerHTML = '';
    getTerms().then(terms => {
        let counter = 0;
        terms.forEach(term => createTranslationBlock(++counter, term));
    });
};

const createTranslationBlock = (index, term) => {
  const block = configureBlock('block', translations);
  const word = configureBlock('word', block);
  const translation = configureBlock('translation', block);
  translation.style.opacity = '0';
  word.addEventListener("click", () => reverseViability(translation, block));
  configureColumn('span', index + '.', 'index', word);
  configureColumn('span', term.value, 'word', word);
  configureInput(term.value, 'translate', translation, {func: update, term});
};

const update = (event, row) => {
    row.translate = event.target.value;
    updateRow(row);
};

const reverseViability = (element, block) => {
    if (element.style.opacity === '0') {
        element.style.opacity = '1';
        element.style.height = '30px';
        element.style.transform = 'translate(40px)';
        block.style.borderBottom = '1px #ebebeb solid';
    } else {
        element.style.opacity = '0';
        element.style.height = '0';
        element.style.transform = 'translate(-40px)';
        block.style.borderBottom = '1px #ffffff solid';
    }
};

updateTranslations();
