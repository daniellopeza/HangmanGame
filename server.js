var express = require('express');
var cors = require('cors');
// var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
    throw err;
}
  console.log("Database created!");
  db.close();
});


var app = express();

app.use(cors());

app.listen(3306, () => {
    console.log(`Server listening on port 3306`)
});

app.get('/', (req, res) => {
    res.send('hello from server.js')
});


// const SELECT_ALL_QUERY = 'SELECT * FROM tableName';

// // takes a config object
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'daniellopez@email.arizona.edu',
//     password: 'CS346proj2',
// });

// connection.connect(err => {
    
//     if(err) {
//         console.log('Error while trying to connect')
//         console.log(err)
//         return err;
//     }
//     console.log("Connected to mySql")
// });
