const express =require("express");
const app= express();
const functions = require("./script");
//const faceRecognition = require("./face-api.min")
//const request = require("request");

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.get("/empezar", function(req, res){
    res.sendFile(__dirname+"/empezar.html")
})


app.listen(3000);