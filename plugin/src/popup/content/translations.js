const absolute = window.document.getElementsByClassName('translations')[0];
const translations = absolute.getElementsByClassName('scroll')[0];

const updateTranslations = () => {
    terms.innerHTML = '';
    getWordbook().then(rows => {
        let counter = 0;
        rows.forEach(row => createTranslationBlock(++counter, row));
    });
};

const createTranslationBlock = (index, row) => {
  const block = configureBlock('block', translations);
  const word = configureBlock('word', block);
  const translation = configureBlock('translation', block);
  translation.style.opacity = '0';
  word.addEventListener("click", () => reverseViability(translation, block));
  configureColumn('span', index + '.', 'index', word);
  configureColumn('span', row.word, 'word', word);
  configureInput(row.translate, 'translate', translation, {func: update, row});
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
