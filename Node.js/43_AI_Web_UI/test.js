const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.use(express.static("public"));

// Load existing messages
let messages = [];
const loadMessages = () => {
  try {
    const data = fs.readFileSync("messages.json", "utf8");
    messages = JSON.parse(data);
  } catch (error) {
    console.log("Error loading messages:", error);
  }
};
loadMessages();

// Route to render the main page
app.get("/", (req, res) => {
  res.render("index", { messages });
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for new messages from client
  socket.on("newMessage", (msg) => {
    messages.push(msg);

    // Save the new message to JSON file
    fs.writeFile("messages.json", JSON.stringify(messages, null, 2), (err) => {
      if (err) console.error("Error saving message:", err);
    });

    // Broadcast the message to all connected clients
    io.emit("updateMessages", msg);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
