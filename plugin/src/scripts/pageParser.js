/**
 * Парсим html страницу и выдаём как результат список всех
 * текстовых элементов на странице, с ссылками на эти самые элементы
 *
 * @returns {*[]} - latestNodesList (список всех текстовых элементов / это всегда конечные ноды)
 */
const parseTextNodes = () => {
    window.console.log("Reckue language app: Start offline parsing.");
    let body = window.document.querySelector('body');
    window.console.log("Reckue language app: Building latest nodes list...");
    return buildLatestNodesList(body);
}

/**
 * Принимает тэг и возвращает список всех TEXT элементов
 * (Они всегда расположены в конце дерева html документа)
 *
 * @param node - Текущий тэг
 * @returns {[]}
 */
const buildLatestNodesList = (node) => {
    const localLastNodesList = [];
    node.childNodes.forEach((childNode) => {
        if (notInteractiveElement(childNode)) {
            parseCurrentNode(localLastNodesList, childNode);
        }
    });
    return localLastNodesList;
}

/**
 * Если текущий элемент не в конце дерева, идём парсить дальше,
 * иначе пробуем добавить его в массив всех TEXT элементов
 *
 * @param localLastNodesList - список всех TEXT элементов
 * @param node - текущий элемент
 */
const parseCurrentNode = (localLastNodesList, node) => {
    if (node.hasChildNodes()) {
        parseChildNodes(localLastNodesList, node);
    } else {
        pushLastNode(localLastNodesList, node);
    }
}

/**
 * Заходим на 2 круг в buildLatestNodesList, но уже в более глубокой точке дерева,
 * получаем кусок масива TEXT элементов, который добавляем к уже имеющимуся списку всех TEXT элементов
 *
 * @param localLastNodesList
 * @param node
 */
const parseChildNodes = (localLastNodesList, node) => {
    window.console.log("Reckue language app: Processing child nodes...");
    const childLastNodesList = buildLatestNodesList(node);
    localLastNodesList.push(...childLastNodesList);
}

/**
 * Проводим все необходимые проверки и складываем ссылку на тэг
 * и его содержимое в локальный (не полный) список TEXT элементов
 *
 * @param list - локальный (не полный) список TEXT элементов
 * @param node - тэг с текстом
 */
const pushLastNode = (list, node) => {
    list.push(node);
}

//TODO:: Сделать так чтобы числа не попадали в выборку
const notNumber = (text) => isNaN(parseInt(text));

const notInteractiveElement = (node) => !isScript(node) && !isSVG(node);
const isScript = (node) => node instanceof HTMLScriptElement;
const isSVG = (node) => node instanceof SVGSVGElement;
const isComment = (node) => node instanceof Comment;

// старый скрипт парсинга
let parents = [];

const processing = (type, wordbook) => {
    const tagList = getEntryTagsList(window.document.getElementsByTagName(type));
    getParentsParagraphs().then(paragraphs => {
        parseParents(paragraphs, wordbook)
    });
    const filteredTagsList = filter(tagList);
    const paragraphs = getParagraphs(filteredTagsList);
    parseEntries(paragraphs, wordbook);
};

const chooseWordColor = (wordbook, content) => {
    content.a.style.color = 'rgb(255,0,0)';
    contains(wordbook, content.clearWord, 'good').then(good => {
        if (good) {
            content.a.style.color = 'rgb(0,0,0)';
        }
    });
    contains(wordbook, content.clearWord, 'average').then(average => {
        if (average) {
            content.a.style.color = 'rgb(0, 183, 237)';
        }
    });
    contains(wordbook, content.clearWord, 'bad').then(average => {
        if (average) {
            content.a.style.color = 'rgb(255,169,0)';
        }
    });
};

const contains = async (wordbook, word, level) => {
    return wordbook.indexOf(word.concat(` ${level}`)) !== -1;
};

const getEntryTagsList = (tagsList) => {
    const resultSet = [];
    for (const tag of tagsList) {
        const entryTags = tag.getElementsByTagName('*');
        if (entryTags.length > 0) {
            parents.push(tag);
            resultSet.push(...getEntryTagsList(entryTags));
        } else {
            resultSet.push(tag);
        }
    }
    return resultSet;
};

const filter = (tagList) => {
    return tagList.filter(tag => tag.innerText);
};

const getParentsParagraphs = async () => {
    const paragraphs = [];
    for (let parent of parents) {
        if (parent.tagName !== 'A') {
            parent.childNodes.forEach(node => {
                const value = node.nodeValue;
                if (!node.hasChildNodes() && value !== null && value !== undefined) {
                    const contentSet = value.split(/\s/)
                        .map(word => createContentSet(word))
                        .filter(set => set.word.match(/\w/));
                    const ref = node;
                    paragraphs.push({ref, contentSet});
                }
            });
        }
    }
    return paragraphs;
};

const getParagraphs = (tagList) => {
    const paragraphs = [];
    for(let tag of tagList) {
        const contentSet = tag.innerText.split(' ').map(word => createContentSet(word));
        paragraphs.push({ref: tag, contentSet});
    }
    return paragraphs;
};

const createContentSet = (word) => {
    const clearWord = word.toString().toLowerCase().replace(/[\W]/g, '');
    const notANumber = !word.match(/\d/);
    const a = document.createElement('a');
    a.innerText = word + ' ';
    a.href = `https://translate.google.com/#view=home&op=translate&sl=en&tl=ru&text=${clearWord}`;
    a.target = "_blank";
    return {word, clearWord, a, notANumber}
};

const parseParents = (paragraphs, wordbook) => {
    for (let paragraph of paragraphs) {
        for (const content of paragraph.contentSet) {
            if (content.notANumber) {
                chooseWordColor(wordbook, content);
            }
            paragraph.ref.parentElement.insertBefore(content.a, paragraph.ref);
            paragraph.ref.nodeValue = '';
        }
    }
};

const parseEntries = (paragraphs, wordbook) => {
    for (let paragraph of paragraphs) {
        paragraph.ref.innerText = '';
        for (const content of paragraph.contentSet) {
            if (content.notANumber) {
                chooseWordColor(wordbook, content);
            }
            paragraph.ref.appendChild(content.a);
        }
    }
};