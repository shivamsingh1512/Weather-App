import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

export async function postSignup(req, res) {
  // code to handle signup
  let username = req.body.username;
  console.log(username);
  const password = req.body.password;
  const confpassword = req.body.confpassword;
  if (password === confpassword) {
    res.send("username: " + username + "password: " + password);

  }else {
    res.send("something went wrong!");
  }
  
}

// module.exports = postSignup;