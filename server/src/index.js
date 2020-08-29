const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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
        response.send(JSON.stringify(wordbook.sort((a, b) => {
            const first = getLevelIndex(a.level);
            const second = getLevelIndex(b.level);
            if (first < second) {
                return -1
            } else if (first > second) {
                return 1;
            } else {
                return 0;
            }
        })));
    });
});

const getLevelIndex = (level) => {
    if (level === 'good') {
        return 3;
    } else if (level === 'average') {
        return 2;
    } else if (level === 'bad') {
        return 1;
    } else {
        return 0;
    }
}

app.get('/string/', (request, response) => {
    db.collection('wordbook').find({}).toArray((err, wordbook) => {
        if (err) {
            response.send(err);
        }
        response.send(JSON.stringify(wordbook.map(row => row.word + ' ' + row.level)));
    });
});

app.delete('/:_id', (request, response) => {
    let row = request.params;
    row._id = new ObjectID(row._id);
    db.collection('wordbook').deleteOne(row, (err, wordbook) => {
        if (err) {
            response.send(err);
        }
        response.send(JSON.stringify(wordbook.ops));
    });
});

app.put('/', (request, response) => {
    let row = request.body;
    db.collection('wordbook').update({_id: new ObjectID(row._id)},
        {definition: row.definition, translate: row.translate, word: row.word, level: row.level},
        {upsert: true});
    response.send(JSON.stringify(row));
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
