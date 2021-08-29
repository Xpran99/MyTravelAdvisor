const express = require('express')
var mysql = require('mysql')
//const bodyParser = require('body-parser')
const app = express()
const port = 3000
// app.use(express.static('css'))

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.sendFile('signup.html', { root: __dirname })
});

var connection = mysql.createConnection({
  host: 'localhost',
  //host: '127.0.0.1',
  user: 'root',
  port: "3307",
  password: '',
  database: 'boot',

});
connection.connect(function (err) {
  if (err) throw err;

  console.log('Connected.........')
})



app.post('/submit', function (req, res) {
  //console.log(req.body);
  var sql = "insert into user values('" + req.body.name + "', '" + req.body.password + "')"
  connection.query(sql, function (err) {
    if (err) throw err

    res.render('index', {
      title: 'Data saved',
      message: 'Data saved successfully'})
  })


  connection.end();
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)