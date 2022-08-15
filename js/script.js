'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;
diceEl.classList.add('hidden');

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        //1. generating a randowm dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        //2. Display Dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./img/dice-${dice}.png`;
        //3. Check for rolled 1. If true, switch player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        //1. add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        //if player score is >=100 , then finish the game
        if (scores[activePlayer] >= 30) {
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});