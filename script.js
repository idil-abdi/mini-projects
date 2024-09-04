let displayEl = document.querySelector('.counter-display');
let increaseEl = document.querySelector('.increase');
let decreaseEl = document.querySelector('.decrease');
let resetEl = document.querySelector('.reset');

let count = 0;
update()
increaseEl.addEventListener('click', () => {
    count++
    update()
})
decreaseEl.addEventListener('click', () => {
    count--
    update()
})
function update() {
    displayEl.innerHTML = count;
}
decreaseEl.addEventListener('click', () => {
    count--
    update()
})

//rock paper scissors



let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    tie: 0,
};

updateScoreElement();

  let isAutoPlaying = false;

  let intervalId;

  function autoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(function() {
        const playerMove = pickComputerMove()
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }

  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";

    if (playerMove === "scissors") {
      if (computerMove === "rock") {
        result = "You lose.";
      } else if (computerMove === "paper") {
        result = "you win.";
      } else if (computerMove === "scissors") {
        result = "Tie.";
      }
    } else if (playerMove === "paper") {
      if (computerMove === "rock") {
        result = "You win.";
      } else if (computerMove === "paper") {
        result = "Tie.";
      } else if (computerMove === "scissors") {
        result = "You lose.";
      }
    } else if (playerMove === "rock") {
      if (computerMove === "rock") {
        result = "Tie.";
      } else if (computerMove === "paper") {
        result = "You lose.";
      } else if (computerMove === "scissors") {
        result = "You win.";
      }
    }

    if (result === "You win.") {
      score.wins += 1;
    } else if (result === "You lose.") {
      score.loses += 1;
    } else if (result === "Tie.") {
      score.tie += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    updateScoreElement();

    document.querySelector(".js-result").innerHTML = result;

    document.querySelector(".js-moves").innerHTML = `You
  <img src="/img/${playerMove}-emoji.png" alt="rock" class="move-icon" />
  <img src="/img/${computerMove}-emoji.png" alt="paper" class="move-icon" />
  Computer`;
  }

  function updateScoreElement() {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.tie}`;
  }

  function pickComputerMove() {
    const randomNum = Math.random();

    let computerMove = "";

    if (randomNum >= 0 && randomNum < 1 / 3) {
      computerMove = "rock";
    } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
      computerMove = "paper";
    } else if (randomNum >= 2 / 3 && randomNum < 1) {
      computerMove = "scissors";
    }

    return computerMove;
  }