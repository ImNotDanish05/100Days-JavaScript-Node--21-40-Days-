const btn_kirim = document.querySelector("#kirim");
const input = document.querySelector("#input");
const div_display = document.querySelector(".container-pesan");

const createBubbleChat = chat => {
    const div_pesan = document.createElement("div");
    div_pesan.classList.add("pesan");
    div_pesan.innerHTML = chat;
    return div_pesan;
}

btn_kirim.addEventListener("click", function(){
    const bubbleChat = createBubbleChat(input.value);
    div_display.appendChild(bubbleChat);
    input.value = "";
});