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
  res.send("username: " + username + "password: " + password);
}

// module.exports = postSignup;