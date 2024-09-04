const express = require("express");
const app = express();




app.get("/", function(req,res){

    res.send("test");
});

app.get("/love", function(req,res){
    res.send("I LOVE YOU SO MUCH <33")
})

app.get("/youtube/:channel/:video", function(req,res){
    const channel = req.params.channel;
    const video = req.params.video;
    res.send("This is video with code video: " + video + " With channel name: " + channel);
    // req.send("The Channel: " + channel)

})

app.get("*", function(req,res){
    res.send("WRONG WEBSITE STUPID!")
})



app.listen(2000, function(){
    console.log("Server is running O")
})