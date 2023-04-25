const startButton = document.getElementById("start-button");
const gameContainer = document.getElementById("game-container");

startButton.addEventListener("click", startGame);

function startGame() {
    const low = parseInt(document.getElementById("low-input").value);
    const high = parseInt(document.getElementById("high-input").value);

    if (isNaN(low) || isNaN(high) || low >= high) {
        alert("Invalid range.");
        return;
    }

    startButton.style.display = "none";
    gameContainer.style.display = "block";
    playGame(low, high);
}

function playGame(low, high) {
    const secretNumber = Math.floor(Math.random() * (high - low + 1)) + low;
    let guessCount = 0;

    const guessInput = document.createElement("input");
    guessInput.type = "number";
    guessInput.id = "guess-input";
    guessInput.placeholder = "Enter your guess";
    gameContainer.appendChild(guessInput);

    const guessButton = document.createElement("button");
    guessButton.id = "guess-button";
    guessButton.textContent = "Guess";
    gameContainer.appendChild(guessButton);

    const messageParagraph = document.createElement("p");
    gameContainer.appendChild(messageParagraph);

    guessButton.addEventListener("click", makeGuess);

    function makeGuess() {
        const guess = parseInt(guessInput.value);

        if (isNaN(guess)) {
            messageParagraph.textContent = "Invalid guess.";
        } else if (guess < low || guess > high) {
            messageParagraph.textContent = `Please enter a number between ${low} and ${high}.`;
        } else {
            guessCount++;

            if (guess === secretNumber) {
                messageParagraph.textContent = `You guessed the number in ${guessCount} tries!`;
                guessInput.disabled = true;
                guessButton.disabled = true;
            } else if (guess < secretNumber) {
                messageParagraph.textContent = "Too low. Guess again.";
            } else {
                messageParagraph.textContent = "Too high. Guess again.";
            }
        }

        guessInput.value = "";
    }
}