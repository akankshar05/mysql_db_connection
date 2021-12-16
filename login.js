const mysql = require("mysql");
const express = require("express");
var path = require('path')
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("assests",express.static("assests"));

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
    
    var sql = "select * from credentials where user_name ='"+username+"'  and user_pass ='"+password+"'";

    
    // var sql = "inesrt into credentials values ?";
    console.log(sql);
         
    connection.query(sql,[username,password],function(error,results,fields){
        if (results.length > 0) {
            console.log("old user");    
            console.log(sql);
            console.log(results);
            console.log(results.length);
            res.redirect("/welcome");
            // console.log("new user");
        } else {
            res.redirect("/wrong_pswd");
            
            // var newsql="insert into credentials values('null','"+username+"','"+password+"')"
            // var newsql="insert into credentials values( null,' "+username+"','"+password+"')"
            // console.log("new user");
            // console.log(newsql);

            // connection.query(newsql,[username, password], function(err){
            //     if (err) throw err
            // })
            // res.redirect("/welcome")
        }
        res.end();
    })
})

// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})
app.get("/wrong_pswd",function(req,res){
    res.sendFile(__dirname + "/wrong_pswd.html")
})


// set app port 
app.listen(4000);