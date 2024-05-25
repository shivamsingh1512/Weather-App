import express from "express";
import session from "express-session";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";


export async function weatherReport(req,res){
    let username = req.session.username;
    let password = req.session.password;
}

export async function postWeatherReport(req,res){
    let username = req.session.username;
    let password = req.session.password;
    // let userid 
}

