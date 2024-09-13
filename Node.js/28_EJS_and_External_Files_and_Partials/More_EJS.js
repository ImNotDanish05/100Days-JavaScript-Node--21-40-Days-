const express = require("express");
const software = express();

software.use(express.static("public"));
software.set("view engine", ".ejs");

// software.set("view-engine", "ejs")

software.get("/youtube/:channel/", function(req,res){
    const channel = req.params.channel;
    const videoID = [
        {ID:"YExvqxUQYgE", Title: "Brave"},
        {ID:"HQrEicGeyuE", Title: "Take it"},
        {ID:"PU7oaPFZWl4", Title: "Honor"}
    ]
    res.render("youtube", 
        {
        channel : channel,
        videoID : videoID
        }
)})

software.get("/:arg1", function(req,res){
    const arg1 = req.params.arg1;
    res.render("web", {obj : arg1});
})

software.get("*", function(req,res){
    res.render("home");
})
software.listen(2000, function(){
    console.log("The server is running Lma")
})