const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.querySelector('#score-0');
const score1El = document.getElementById('score-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');

const diceEl1 = document.querySelector('.dice1');
const diceEl2 = document.querySelector('.dice2');

const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl1.classList.add('hidden');
    diceEl2.classList.add('hidden');
    player0El.classList.remove('player-winner');
    player1El.classList.remove('player-winner');
    player0El.classList.add('player-active');
    player1El.classList.remove('player-active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player-active');
    player1El.classList.toggle('player-active');
};

btnRoll.addEventListener('click', function () {
    if (playing) {

        const dice1 = Math.trunc(Math.random() * 6) + 1;
        const dice2 = Math.trunc(Math.random() * 6) + 1;

        diceEl1.classList.remove('hidden');
        diceEl2.classList.remove('hidden');
        diceEl1.src = `images/dice-${dice1}.png`
        diceEl2.src = `images/dice-${dice2}.png`

        if (dice1 !== dice2) {
            currentScore += dice1;
            currentScore += dice2;
            document.getElementById(`current-${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false;

            diceEl1.classList.add('hidden');
            diceEl2.classList.add('hidden');

            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);