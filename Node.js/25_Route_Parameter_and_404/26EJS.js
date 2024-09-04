    const express = require("express");
    const software = express();

    software.get("/youtube/:channel", function(req,res){
        const channel = req.params.channel;
        res.render("youtube.ejs", {obj : channel});
    })
    software.get("/html", function(req,res){
        res.render("html.html");
    })

    software.get("/:arg1", function(req,res){
        const arg1 = req.params.arg1;
        res.render("web.ejs", {obj : arg1});
    })

    software.listen(2000, function(){
        console.log("The server is running Lma")
    })