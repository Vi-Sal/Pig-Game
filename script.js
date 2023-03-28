'use strict';

// Selecting Elements
const player0El  = document.querySelector('.player--0');
const player1El  = document.querySelector('.player--1');
const score0El   = document.querySelector('#score--0');
const score1EL   = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl   = document.querySelector('.dice');
const btnRoll  = document.querySelector('.btn--roll');
const btnNew   = document.querySelector('.btn--new');
const btnHold  = document.querySelector('.btn--hold');

// Starting Conditions
let scores, currentScore, activePlayer, playing;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    // if activePlayer = 0 oy set it to 1, if not set it to 0
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

const startGame = function(){
    // scores[0] = 0;
    // scores[1] = 0;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0; // Set defualt to player ti 1
    playing = true; // All button work

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1EL.textContent = 0;
    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
}
startGame();        // Calling startGame to start the game 

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating roll dice number
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2. Display roll dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;    // .src source from HTML
        //  Example: img , ...
        
        // 3. Check for rolled 1 
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {    // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to the total score
        scores[activePlayer] += currentScore;   //-NOTE scores[0] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
        // if activePlayer = 1    -> score--1                               scores[1];
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceEl.classList.add('hidden');
            playing = false;
        }
        else {
            // 2 Check if total >= 100 player win the game , else switch player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', startGame);

