


const mysql = require("mysql");
const express = require("express");
var path = require('path')
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("assests",express.static("assests"));
// app.use()
// app.use(express.static(path.join(__dirname, 'assets')));

const connection = mysql.createConnection({
    host: "localhost",
    user: "neemraj",
    password: "neemraj",
    database: "server"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var sql = "inesrt into credentials values ?";
    connection.query("select * from credentials where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            console.log("old user");    
            res.redirect("/welcome");
            // console.log("new user");
        } else {
            // res.redirect("/");
            console.log("new user");
            connection.query(sql,['null', username, password], function(err){
                if (err) throw err
            })
            res.redirect("/welcome")
        }
        res.end();
    })
})

// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})


// set app port 
app.listen(4000);