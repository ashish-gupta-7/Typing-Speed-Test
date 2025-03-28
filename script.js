const textArray = [
    "The quick brown fox jumps over the lazy dog.",
    "JavaScript is fun to learn and powerful.",
    "Typing fast requires practice and focus.",
    "Frontend development involves HTML, CSS, and JavaScript.",
    "Coding is like solving a puzzle with logic."
];

let selectedText = "";
let startTime;
let timerInterval;

// Selecting elements
const textToType = document.getElementById("text-container");
const inputBox = document.getElementById("input-box");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

// Start Test
startBtn.addEventListener("click", () => {
    selectedText = textArray[Math.floor(Math.random() * textArray.length)];

    // Wrap each character in a span
    textContainer.innerHTML = selectedText
        .split("")
        .map(char => `<span>${char}</span>`)
        .join("");

        inputBox.value = "";
        inputBox.disabled = false;
        inputBox.focus();
                    
        startTime = new Date().getTime();
        timerDisplay.textContent = "0";
        wpmDisplay.textContent = "0";

    // Start Timer
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        timerDisplay.textContent = elapsedTime;
    }, 1000);
});

// Typing Event - Highlight Mistakes
inputBox.addEventListener("input", () => {
    const typedText = inputBox.value;
    const textSpans = textContainer.querySelectorAll("span");

    let correctCount = 0;

    textSpans.forEach((span, index) => {
        if (typedText[index] === undefined) {
            span.classList.remove("correct", "incorrect");
        } else if (typedText[index] === selectedText[index]) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
            correctCount++;
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
        }
    });

    // If typing is completed, calculate WPM
        if (typedText === selectedText) {
            clearInterval(timerInterval);
            let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
            let wordsTyped = selectedText.split(" ").length;
            let wpm = Math.round((wordsTyped / elapsedTime) * 60);
            wpmDisplay.textContent = wpm;
        }
    });



// Reset Test
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    textToType.textContent = "Loading...";
    inputBox.value = "";
    inputBox.disabled = true;
    timerDisplay.textContent = "0";
    wpmDisplay.textContent = "0";
});



// Load leaderboard from LocalStorage
function loadLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const leaderboardElement = document.getElementById("leaderboard");
            
    leaderboardElement.innerHTML = scores
        .map((score, index) => `<li>${index + 1}. ${score} WPM</li>`)
        .join("");
}


// Save new score
function saveScore(wpm) {
    let scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
        
    scores.push(wpm);
    scores.sort((a, b) => b - a); // Sort in descending order
    scores = scores.slice(0, 5);  // Keep only top 5
                        
    localStorage.setItem("leaderboard", JSON.stringify(scores));
    loadLeaderboard(); // Update leaderboard display
}


// Modify Typing Event to save WPM
inputBox.addEventListener("input", () => {
    const typedText = inputBox.value;
    const textSpans = textContainer.querySelectorAll("span");

    let correctCount = 0;

    textSpans.forEach((span, index) => {
        if (typedText[index] === undefined) {
            span.classList.remove("correct", "incorrect");
        } else if (typedText[index] === selectedText[index]) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
            correctCount++;
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
        }
    });


// If typing is completed, save WPM
    if (typedText === selectedText) {
        clearInterval(timerInterval);
        let elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        let wordsTyped = selectedText.split(" ").length;
        let wpm = Math.round((wordsTyped / elapsedTime) * 60);
        wpmDisplay.textContent = wpm;
                                                    
        saveScore(wpm); // Save to leaderboard
    }
});

// Load leaderboard on page load 
window.onload = loadLeaderboard;