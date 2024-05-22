import express from "express";
import bodyParser from "body-parser";
import { postSignup } from "./controllers/signup.js";

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

app.post("/signup" , postSignup);

app.use("/static",express.static ("public"));

app.listen (port, () =>{
    console.log("server is working")
});