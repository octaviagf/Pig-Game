"use strict";

//Selecting elements

//Acceso a los elementos del Player 0
const player0El = document.querySelector(".player--0");
const score0El = document.querySelector("#score--0");
const current0El = document.getElementById("current--0");

//Acceso a los elementos del Player 1
const player1El = document.querySelector(".player--1");
const score1El = document.getElementById("score--1");
const current1El = document.getElementById("current--1");

//Dados (imgs)
const diceEl = document.querySelector(".dice");

//Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting conditions

const init = function () {
  scores = [0, 0]; //Array de los puntos

  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling the dice

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; //Número random

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //Display the image according to the random number

    if (dice !== 1) {
      currentScore += dice; //Suma los puntos
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//For holding the score

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore; //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//Reseting the game

btnNew.addEventListener("click", init);
