const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click", () => {
    if (!playing) {
        music.play();
        musicBtn.textContent = "Pause music";
    } else {
        music.pause();
        musicBtn.textContent = "Play music";
    }
    playing = !playing;
});

document.getElementById("startBtn").addEventListener("click", () => {
    alert("Treasure hunt begins 🎄");
});
