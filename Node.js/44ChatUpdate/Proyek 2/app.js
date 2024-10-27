const express = require('express');
const http = require('http');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const JSON_FILE_PATH = path.join(__dirname, 'data', 'response.json');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get('/', (req, res) => {
  fs.readFile(JSON_FILE_PATH, (err, data) => {
    let jsonData = { userInput: '', response: '' }; // Default values
    if (!err) {
      jsonData = JSON.parse(data);
    }
    res.render('index', { userInput: jsonData.userInput, response: jsonData.response });
  });
});


// Socket.IO untuk komunikasi real-time
io.on('connection', (socket) => {
  console.log('User connected');
  
  // Memuat JSON saat pengguna baru terhubung
  fs.readFile(JSON_FILE_PATH, (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
    } else {
      socket.emit('updateData', JSON.parse(data));
    }
  });

  // Menerima input dari user dan menjalankan command WSL
  socket.on('userInput', (userInput) => {
    console.log("Socket IO detected for generating AI chat. Waiting...");
    const child = spawnSync("wsl", ["ollama", "run", "llama3.2", `"user: '${userInput}'"`], {
      cwd: "D:\\Documents\\Github\\100Days\\100Days-JavaScript-Node--21-40-Days-\\Node.js\\43_AI_Web_UI"
    });
    const response = child.stdout.toString();
    console.log(`Respond: ${response}`);
    // Menyimpan input dan response ke dalam JSON
    const data = { userInput, response };
    fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('Data saved to JSON');
        io.emit('updateData', data); // Update semua user dengan data baru
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
