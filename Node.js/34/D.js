require('dotenv').config();
const express = require("express");
const software = express();
const request = require("request");
const openai = require("openai");
const axios = require('axios');

const UnsplashAPI = process.env.UnsplashAPI;
const UnsplashAPIPage = process.env.UnsplashAPIPage;
const UAPISearch = process.env.UNSPLASHAPISEARCH;

software.use(express.static("public"));
software.set("view engine", ".ejs");

/*
npm install express --save
npm install ejs --save
npm install axios --save
npm install dotenv --save
*/

// software.get("/picture/:id", function(req,res){
//     const id = req.params.id;
//     if (id === "JSON"){
//         const response = axios.get(`${UnsplashAPI}`);
//         const pictureData = response.data;

//         res.render('json', { JSON: pictureData });

//     }

// })

software.get('/picture/page/:id', async (req, res) => {
    const id = req.params.id;
    const query = false;
    try {
        const response = await axios.get(`${UnsplashAPIPage}${id}`)
        const data = response.data;
        res.render('picture',{
            DataS : data,    
            id : id,
            query : query,
        })
    
    }catch (error){
        console.log(`Error /picture/page/${id}: ${error.message}`)
    }
    
});


software.get('/picture/search', async (req,res) => {
    try {
        res.render('picture_search')
    }catch (error){
        console.log("Error connecting /picture/search")
    }


});

software.get('/picture/search/:id', async (req, res) => {
    const id = req.params.id;
    const SearchTerm = req.query.SearchTerm;
    const query = true;
    try {
        const response = await axios.get(`${UAPISearch}&page=${id}&query=${SearchTerm}`)
        const data = response.data;
        res.render('picture',{
            DataS : data,    
            id : id,
            query : query,
            searchterm : SearchTerm
        })
    
    }catch (error){
        console.log(`Error /picture/page/${id}: ${error.message}`)
    }
    
});

// });
// software.get('/picture/search/:id', async (req, res) => {
//     const id = req.params.id;
//     const lang = req.params.lang;
//     try {
//         const response = await axios.get(`${UnsplashAPIPage}${id}`)
//         const data = response.data;
//         res.render('picture',{
//             Data : data,
//             lang : lang,
//             id : id
//         })
//     }catch (error){
//         console.log("Error /picture")
//     }
    
// });

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