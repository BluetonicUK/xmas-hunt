/* ============================================================
   DOM REFERENCES
   ============================================================ */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const startBtn = document.getElementById("startBtn");
const homeScreen = document.getElementById("homeScreen");
const clue1Screen = document.getElementById("clue1Screen");
const clueContent = document.querySelector(".clue-content");
const clueSuccess = document.getElementById("clueSuccess");
const candyContainer = document.getElementById("candyContainer");

const audios = document.querySelectorAll("audio");
const loader = document.getElementById("loader");



/* ============================================================
   CLUE DATA
   ============================================================ */

const clues = [
    {
        title: "Clue One",
        text: "Where warmth and comfort greet the day...",
        answer: "kitchen"
    },
    {
        title: "Clue Two",
        text: "I keep things cold but never complain...",
        answer: "fridge"
    },
    {
        title: "Clue Three",
        text: "I rest beneath you when you sit and relax...",
        answer: "sofa"
    },
    {
        title: "Clue Four",
        text: "I glow at night but never burn...",
        answer: "lamp"
    },
    {
        title: "Clue Five",
        text: "I clean without moving an inch...",
        answer: "dishwasher"
    },
    {
        title: "Clue Six",
        text: "I hide surprises behind wrapping...",
        answer: "tree"
    }
];


/* ============================================================
   MUSIC PLAYLIST & AUDIO CONTROL
   ============================================================ */

const playlist = [
    "assets/music/xmas.mp3",
    "assets/music/jbells2.mp3",
    "assets/music/deck.mp3",
    "assets/music/letitsnow.mp3",
    "assets/music/wishumerryxmas.mp3",
];

let currentTrack = 0;

shuffleArray(playlist);
music.src = playlist[currentTrack];

music.addEventListener("ended", () => {
    currentTrack++;

    if (currentTrack < playlist.length) {
        music.src = playlist[currentTrack];
        music.play();
    } else {
        currentTrack = 0;
        musicBtn.textContent = "Play music";
    }
});

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.currentTime = 0;
        music.play();
        musicBtn.textContent = "Stop music";
    } else {
        music.pause();
        musicBtn.textContent = "Play music";
    }
});



/* ============================================================
   LOADER & AUDIO PRELOAD (iOS SAFE)
   ============================================================ */

let loadedCount = 0;
const totalAudios = audios.length;

let loaderTimeout = setTimeout(() => {
    loader.classList.remove("hidden");
}, 400);

function audioReady() {
    loadedCount++;
    if (loadedCount >= totalAudios) {
        clearTimeout(loaderTimeout);
        loader.classList.add("hidden");
    }
}

audios.forEach(audio => {
    if (audio.readyState >= 2) {
        audioReady();
    } else {
        audio.addEventListener("canplay", audioReady, { once: true });
        audio.addEventListener("error", audioReady, { once: true });
    }
});

setTimeout(() => {
    clearTimeout(loaderTimeout);
    loader.classList.add("hidden");
}, 3000);


/* ============================================================
   SCREEN NAVIGATION
   ============================================================ */

startBtn.addEventListener("click", () => {
    homeScreen.classList.remove("active");
    clueScreen.classList.add("active");
    loadClue(0);
});


/* ============================================================
   CLUE LOGIC & PROGRESSION
   ============================================================ */

let currentClue = 0;

function loadClue(index) {
    const clue = clues[index];
    clueTitle.textContent = clue.title;
    clueText.textContent = clue.text;
    clueInput.value = "";
    clueFeedback.textContent = "";
}

submitClue.addEventListener("click", () => {
    const userAnswer = clueInput.value.trim().toLowerCase();
    const correctAnswer = clues[currentClue].answer;

    if (userAnswer === correctAnswer) {
        triggerCandyShower();

        clueFeedback.textContent = "";
        clueSuccess.textContent = "Correct! 🎄";
        clueSuccess.style.opacity = "1";
        clueContent.classList.add("success");

        setTimeout(() => {
            clueContent.classList.remove("success");
            clueSuccess.style.opacity = "0";

            currentClue++;

            if (currentClue < clues.length) {
                loadClue(currentClue);
            } else {
                clueTitle.textContent = "🎄 Well done!";
                clueText.textContent = "You’ve completed the Christmas treasure hunt.";
                clueInput.style.display = "none";
                submitClue.style.display = "none";
                clueFeedback.textContent = "";
            }
        }, 3000);
    } else {
        clueFeedback.textContent = "Not quite, try again 🎅";
        clueSuccess.style.opacity = "0";
    }
});


/* ============================================================
   VISUAL EFFECTS – CANDY / PRESENT SHOWER
   ============================================================ */

function triggerCandyShower() {
    const itemCount = 100;
    const types = ["cane", "present"];

    for (let i = 0; i < itemCount; i++) {
        const item = document.createElement("div");
        item.classList.add("candy");

        const type = types[Math.floor(Math.random() * types.length)];
        item.classList.add(type);

        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = (2.2 + Math.random() * 1.2) + "s";
        item.style.animationDelay = (Math.random() * 0.3) + "s";

        const spinDirection = Math.random() < 0.5 ? -1 : 1;
        const spinAmount = 180 + Math.random() * 540;
        item.style.setProperty("--spin", spinDirection * spinAmount + "deg");

        item.style.transform = `rotate(${Math.random() * 360}deg)`;

        candyContainer.appendChild(item);
        item.offsetHeight; // Force animation start on iOS

        item.addEventListener("animationend", () => item.remove());
        setTimeout(() => item.remove(), 5000); // iOS failsafe
    }
}


/* ============================================================
   UTILITIES
   ============================================================ */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
