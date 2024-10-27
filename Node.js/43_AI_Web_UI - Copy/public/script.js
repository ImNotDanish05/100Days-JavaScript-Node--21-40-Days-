const socket = io();  // Inisialisasi Socket.IO
const form = document.getElementById('form');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', (e) => {
    e.preventDefault();  // Mencegah reload halaman
    const promptInput = document.getElementById('prompt');
    const userInput = promptInput.value;

    // Emit input ke server
    socket.emit('newMessage', { prompt: userInput });

    // Tambahkan input pengguna ke chat box
    chatBox.innerHTML += `<p>User: ${userInput}</p>`;
    promptInput.value = '';  // Kosongkan input setelah dikirim
});

// Menerima pesan baru dari server
socket.on('updateMessages', (data) => {
    chatBox.innerHTML += `<p>Pacar: ${data.response}</p>`;  // Menampilkan respons dari AI
});
