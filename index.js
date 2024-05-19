const express = require("express");
const app = express();

const port = 3000;

app.set("views engine" , "ejs");
//app.set("views" , path.join(__dirname , "/views"));

app.get("/" , (req,res) => {
    res.render("index.ejs");
});

app.use("/static",express.static ("public"));

app.listen (port, () =>{
    console.log("server is working")
});