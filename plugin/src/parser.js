let parents = [];

chrome.storage.sync.get(['enable'], function(app) {
    if (app.enable) {
        fetch('http://localhost:3000/string/').then(response => response.json()).then(wordbook => {
            processing('p', wordbook);
        });
    }
});

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
