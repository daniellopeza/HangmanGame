var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Create a database named "mydb":
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;

    console.log("Database created!");
    var mydb = db.db("mydb")

    // store possible game words into db
    var words = [
        { word: "Cloud"},
        { word: "Quantum"}
        ];
    mydb.collection("words").insertMany(words, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

    var guess = {guess: ""}
    mydb.collection("guess").insertOne(guess, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

    // INSERT the current guessed in a seperate table and query for it separately
});

app.use(express.static(__dirname +'./index.html')); //serves the index.html

app.listen(4000, () => {
    console.log(`Server listening on port 4000`)
});

app.post('/enterGuess', (req, res) => {
    console.log("hitting /gameWord route")
    console.log("Recieved guess : ", req.body)
    res.send("recieved guess");
});

app.get('*', (req, res) => {
    // Query for the word to be used in Hangman game
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var mydb = db.db("mydb")

        mydb.collection("words").findOne({}, function(err, result) {
            if (err) throw err;
            console.log('game word = ', result.word);
            res.send(result.word)
            db.close();
        });

    });

});
