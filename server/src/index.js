const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser());

const wordbook = [];

app.get('/', (request, response) => {
    response.send(wordbook);
});

app.delete('/:word', (request, response) => {
    let word = request.params.word;
    const index = wordbook.indexOf(word);
    wordbook.splice(index);
    response.send(wordbook);
});

app.post('/', (request, response) => {
    let word = request.body.word;
    if (typeof word !== "string") {
        word = word.toString();
    }
    word = word.toLowerCase();
    if (wordbook.indexOf(word) === -1) {
        wordbook.push(word);
    }
    response.send(wordbook);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
