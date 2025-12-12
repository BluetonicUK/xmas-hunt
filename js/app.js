const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const startBtn = document.getElementById("startBtn");
const homeScreen = document.getElementById("homeScreen");
const clue1Screen = document.getElementById("clue1Screen");

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



/* Start button only handles navigation now */
startBtn.addEventListener("click", () => {
    homeScreen.classList.remove("active");
    clueScreen.classList.add("active");

    loadClue(0);
});


//CLUES
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
    } else {
        clueFeedback.textContent = "Not quite, try again 🎅";
    }
});


/* Play / Stop button */
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
