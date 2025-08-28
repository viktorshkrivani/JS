let timer = null;
let timerStarted = false;
let secondsCount = 0;
let currentPlayer = '';
let mode = 'player';
let gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
let gameOver = false;

let timerSpan, timerButton, winnerSpan, turnDisplay, timePlayedSpan;
let playAgainBtn, startBtn;

function startTimer() {
  timer = setInterval(() => {
    secondsCount++;
    timerSpan.innerHTML = secondsCount;
  }, 1000);
  timerStarted = true;
  timerButton.innerHTML = "Stop Timer";
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
  timerStarted = false;
  timerSpan.innerHTML = 0;
  secondsCount = 0;
  timerButton.innerHTML = "Start Timer";
}

function handleTimerButton() {
  timerStarted ? stopTimer() : startTimer();
}

function setImage(row, col, player) {
  const cell = document.querySelector(`#td_${row}_${col} img`);
  cell.src = player === 'X' ? 'images/R.png' : 'images/R (1).png';
}

function handleCellClick(evt) {
  if (gameOver) return;

  const id = evt.target.closest('td').id;
  const [_, row, col] = id.split('_').map(Number);
  if (gameBoard[row][col] !== '') return;

  gameBoard[row][col] = currentPlayer;
  setImage(row, col, currentPlayer);

  if (checkWin()) {
    winnerSpan.innerText = `${currentPlayer} wins!`;
    timePlayedSpan.innerText = `Game time: ${secondsCount} seconds`;
    gameOver = true;
    playAgainBtn.disabled = false;
    stopTimer();
    return;
  }

  if (isTie()) {
    winnerSpan.innerText = "It's a tie!";
    timePlayedSpan.innerText = `Game time: ${secondsCount} seconds`;
    gameOver = true;
    playAgainBtn.disabled = false;
    stopTimer();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnDisplay.innerText = `It is ${currentPlayer}'s turn.`;

  if (mode === 'computer' && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  const emptyCells = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (gameBoard[r][c] === '') emptyCells.push([r, c]);
    }
  }

  if (emptyCells.length === 0) return;

  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  gameBoard[row][col] = 'O';
  setImage(row, col, 'O');

  if (checkWin()) {
    winnerSpan.innerText = "O wins!";
    timePlayedSpan.innerText = `Game time: ${secondsCount} seconds`;
    gameOver = true;
    playAgainBtn.disabled = false;
    stopTimer();
    return;
  }

  if (isTie()) {
    winnerSpan.innerText = "It's a tie!";
    timePlayedSpan.innerText = `Game time: ${secondsCount} seconds`;
    gameOver = true;
    playAgainBtn.disabled = false;
    stopTimer();
    return;
  }

  currentPlayer = 'X';
  turnDisplay.innerText = "It is X's turn.";
}

function checkWin() {
  const winCombos = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]],
  ];
  return winCombos.some(([a, b, c]) => {
    return (
      gameBoard[a[0]][a[1]] &&
      gameBoard[a[0]][a[1]] === gameBoard[b[0]][b[1]] &&
      gameBoard[a[0]][a[1]] === gameBoard[c[0]][c[1]]
    );
  });
}

function isTie() {
  return gameBoard.flat().every(cell => cell !== '');
}

function resetGame() {
  gameBoard = [['', '', ''], ['', '', ''], ['', '', '']];
  gameOver = false;
  currentPlayer = Math.random() < 0.5 ? 'X' : 'O';

  turnDisplay.innerText = `It is ${currentPlayer}'s turn.`;
  winnerSpan.innerText = "No winner yet";
  timePlayedSpan.innerText = "";
  playAgainBtn.disabled = true;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      document.querySelector(`#td_${r}_${c} img`).src = '';
    }
  }

  stopTimer();
  startTimer();

  if (mode === 'computer' && currentPlayer === 'O') {
    setTimeout(computerMove, 10);
  }
}

function start() {
  timerSpan = document.querySelector('#timer_span');
  timerButton = document.querySelector('#btn_timer');
  winnerSpan = document.querySelector('#winner_span');
  timePlayedSpan = document.querySelector('#time_played_span');
  turnDisplay = document.querySelector('#turn-display');
  playAgainBtn = document.querySelector('#playagain_btn');
  startBtn = document.querySelector('#start_btn');

  document.querySelectorAll('td').forEach(cell =>
    cell.addEventListener('click', handleCellClick)
  );

  timerButton.addEventListener('click', handleTimerButton);
  document.querySelector('#btn_winner').addEventListener('click', () => {
    if (!gameOver && checkWin()) {
      winnerSpan.innerText = `${currentPlayer} wins!`;
      timePlayedSpan.innerText = `Game time: ${secondsCount} seconds`;
      gameOver = true;
      playAgainBtn.disabled = false;
      stopTimer();
    }
  });

  playAgainBtn.addEventListener('click', resetGame);
  startBtn.addEventListener('click', resetGame);

  document.querySelectorAll("input[name='mode']").forEach(radio =>
    radio.addEventListener('change', (e) => {
      mode = e.target.value;
      resetGame();
    })
  );

  resetGame();
}

window.addEventListener('load', start);
