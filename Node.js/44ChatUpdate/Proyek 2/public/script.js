const socket = io();
const form = document.getElementById('inputForm');
const userInputDisplay = document.getElementById('userInputDisplay');
const responseDisplay = document.getElementById('responseDisplay');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('userInput').value;
  socket.emit('userInput', userInput);
});

// Memperbarui data pada tampilan ketika JSON di-update
socket.on('updateData', (data) => {
  userInputDisplay.textContent = data.userInput;
  responseDisplay.textContent = data.response;
});
