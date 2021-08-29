var express = require('express');
//var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require("path");

const app= express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(express.static(path.join(__dirname)));

//app.use(bodyParser.json())
app.use(express.static('public'))
//app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/boot',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db=mongoose.connection;

db.on('errror',()=>console.log("Error connecting to DB...."));
db.once('open',()=>console.log("Connected to DB...."));

app.post("/submit",(req,res)=>{
    var name=req.body.name;
    var password=req.body.password;
    var mob=req.body.mob;

    var data={
        "name":name,
        "password":password,
        "mobile":mob
    }
    db.collection('user').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log(req.body);//for display
        console.log("Record inserted");
    });

    return res.redirect('signup_success.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);



console.log("********PORT :3000********");
