import express from "express";
import session from "express-session";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { findUserIdByName } from "../models/users.js";
import store from "store";


export async function weatherReport(req,res){
    // let username = req.session.username;
    // let password = req.session.password;
    res.render("weather.ejs");
}

export async function postWeatherReport(req,res){
    let username = store.get("username");
    let password = store.get("password");
    let user = await findUserIdByName(username, password);
    res.send(user);
}

