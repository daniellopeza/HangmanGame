var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    var mydb = db.db("mydb")
    var words = [
        { word: "Cloud"},
        { word: "Quantum"}
        ];
  
    mydb.collection("words").insertMany(words, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });
});

app.use(express.static(__dirname +'./index.html')); //serves the index.html


app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});

app.get('/gameWord', (req, res) => {
    console.log("hitting /gameWord route")
    res.sendfile('./public/index.html');
});

app.get('*', (req, res) => {
    console.log("hitting / route")

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var mydb = db.db("mydb")

        mydb.collection("words").findOne({}, function(err, result) {
            if (err) throw err;
            console.log('game word = ', result.word);
            db.close();
        });

    });
    res.send({})
});
