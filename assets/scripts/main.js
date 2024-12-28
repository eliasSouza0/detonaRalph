// Objeto com as informações do jogo
const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        score: 0,
        hitPosition: 0 ,
        timerId: null,
        gameVelocity: 1000,
        currentTime: 60,
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime === 0) {
        alert('Game Over o seu resultado foi: ' + state.values.score);
    }
}

function playSound() {
    let audio = new Audio("./assets/audios/hit.m4a")
    audio.play();
    audio.volume = 0.2;
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy'); // Corrigido de classList('enemy') para classList.add('enemy')
    state.values.hitPosition = randomSquare.id; // Armazena a posição do inimigo
};

function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
};

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('click', () => {
            if (square.id === state.values.hitPosition) {
                state.values.score++;
                state.view.score.textContent = state.values.score;
                state.values.hitPosition = null;
                playSound(); // Reseta a posição do inimigo após acertar
            }
        });
    });
};

function initialize() {
   
    addListenerHitBox();
    randomSquare(); // Chama a função para posicionar o primeiro inimigo
    moveEnemy(); // Chama a função para mover o inimigo periodicamente
}

initialize();
