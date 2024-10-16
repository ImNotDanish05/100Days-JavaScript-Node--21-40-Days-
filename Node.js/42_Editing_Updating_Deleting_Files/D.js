require('dotenv').config();
const express = require("express");
const software = express();
const request = require("request");
const openai = require("openai");
const axios = require('axios');
const bodyparser = require('body-parser');
const multer = require('multer'); //Buat upload file ke laptop
const path = require('path'); //Buat file manager. Multer hanya bisa upload file doang soalnya
const fs = require('fs');   
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Please, have ur own env to set up these thing. im not gonna give mine lol
const UnsplashAPI = process.env.UnsplashAPI;
const UnsplashAPIPage = process.env.UnsplashAPIPage;
const UAPISearch = process.env.UNSPLASHAPISEARCH;
const APIKEY_ItchIo = process.env.APIKEY_ItchIo;
const DB_PASSWORD = process.env.DB_Password;
const uri = `mongodb+srv://danish05:${DB_PASSWORD}@cluster0.qsh4g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&connectTimeoutMS=30000`;

software.use(express.static("public"));
software.set("view engine", ".ejs");
software.use("/data", express.static("data"));
software.use(bodyparser.urlencoded({extended: true}));

var MongoDB_ON = false;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const dir_games = path.join(__dirname, 'data', 'games');
const dir_gameprogram = path.join(dir_games, 'gameprogram');
const dir_gamethumbnail = path.join(dir_games, 'gamethumbnail');

function FileAda(x){
    if (!fs.existsSync(x)){
        fs.mkdirSync(x, {recursive: true});
    }
}

FileAda(dir_gameprogram);
FileAda(dir_gamethumbnail);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'filename') {
            cb(null, dir_gameprogram); // Simpan di folder gameprogram
        } else if (file.fieldname === 'thumbnail') {
            cb(null, dir_gamethumbnail); // Simpan di folder gamethumbnail
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

software.get("/game/edit/:id", async function (req, res){
    console.log("Route /game/edit/:id dipanggil");
    const id = req.params.id;
    await client.connect();
    await client.db('admin').command({ping: 1});
    const database = client.db("Danish05Web");
    const collection = database.collection("Game");
    const game = await collection.findOne({ _id: new ObjectId(id)});
    res.render("gameedit", {
        game: game,
        id: id
    });
})

software.post("/game/edit/:id", async function (req,res){
    var data = req.body;
    try{
    await client.connect();
    await client.db('admin').command({ping: 1});
    const database = client.db("Danish05Web");
    const collection = database.collection("Game");
    const id = req.params.id;
    const updateResult = await collection .updateOne(
        { _id: new ObjectId(id) },
        { $set: {
            title: data.title,
            creator: data.creator
        }

        }
    )
    console.log(data);
    await client.close();
    res.redirect('/game/list');
    }catch (error){
        console.log(error);
    }
});

software.get("/game/addgame", function(req,res){
    res.render("gameadd");
})

software.post("/game/addgame", 
    upload.fields([
        { name: 'filename', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 }
    ]),
    async function(req,res){
    try {
    // upload_gameprogram.single('filename');
    // upload_gamethumbnail.single('thumbnail');
    // Akses nama file untuk setiap file
    // const gameFileName = req.files['filename'][0].filename;
    // const thumbnailFileName = req.files['thumbnail'][0].filename;
    // let myVar;
    // Placing = await String(gameFileName); 
    // data.filename = gameFileName;
    // Placing = await String(thumbnailFileName); 
    // data.thumbnail = thumbnailFileName;
    // console.log(`Data Files: ${data.creator} | ${data.title} | ${data.filename} | ${data.thumbnail}`);
    FileAda(dir_gameprogram);
    FileAda(dir_gamethumbnail);
    var data = req.body;
    data.thumbnail = req.files.thumbnail[0].filename;
    data.filename = req.files.filename[0].filename;
    // data.thumbnail = String(req.files.thumbnail);
    console.log(data);
    const gameFilePath = req.file ? req.file.path : null;
    const thumbnailFilePath = req.files && req.files.thumbnail ? req.files.thumbnail.path : null;
    console.log(gameFilePath);
    console.log(thumbnailFilePath);
    await client.connect();
    await client.db("admin").command({ ping: 1});
    const database = client.db("Danish05Web");
    const collection = database.collection("Game");
    await collection.insertOne(data);
    await client.close();
    res.redirect('/game/list');}
    catch (error){
        console.log(error);
    }
})


software.get("/game/list", async function (req, res){
    
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      //   await test();
        MongoDB_SET = true;
        const database = client.db("Danish05Web");
        const collection = database.collection("Game");
        const games = await collection.find({}).toArray();
        console.log(games);
        res.render("gamelist", {games : games});
        await client.close();   
      } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log (error);
      //   await client.close();
      }
});



software.get("/game/play/:id", async function (req, res){
    try {
    const id = req.params.id;
    await client.connect();
    await client.db("admin").command({ping: 1});
    console.log(`Website game dengan id game ${id} terconnect dengan Database MongoDB!`);
    const database = client.db("Danish05Web");
    const collection = database.collection("Game");
    const game = await collection.findOne({ _id: new ObjectId(id)});
    res.render("game",{
        game : game
    })
    }
    catch (error){
        console.error(error);
        res.status(500).send("Error mencoba masuk ke game");
    } finally {
        await client.close();
    }

})

software.get("/game/*", async function (req, res){
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

software.get("/test/:id", async function(req,res){
    const id = req.params.id;
    res.render(`test/test${id}`);
})

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