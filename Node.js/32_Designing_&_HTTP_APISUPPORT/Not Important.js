const express = require('express');
const dan = express();


dan.get("/Danish", function(req,res){
    res.send("IM HANDSOME");
})

dan.get("*", function(req,res){
    res.send("TEST");
})

dan.listen(3000, function(){
    console.log("SERVER IS ON")
})