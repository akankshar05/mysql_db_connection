const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

function myMiddleware(req, res, next) {
}

app.use(encoder)

const connection = mysql.createConnection({
    host: "localhost",
    user: "mysql",
    password: "mysql",
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

app.post("/", myMiddleware, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

function protected(req, res, next) {
    var loggedIn = false;
    if (loggedIn) next()
    res.send('User not authorized')
}

// // when login is success
app.get("/welcome", protected, function(req,res){
    // res.sendFile(__dirname + "/welcome.html")
    res.send('protected route')
})


// set app port 

app.get('/api/data', (req, res) => {
    console.log(req);
    res.end('done')
})

app.listen(4000);