import express from "express";
import session from "express-session";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import { findUserIdByName } from "../models/users.js";
import moment from "moment";
import { createLocation, getLocations } from "../models/locations.js";
import store from "store";
import dotenv from "dotenv";
dotenv.config();

async function getWeather(location) {
    let apikey = process.env.API_KEY;
    const d = moment();
    const date = moment().format("YYYY-MM-DD");
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/${date}?key=${apikey}`);
    const weatherResult = await response.json();
    console.log(weatherResult);
    return weatherResult;
  }

export async function weatherReport(req,res){
    // let username = req.session.username;
    // let password = req.session.password;
    // const date = moment().format("YYYY-MM-DD");
    let username = store.get("username");
    let password = store.get("password");
    let userid = await findUserIdByName(username, password);
    const loc = await getLocations(userid);
    console.log(loc);
    res.render("weather.ejs",{
        locations: loc
    });
}

export async function postWeatherReport(req,res){
    let username = store.get("username");
    let password = store.get("password");
    let userid = await findUserIdByName(username, password);
    let cityname = req.body.cityname;
    createLocation(userid,cityname);
    const loc = getLocations(userid);
    let wr = getWeather(cityname);
    res.render("weather.ejs",{
        locations: loc ,
        cityname: cityname ,
        weather: wr
    });
}

