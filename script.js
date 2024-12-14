// script.js
const gameBoard = document.getElementById('gameBoard');
const statusMessage = document.getElementById('statusMessage');
const newGameBtn = document.getElementById('newGameBtn');

let board = Array(9).fill(null); // Store the board state
let currentPlayer = 'Adarsh'; // Start with Adarsh (X)
let currentSymbol = 'X'; // Symbol associated with the player
let gameActive = true; // Track game state

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board
function initializeBoard() {
  gameBoard.innerHTML = '';
  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = 'Adarsh';
  currentSymbol = 'X';
  statusMessage.textContent = "Adarsh's Turn (X)";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (board[index] || !gameActive) return;

  // Mark the cell
  board[index] = currentSymbol;
  cell.textContent = currentSymbol;

  // Check for win or draw
  if (checkWin()) {
    statusMessage.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    statusMessage.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  // Switch player
  if (currentPlayer === 'Adarsh') {
    currentPlayer = 'Sahil';
    currentSymbol = 'O';
  } else {
    currentPlayer = 'Adarsh';
    currentSymbol = 'X';
  }
  statusMessage.textContent = `${currentPlayer}'s Turn (${currentSymbol})`;
}

// Check for win
function checkWin() {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === currentSymbol)
  );
}

// Reset game
newGameBtn.addEventListener('click', initializeBoard);

// Initialize game on page load
initializeBoard();