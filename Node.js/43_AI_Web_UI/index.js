const express = require('express');
const app = express();
const { exec } = require('child_process');  // untuk menjalankan command di WSL
// const llamaProcess = spawn('ollama', ['run', 'llama3.2']);

app.use(express.static("public"));
app.set("view engine", ".ejs");  // Fixed typo here
app.use("/data", express.static("data"));

app.get('/askai', async function(req,res){
    res.render("askai");
})

app.use(express.json());

app.post('/ask-ai', (req, res) => {
    const userInput = req.body.input;

    // Jalankan perintah untuk Ollama Llama 3.2 di WSL
    exec(`wsl /usr/local/bin/ollama --input "${userInput}"`, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send("Error executing Llama: " + stderr);
        }
        res.send(stdout);
    });
});

app.get("*", function(req, res){
    res.render("home");  // Fixed to render a string
})

app.listen(2001, function(){
    console.log("Run LMAO");
});
