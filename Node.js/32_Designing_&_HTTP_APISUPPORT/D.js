const express = require("express");
const software = express();
const request = require("request");
const openai = require("openai");
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


// request.get("https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error, response, body){
//     if(error){
//         console.log(error.statusCode);
//     }else{
//         console.log(body);
//         console.log(response.statusCode)
//     }
// })

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