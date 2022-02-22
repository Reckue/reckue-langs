//Различные моковые данные, которые не должны попадать в релиз
const PARSER_URL = "http://localhost:8080/parser";
const POST_METHOD = 'POST';

const IS_SERVER_SIDE_PARSING_ENABLE = false;

// let currentWordbook = [];
// WORDBOOK.forEach(value => {
//     currentWordbook.push(value);
//     if (currentWordbook.length > 100) {
//         wordbooksArray.push(currentWordbook);
//         currentWordbook = [];
//     }
// });

const wordbooksArray = [[]];
let counter = 0;

mockWordbook.forEach((bundle) => {
    window.console.log(counter);
    if (wordbooksArray[counter].length >= 100) {
        counter++;
    }
    if (wordbooksArray.length <= counter) {
        wordbooksArray.push([]);
    }
    wordbooksArray[counter].push(bundle);
});

window.console.log(wordbooksArray);

const wordbooksObj = {};

wordbooksArray.forEach((wordbook, index) => {
    wordbooksObj[`wordbook${index}`] = wordbook;
});

window.console.log(wordbooksObj);

chrome.storage.local.set(wordbooksObj);

const saveFile = (data) => {
    let a = window.document.createElement("a");
    let file = new Blob([data], {
        type: 'plain/text'
    });
    a.href = URL.createObjectURL(file);
    a.download = 'file.txt';
    a.click();
}