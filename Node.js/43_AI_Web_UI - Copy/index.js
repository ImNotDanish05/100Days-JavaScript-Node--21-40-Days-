const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { exec, spawnSync } = require('child_process');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');
const { count } = require('console');
const PORT = 2001;
// const fetch = require('node-fetch');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static("public"));
app.set("view engine", "ejs"); 
app.use("/data", express.static("data"));

app.post('/api/ollama', (req, res) => {
    const userInput = req.body.input;
    let child = spawnSync("wsl", [ "bash", "-l", "-c", "cargo build --release" ], {
        cwd: "C:\\Users\\Admin\\Documents\\Projects\\myserver\\backend"
      });
    exec(`wsl ollama run llama3.2 "${userInput}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }
        res.json({ response: stdout });
    });
});

const ejs_ai = 'askai'

/* ============================================== */

// Route untuk menampilkan form input
app.get(`/${ejs_ai}`, (req, res) => {
    const filePath = path.join(__dirname, 'public', 'data', 'aichat.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8'); // Read the file
        const jsonData = JSON.parse(data); // Parse the JSON string
        console.log(jsonData); // Log the data for debugging

        res.render(ejs_ai, { data: jsonData });  // Render with parsed JSON data
    } catch (error) {
        console.error('Error reading the JSON file:', error);
        res.render(ejs_ai, { data: null });  // Render without data if there's an error
    }
//     try {
//     console.log(data);
//     const data = fs.readFileSync(filePath, 'utf8');
//     const jsonData = JSON.parse(data);
//     console.log(jsonData);
//     res.render(ejs_ai);  // Render 'views/index.ejs'
//     } catch (error){
//         console.log(`Error route /${ejs_ai}: `, error );
//     }
});

const aitype = "Respon teks ini dengan personality anak perempuan SMA yang sombong dan malas menjawab, Respond teks hanya boleh 1 kalimat";
// const aitype = "(Ini teks out of character, tolong jangan respond chat out of character menggunakan (). Respon teks ini dengan personality anak perempuan SMA yang sombong dan malas menjawab, Respond teks hanya boleh 1 kalimat)";
// const aitype = "Respon teks ini dengan maksimal 1 kalimat";
// Route untuk meng-handle form submit dan mengirim POST request ke API Ollama

const folderpath = path.join(__dirname, 'public', 'data');
const filepath = path.join(folderpath, 'aichat.json');

let inputAskAI = [];

app.post(`/${ejs_ai}`, async (req, res) => {
    const userInput = req.body.prompt;  // Ambil input dari form
    console.log(`Input: ${userInput}`);
    console.log(`AIType: ${aitype}`);

    try {
        console.log('Generating text...');
        let child = spawnSync("wsl", [ "ollama", "run", "llama3.2", `\"${aitype}: '${userInput}'\"` ], {
            cwd: "D:\\Documents\\Github\\100Days\\100Days-JavaScript-Node--21-40-Days-\\Node.js\\43_AI_Web_UI"
        });
        const response = child.stdout.toString();

        // Emit ke semua klien yang terhubung
        io.emit("updateMessages", { response });  // Kirim respons ke klien

        // Simpan data ke JSON
        // [Sisa kode untuk menyimpan data ke JSON tetap ada di sini]

    } catch (error) {
        console.log(error);
        res.status(500).send("Error connecting to API");
    }
});


// app.get("*", function(req, res){
//     res.render("home");  // Fixed to render a string
// })


server.listen(PORT, function(req,res){
    console.log(`Server menyala di port ${PORT}`);
});

let connectedUser = 0;

io.on("connection", function (socket){
    connectedUser++;
    console.log("A user has joined the server: [", connectedUser, "]");

    socket.on("newMessage", (msg) => {
        inputAskAI.push(msg);
    
        // Save the new message to JSON file
        fs.writeFile(filepath, JSON.stringify(inputAskAI, null, 2), (err) => {
          if (err) console.error("Error saving message:", err);
        });
    
        // Broadcast the message to all connected clients
        io.emit("updateMessages", msg);
      });

    socket.on("disconnect", function() {
        connectedUser--;
        console.log("An user has leave the server: [", connectedUser, "]");
    })
})