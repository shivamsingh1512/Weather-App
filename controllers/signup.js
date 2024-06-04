import express from "express";
import bodyParser from "body-parser";
import { createuser } from "../models/users.js";
import store from "store";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

export async function postSignup(req, res) {
  // code to handle signup
  let username = req.body.username;
  console.log(username);
  const password = req.body.password;
  const confpassword = req.body.confpassword;
  if (username !== "" || password !== ""){
    if (password === confpassword) {
      createuser (username , password);
      store.set("username" , username);
      store.set("password" , password);
      res.redirect("/weather");
    }else {
      res.send("something went wrong!");
    }
  }else {
    res.render("signup.ejs");
  }
  
  
}

// module.exports = postSignup;