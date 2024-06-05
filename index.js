import express from "express";
import session from "express-session";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import moment from "moment";
import store from "store";
import { postSignup } from "./controllers/signup.js";
import { checkUser } from "./models/users.js";
import { postWeatherReport, weatherReport } from "./controllers/weather.js";

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.set("views engine" , "ejs");
//app.set("views" , path.join(__dirname , "/views"));

app.get("/" , (req,res) => {
    if (store.get("w")==="true"){
        res.redirect("/weather");
    }else{
        res.render("index.ejs");
    }
});

app.post("/", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    var check = await checkUser(username,password);
    console.log(check);
    if (check === true) {
        // req.session.username = username;
        // req.session.password = password;
        // sessionStorage["username"] = username;
        // sessionStorage["password"] = password;
        store.set("username" , username);
        store.set("password" , password);
        res.redirect("/weather");
    }else{
        res.send("error");
    }
    
});

app.get("/signup" , (req,res) => {
    res.render("signup.ejs");
});

app.post("/signup" , postSignup);

app.get("/weather" , weatherReport);

app.post("/weather" , postWeatherReport);

app.use("/static",express.static ("public"));

app.listen (port, () =>{
    console.log("server is working")
});