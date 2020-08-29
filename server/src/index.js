const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser());
let db;

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) {
        return console.log(err);
    }
    db = client.db("language");
    app.listen(port, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }
        console.log(`server is listening on ${port}`)
    });
});

const wordbook = [];

app.get('/', (request, response) => {
    db.collection('wordbook').find({}).toArray((err, wordbook) => {
        if (err) {
            response.send(err);
        }
        response.send(JSON.stringify(wordbook.map(row => {
            row._id = undefined;
            return row;
        })));
    });
});

app.get('/string/', (request, response) => {
    db.collection('wordbook').find({}).toArray((err, wordbook) => {
        if (err) {
            response.send(err);
        }
        response.send(JSON.stringify(wordbook.map(row => row.word)));
    });
});

app.delete('/:word', (request, response) => {
    let row = request.params;
    row.word.toLowerCase();
    db.collection('wordbook').deleteOne(row, (err, wordbook) => {
        if (err) {
            response.send(err);
        }
        response.send(JSON.stringify(wordbook.ops));
    });
});

app.post('/', (request, response) => {
    let row = request.body;
    row.word = row.word.toLowerCase();
    db.collection('wordbook').insert(row, (err, wordbook) => {
        if (err) {
            response.send(err);
        }
        response.send(JSON.stringify(wordbook.ops));
    });
});
