const express = require("express");
const software = express();


software.get("/", function(req,res){
    res.render("web.ejs");
})

software.listen(2000, function(){
    console.log("The server is running Lma")
})