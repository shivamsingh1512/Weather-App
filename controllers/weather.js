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

class Weathers{
    constructor(city , temperature){
        this.city = city ;
        this.temperature = temperature;
    }
}

async function getWeather(location) {
    let apikey = process.env.API_KEY;
    const d = moment();
    const date = moment().format("YYYY-MM-DD");
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}/${date}?key=${apikey}`);
    const weatherResult = await response.json();
    // console.log(weatherResult);
    return weatherResult;
  }

   function toCelcius(f){
    let c = (f - 32) * 5/9;
    return c;
  }

  async function getTemps(data){
    let cc = JSON.parse(data);
    // console.log(cc.days);
    let days = cc.days[0].temp;
    let c = toCelcius(days);
    return c;
  }

  async function getCards(data) {
    // console.log(data);
    //try {
      let cc = JSON.parse(data);
      console.log(cc.days);
      let obj = {
        windspeed: cc.days[0].windspeed,
        humidity: cc.days[0].humidity,
        pressure: cc.days[0].pressure,
      };
      console.log(obj);
      return obj;
    //} catch (error) {
    //   console.error("Error parsing card data:", error);
    //   return null; // Or set a default value
    // }
  }

export async function weatherReport(req,res){
    // let username = req.session.username;
    // let password = req.session.password;
    // const date = moment().format("YYYY-MM-DD");
    
   
    try {
        let username = store.get("username");
        let password = store.get("password");
        // console.log(username);
        // console.log(password);
        let userid = await findUserIdByName(username, password);
        const loc = await getLocations(userid);
        console.log(loc[loc.length-1].city);
        let temp = [];
        // console.log(loc);
        let vv = await getWeather(loc[loc.length-1].city);
        let cards = await getCards(JSON.stringify(vv));
        console.log(cards);
        for (var i = 0;i<loc.length;i++ ){
            let tt = await getWeather(loc[i].city);
            let temp2 = new Weathers(loc[i].city, await getTemps(JSON.stringify(tt)));
            // console.log(temp2);
            temp.push(temp2);
        }
        console.log(temp);
        
        res.render("weather.ejs",{
            locations: temp ,
            cards : cards
        });
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

export async function postWeatherReport(req,res){
  let username = store.get("username");
  let password = store.get("password");
  let userid = await findUserIdByName(username, password);
  let cityname = req.body.cityname;
  await createLocation(userid,cityname);
  const loc = await getLocations(userid);
  console.log(loc[loc.length-1].city);
  let temp = [];
  let vv = await getWeather(loc[loc.length-1].city);
  let cards = await getCards(JSON.stringify(vv));
  console.log(cards);
  for (var i = 0;i<loc.length;i++ ){
      let tt = await getWeather(loc[i].city);
      let temp2 = new Weathers(loc[i].city, await getTemps(JSON.stringify(tt)));
      temp.push(temp2);
  }
  console.log(temp);
  
  // res.render("weather.ejs",{
  //     locations: temp ,
  //     cards : cards
  // });
  res.redirect("/weather");
}

