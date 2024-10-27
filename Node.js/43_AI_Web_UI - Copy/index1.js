const express = require('express');
const app = express();
const { exec, spawn } = require('child_process');
// const fetch = require('node-fetch');


app.use(express.json());

app.post('/api/ollama', (req, res) => {
    const userInput = req.body.input;
    // exec(`wsl ollama run llama3.2 "${userInput}"`, (error, stdout, stderr) => {
    //     if (error) {
    //         return res.status(500).json({ error: stderr });
    //     }
    //     res.json({ response: stdout });
    // });
});

/*
https://stackoverflow.com/questions/71603439/how-to-execute-wsl-commands-from-a-node-process
*/

/*
let child = spawn("wsl", [ "ollama", "run", "llama3.2", "\"Hallo!\"" ], {
    cwd: "D:\\Documents\\Github\\100Days\\100Days-JavaScript-Node--21-40-Days-\\Node.js\\43_AI_Web_UI"
});

console.log(child.stdout.toString());
*/

app.use(express.static("public"));
app.set("view engine", "ejs");  // Fixed typo here
app.use("/data", express.static("data"));

const ejs_ai = 'askai'

/* ============================================== */

// Route untuk menampilkan form input
app.get(`/${ejs_ai}`, (req, res) => {
    res.render(ejs_ai);  // Render 'views/index.ejs'
    let child = spawn("wsl", [ "ollama", "run", "llama3.2", "\"Hallo!\"" ], {
        cwd: "D:\\Documents\\Github\\100Days\\100Days-JavaScript-Node--21-40-Days-\\Node.js\\43_AI_Web_UI"
    });
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
});

// Route untuk meng-handle form submit dan mengirim POST request ke API Ollama
app.post(`/${ejs_ai}`, async (req, res) => {
    const userInput = req.body.prompt;  // Ambil input dari form
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const apiResponse = await fetch('http://localhost:2001/api/ollama', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: userInput })
        });
        clearTimeout(timeoutId);
        const data = await apiResponse.json();
        console.log("API LLAMA RESPONDED");
        console.log(data);
        res.render(ejs_ai, { response: data.response, prompt: userInput });  // Tampilkan hasilnya
    } catch (error) {
        console.log(error);
        res.render(ejs_ai, { response: 'Error connecting to API', prompt: userInput });
    }
});

// app.get("*", function(req, res){
//     res.render("home");  // Fixed to render a string
// })

app.listen(2001, function(){
    console.log("Run LMAO");
});
