var express = require("express");
var app = express();
var request = require("request")


app.get("/", function(req, res){
   res.send("This will be our landing page soon"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp has started"); 
});