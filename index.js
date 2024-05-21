const express = require("express");
var bodyParser = require('body-parser');
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.set("views engine" , "ejs");
//app.set("views" , path.join(__dirname , "/views"));

app.get("/" , (req,res) => {
    res.render("index.ejs");
});

app.get("/signup" , (req,res) => {
    res.render("signup.ejs");
});

app.post("/signup" , (req,res) => {
    let username = req.body.username;
    console.log(username);
    const password = req.body.password;
    res.send("username: " + username + "password: " + password);
});

app.use("/static",express.static ("public"));

app.listen (port, () =>{
    console.log("server is working")
});