var express = require("express");
//var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient
var app = express();
var path = require("path");
require("/db/conn");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.set('view engine', 'pug')

// app.use("/", function(req, res, next)
// {
//     console.log(req.url);
//     next();
// })

app.use(express.static(path.join(__dirname)));

app.get("/", function (req, res) {

  res
    .status(200)
    .sendFile(path.join(__dirname, "index.html"));
});


// var connection = mysql.createConnection({
//     host: 'localhost',
//     //host: '127.0.0.1',
//     user: 'root',
//     port: "3307",
//     password: '',
//     database: 'boot',

//   });
MongoClient.connect('mongodb://localhost:27017/boot', function (err, db) {
  if (err) throw err

  console.log(result)
  console.log('Connected.........')
})

// connection.connect(function (err) {
//   if (err) throw err;

//   console.log('Connected.........')
// })

//console.log(req.body);
  //var sql = "insert into user values('" + req.body.name + "', '" + req.body.password + "', " + req.body.mob +")"
  //db.collection('mammals').find().toArray(function (err, result) {


app.post('/submit', function (req, res) {
  
  db.user.insert({"name":"arun","password":"qwert"})
    if (err) throw err

    res.render('index', {
      title: 'Data saved',
      message: 'Data saved successfully'
    })
  })



app.listen(3000, function () {
  console.log("Listening at 3000")
})