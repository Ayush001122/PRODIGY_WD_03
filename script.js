const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const winningPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],   
  [0, 3, 6], [1, 4, 7], [2, 5, 8],   
  [0, 4, 8], [2, 4, 6]               
];

function updateStatus(message) {
  statusText.textContent = message;
}

function checkWinner() {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      highlightWinner(pattern);
      updateStatus(` Player ${currentPlayer} wins!`);
      gameActive = false;
      return;
    }
  }

  if (!board.includes('')) {
    updateStatus("It's a draw! ");
    gameActive = false;
  }
}

function highlightWinner(pattern) {
  pattern.forEach(index => {
    cells[index].classList.add('winner');
  });
}

function cellClicked() {
  const index = this.getAttribute('data-index');
  if (!gameActive || board[index]) return;
  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer.toLowerCase()); 

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s turn`);
  }
}

function resetGame() {
  board.fill('');
  currentPlayer = 'X';
  gameActive = true;
  updateStatus(`Player ${currentPlayer}'s turn`);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner', 'x', 'o'); 
  });
}

cells.forEach(cell => cell.addEventListener('click', cellClicked));
resetButton.addEventListener('click', resetGame);
