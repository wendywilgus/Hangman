//variables for words and blanks
var words = ["christmas", "reindeer", "elves", "ornament", "frosty", "carols", "december", "peace", "gingerbread", "stocking", "grinch"];
var numberOfLetters = [];
var blanks = [];
var wordBlank = document.querySelector(".word-blanks");
var chosenWord = "";
var numBlanks = 0;

var timerCount;



function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    lettersInChosenWord = chosenWord.split("");
    numBlanks = lettersInChosenWord.length;

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

startButton.addEventListener("click", startGame);

init();