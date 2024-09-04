const express = require("express");
const program = express();

program.listen(2000, function(){
    console.log("Server is online!");

});

program.get("/", function(require,res){
    res.send("BRUHHH!");
});

program.get("/love", function(req, res){
    res.send("I LOVE U SO MUCH <3 <3");
});

program.get("/lmao", function(req, res){
    res.send("HAHA SO FUNNY!");
})