const express = require("express");
const software = express();
const request = require("request");
const openai = require("openai");
const axios = require('axios');
// const openai = OpenAI();


software.use(express.static("public"));
software.set("view engine", ".ejs");

// software.set("view-engine", "ejs")

// request.get('https://www.google.com/')
// .then(response => {console.log(response.data);}
// )
// .catch(error => {console.log(error);})

// axios.get('https://www.youtube.com/')
//   .then(response => {
//     console.log(response.data); // This is where you access the response body
//   })
//   .catch(error => {
//     console.error(error);
//   });



// const completion = openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         {
//             role: "user",
//             content: "Write a haiku about recursion in programming.",
//         },
//     ],
// });

// console.log(completion.choices[0].message);


// console.log(completion.choices[0].message);


request.get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m", function(error, response, body){
    if(error){
        console.log(error.statusCode);
    }else{
        console.log("Work");
        // console.log(body);
        var data = JSON.parse(body);
        console.log(data.timezone)
        console.log("Temperature in japan: " + data.hourly.temperature_2m[1])
    }
})

// axios.get('https://www.goldapi.io/api/XAU/USD', {
//     headers: {
//         'x-access-token': 'LINK API HERE',
//         'Content-Type': 'application/json'
//     }
// })
// .then(response => {
//     console.log(response.data);
// })
// .catch(error => {
//     console.error('Error fetching data:', error);
// });

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

software.get("/instagram/:channel/", function(req,res){
    const channel = req.params.channel;
    // if (channel = "KodySimpson"){
    //     res.render("kodysimpson")
    // }
    // else{
    const videoID = [
        {ID:"C_fuiqWpr12", Title: "Minecraft Live Action"},
        {ID:"C_dlJsBpYM7", Title: "Update 1.21"},
        {ID:"C_TrWcfy6UT", Title: "STEVE IS IN DANGER!"},
        {ID:"C-5n7nAP4sm", Title: "SPONGEBOB!"}
    ]
    res.render("instagram", 
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
    console.log("The server is running Lmao")
})