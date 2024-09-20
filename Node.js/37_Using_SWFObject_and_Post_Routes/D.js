require('dotenv').config();
const express = require("express");
const software = express();
const request = require("request");
const openai = require("openai");
const axios = require('axios');
const bodyparser = require('body-parser');

const UnsplashAPI = process.env.UnsplashAPI;
const UnsplashAPIPage = process.env.UnsplashAPIPage;
const UAPISearch = process.env.UNSPLASHAPISEARCH;
const APIKEY_ItchIo = process.env.APIKEY_ItchIo;

software.use(express.static("public"));
software.set("view engine", ".ejs");
software.use("/data", express.static("data"));
software.use(bodyparser.urlencoded({extended: true}));

const games = [{
    filename: "Age_Of_War.swf",
    creator: "Armor Games",
    title: "Pertarungan Raksasa Serangan Kerajaan Kucing!",
    score: 4.5,
    thumbnail: "Age Of War.jpg"
},
{
    filename: "a-trashy-love-story-131423467.swf",
    creator: "Armor Games",
    title: "Cinta Konyol Pelukan dalam Tumpukan Sampah!",
    score: 4.0,
    thumbnail: "a-trashy-love-story-131423467.jpg"
},
{
    filename: "battlegrounds-2-765817f.swf",
    creator: "Armor Games",
    title: "Arena Super Pertarungan untuk Dompet Terbaik!",
    score: 4.7,
    thumbnail: "battlegrounds-2-765817f.jpg"
},
{
    filename: "spike-a-love-story-11388f2f2.swf",
    creator: "Armor Games",
    title: "Cinta Berduri Rintangan Manis di Taman Berduri!",
    score: 4.2,
    thumbnail: "spike-a-love-story-11388f2f2.jpg"
},
{
    filename: "block-world-11584f2f2.swf",
    creator: "Armor Games",
    title: "Dunia Blok Bangun Istana dari Dadu Raksasa!",
    score: 4.3,
    thumbnail: "block-world-11584f2f2.jpg"
},
{
    filename: "base-defense-2-1082817f.swf",
    creator: "Armor Games",
    title: "Pertahanan Super Serangan Musuh dari Planet Lain!",
    score: 4.6,
    thumbnail: "base-defense-2-1082817f.jpg"
}
];

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



software.get("/game/addgame", function(req,res){
    res.render("gameadd");
})

software.post("/game/addgame", function(req,res){
    var data = req.body;
    console.log(data);
    games.push(data);   
    res.redirect('/game/list');
})


software.get("/game/list", function (req, res){
    res.render("gamelist", {games : games})
});

software.get("/game/:gamename", function (req, res){
    const gamename = req.params.gamename;
    console.log("Requested game:", gamename); // Add this line
    
    res.render("game",{
        gamename : gamename 
    })
    if (!gameExists) {}
    })

software.get("/game/*", function (req, res){
    console.log("Yay")
})

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

software.get("/", function(req, res){
    res.render("home");
});
software.listen(2000, function(){
    console.log("The server is running Lmao")
})