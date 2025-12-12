const music = document.getElementById("music");
const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");

let playCount = 0;
let maxPlays = 2;

startBtn.addEventListener("click", () => {
    if (playCount === 0) {
        music.play();
        musicBtn.textContent = "Pause music";
    }
    alert("Treasure hunt begins 🎄");
});

music.addEventListener("ended", () => {
    playCount++;
    if (playCount < maxPlays) {
        music.currentTime = 0;
        music.play();
    } else {
        musicBtn.textContent = "Play music";
    }
});

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicBtn.textContent = "Pause music";
    } else {
        music.pause();
        musicBtn.textContent = "Play music";
    }
});
