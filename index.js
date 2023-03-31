
const express =require("express");
const https =require("https");
const bodyParser = require("body-parser");
const app =express();
app.listen("3500",function(req,res){
    console.log("server started");
})
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
    const query = req.body.inputname;
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=27946c3865bb963063e6554961e8ba88&units=metric"
https.get(url,function(response){
   response.on("data",function(data){
    const wheather = JSON.parse(data)
    const desc =  wheather.weather[0].description;
    const temp = wheather.main.temp;
    res.write("<h1>the temperature is currently in " + query+ " "+" "+temp+" deg celsuis</h1><br>"+"And");
    res.write("<h2>the monsoon condition in "+" "+desc+"</h2");
    res.send();
   
   })
})
 

})


