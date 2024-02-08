let words;
let currentWord;
let userInput = "";
let score = 0;
let timer;
let isGameStarted = false;

// Load words from JSON file
fetch('words.json')
    .then(response => response.json())
    .then(data => {
        words = data;
        // resetGame();  // Removed from here
    })
    .catch(error => console.error('Error loading words:', error));

function generateWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function updateDisplay() {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.innerHTML = "";

    for (let i = 0; i < currentWord.length; i++) {
        const span = document.createElement("span");
        span.textContent = currentWord[i];

        if (userInput.length > i) {
            if (userInput[i] === currentWord[i]) {
                span.style.color = "#a6e3a1";
            } else {
                span.style.color = "#f38ba8";
            }
        }

        wordDisplay.appendChild(span);
    }

    document.getElementById("user-input").value = userInput;
    document.getElementById("score").textContent = `Words per minute: ${score}`;
}

function checkInput() {
    if (userInput === currentWord) {
        currentWord = generateWord();
        userInput = "";
        score++;
        updateDisplay();
    }
}

function startTimer() {
    let timeLeft = 60;

    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft < 0) {
            gameOver();
        } else {
            document.getElementById("timer").textContent = `Time left: ${timeLeft} s`;
        }
    }, 1000);
}

function gameOver() {
    clearInterval(timer);
    document.getElementById("game-over-message").textContent = `You wrote ${score} words per minute.`;
    document.getElementById("play-again-button").style.display = "block";

    // Hide game elements
    document.getElementById("word-display").style.display = "none";
    document.getElementById("user-input").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("score").style.display = "none";
}

function resetGame() {
    score = 0;
    currentWord = generateWord();
    userInput = "";
    document.getElementById("game-over-message").textContent = "";

    // Show game elements
    document.getElementById("word-display").style.display = "block";
    document.getElementById("user-input").style.display = "block";
    document.getElementById("timer").style.display = "block";
    document.getElementById("score").style.display = "block";

    updateDisplay();
    startTimer();
}

// Event listeners for input and start button
document.getElementById("user-input").addEventListener("input", () => {
    userInput = document.getElementById("user-input").value.toLowerCase();
    checkInput();
    updateDisplay();
});

document.getElementById("user-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkInput();
        updateDisplay();
    }
});

document.getElementById("start-button").addEventListener("click", () => {
    if (!isGameStarted) {
        // Hide the start button
        document.getElementById("start-button").style.display = "none";
        // Show game elements
        document.getElementById("word-display").style.display = "block";
        document.getElementById("user-input").style.display = "block";
        document.getElementById("timer").style.display = "block";
        document.getElementById("score").style.display = "block";
        // Start the game
        resetGame();
        isGameStarted = true;
    }
});

document.getElementById("play-again-button").addEventListener("click", () => {
    isGameStarted = false;
    document.getElementById("play-again-button").style.display = "none";
    // Show the start button
    document.getElementById("start-button").style.display = "none";
    resetGame();
});
