const socket = io();

const messageInput = document.getElementById("prompt");
const messagesDiv = document.getElementById("data");

// Mengirim pesan saat tombol Enter ditekan
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && messageInput.value.trim() !== "") {
    const msg = messageInput.value;
    socket.emit("newMessage", msg); // Kirim pesan ke server
    messageInput.value = ""; // Kosongkan input setelah pesan dikirim
  }
});

// Update pesan baru ke halaman tanpa refresh
socket.on("updateMessages", (msg) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = msg;
  messagesDiv.appendChild(messageElement);
});
