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
const textToType = document.getElementById("text-to-type");
const inputBox = document.getElementById("input-box");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

// Start Test
startBtn.addEventListener("click", () => {
    selectedText = textArray[Math.floor(Math.random() * textArray.length)];
    textToType.textContent = selectedText;
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

// Typing Event
inputBox.addEventListener("input", () => {
    const typedText = inputBox.value;

    // Check if completed
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
