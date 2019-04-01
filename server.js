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

    mydb.collection("guess").deleteMany({}, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
    });

    var guess = {guess: ["_", "_", "_", "_", "_"]}
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

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var mydb = db.db("mydb")

        // NOTE: you can res.send anywhere, depending on the data you 
        // want to send but only one res.send is allowed

        // update current guessed array
        var newvalues = {$set: {guess: req.body} };
        mydb.collection("guess").updateOne({} , newvalues, function(err, result) {
            if (err) throw err;
            console.log(result.result.nModified + " document(s) updated");
            db.close();
        });
        
        // check current guessed array state for updated change
        // mydb.collection("guess").findOne({}, function(err, result) {
        //     if (err) throw err;
        //     console.log('game guess = ', result.guess);
        //     res.send({updatedGuess: result.guess})
        //     db.close();
        // });

    });


});

app.get('/getGuess', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var mydb = db.db("mydb")

        mydb.collection("guess").findOne({}, function(err, result) {
            if (err) throw err;
            console.log('game guess = ', result.guess);
            res.send({guess: result.guess})
            db.close();
        });

    });
})

app.get('*', (req, res) => {
    // Query for the word to be used in Hangman game
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var mydb = db.db("mydb")

        mydb.collection("words").findOne({}, function(err, result) {
            if (err) throw err;
            console.log('game word = ', result.word);
            res.send("result.word")
            db.close();
        });

        // mydb.collection("guess").findOne({}, function(err, result) {
        //     if (err) throw err;
        //     console.log('game guess = ', result.guess);
        //     db.close();
        // });

    });

});
