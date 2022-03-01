//Различные моковые данные, которые не должны попадать в релиз
const PARSER_URL = "http://localhost:8080/parser";
const POST_METHOD = 'POST';

const IS_SERVER_SIDE_PARSING_ENABLE = false;

const saveFile = (data) => {
    let a = window.document.createElement("a");
    let file = new Blob([data], {
        type: 'plain/text'
    });
    a.href = URL.createObjectURL(file);
    a.download = 'file.txt';
    a.click();
}