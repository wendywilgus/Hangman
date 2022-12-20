//variables for words and blanks
var words = ["christmas", "reindeer", "elves", "ornament", "frosty", "carols", "december", "peace", "gingerbread", "stocking", "grinch"];
var numberOfLetters = [];
var blanks = [];
var wordBlank = document.querySelector(".word-blanks");
var chosenWord = "";
var numBlanks = 0;

var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var timer;
var timerCount;
var isWin = false;
var win = document.querySelector(".win");
var loss = document.querySelector(".losses");
var winCounter = 0;
var loseCounter = 0;

function init() {
    getWins();
    getLosses();
}

function startGame() {
    isWin = false;
    timerCount = 30;
    startButton.disabled = true;
    renderBlanks();
    startTimer();
}

function checkWin() {
    if (chosenWord === blanks.join("")) {
        isWin = true;
    }
}

function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;
    blanks = []

    for (var i = 0; i < numBlanks; i++) {
        blanks.push("_");
    }

    wordBlank.textContent = blanks.join(" ");
}

function checkLetter(letter) {
    let letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (chosenWord[j] === letter) {
                blanks[j] = letter;
            }
        }
        wordBlank.textContent = blanks.join(" ");
    }
}

document.addEventListener("keydown", function(event) {
    if (timerCount === 0) {
        return;
    }

    let key = event.key.toLocaleLowerCase();
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

    if (alphabet.includes(key)) {
        let guess = event.key;
        checkLetter(guess)
        checkWin();
    }
});

function winGame() {
    wordBlank.textContent = "You Won! 🏆";
    winCounter++
    startButton.disabled = false;
    setWins();
}

function loseGame() {
    wordBlank.textContent = "Game Over";
    loseCounter++
    startButton.disabled = false;
    setLosses()
}

function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("winCount", winCounter);
}

function setLosses() {
    loss.textContent = loseCounter;
    localStorage.setItem("loseCount", loseCounter);
}

function getWins() {
    let storedWins = localStorage.getItem("winCount");
    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }
    win.textContent = winCounter;
}

function getLosses() {
    let storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
        loseCounter = 0;
    } else {
        loseCounter = storedLosses;
    }
    loss.textContent = loseCounter;
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
            clearInterval(timer);
            winGame();
        }
    }
    if (timerCount === 0) {
        clearInterval(timer);
        loseGame();
    }
}, 1000);
}

startButton.addEventListener("click", startGame);

init();

let resetButton = document.querySelector(".reset-button");

function resetScore() {
    winCounter = 0;
    loseCounter = 0;
    setWins();
    setLosses();
}

resetButton.addEventListener("click", resetScore);