const boardSize = 4;
let board = [];
let score = 0;

function initializeBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = new Array(boardSize).fill(0);
  }
}

function generateRandomTile() {
  const emptyCells = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length === 0) {
    return false;
  }

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;

  return true;
}

function updateBoard() {
  const boardContainer = document.getElementById('board-container');
  boardContainer.innerHTML = '';

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const cellValue = board[i][j];
      const cell = document.createElement('div');
      cell.className = `cell value-${cellValue}`;
      cell.textContent = cellValue !== 0 ? cellValue : '';
      boardContainer.appendChild(cell);
    }
  }

  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Score: ${score}`;
}

function move(direction) {
  let moved = false;

  const originalBoard = JSON.parse(JSON.stringify(board));

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] !== 0) {
        if (direction === 'ArrowLeft') {
          moveCellLeft(i, j);
        } else if (direction === 'ArrowRight') {
          moveCellRight(i, j);
        } else if (direction === 'ArrowUp') {
          moveCellUp(i, j);
        } else if (direction === 'ArrowDown') {
          moveCellDown(i, j);
        }
      }
    }
  }

  if (!arraysEqual(originalBoard, board)) {
    generateRandomTile();
    updateBoard();
    checkGameOver();
    checkWin();
  }
}

function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function moveCellLeft(row, col) {
    let targetCol = col - 1;
    while (targetCol >= 0) {
      if (board[row][targetCol] === 0) {
        targetCol--;
      } else if (board[row][targetCol] === board[row][col]) {
        board[row][targetCol] *= 2;
        score += board[row][targetCol];
        board[row][col] = 0;
        moved = true;
        generateRandomTile();
        break;
      } else {
        break;
      }
    }
    if (targetCol !== col - 1) {
      board[row][targetCol + 1] = board[row][col];
      board[row][col] = 0;
      moved = true;
    }
  }
  
  function moveCellRight(row, col) {
    let targetCol = col + 1;
    while (targetCol < boardSize) {
      if (board[row][targetCol] === 0) {
        targetCol++;
      } else if (board[row][targetCol] === board[row][col]) {
        board[row][targetCol] *= 2;
        score += board[row][targetCol];
        board[row][col] = 0;
        moved = true;
        generateRandomTile();
        break;
      } else {
        break;
      }
    }
    if (targetCol !== col + 1) {
      board[row][targetCol - 1] = board[row][col];
      board[row][col] = 0;
      moved = true;
    }
  }
  
  function moveCellUp(row, col) {
    let targetRow = row - 1;
    while (targetRow >= 0) {
      if (board[targetRow][col] === 0) {
        targetRow--;
      } else if (board[targetRow][col] === board[row][col]) {
        board[targetRow][col] *= 2;
        score += board[targetRow][col];
        board[row][col] = 0;
        moved = true;
        generateRandomTile();
        break;
      } else {
        break;
      }
    }
    if (targetRow !== row - 1) {
      board[targetRow + 1][col] = board[row][col];
      board[row][col] = 0;
      moved = true;
    }
  }
  
  function moveCellDown(row, col) {
    let targetRow = row + 1;
    while (targetRow < boardSize) {
      if (board[targetRow][col] === 0) {
        targetRow++;
      } else if (board[targetRow][col] === board[row][col]) {
        board[targetRow][col] *= 2;
        score += board[targetRow][col];
        board[row][col] = 0;
        moved = true;
        generateRandomTile();
        break;
      } else {
        break;
      }
    }
    if (targetRow !== row + 1) {
      board[targetRow - 1][col] = board[row][col];
      board[row][col] = 0;
      moved = true;
    }
  }

function checkGameOver() {
  const canMove =
    board.some((row, i) =>
      row.some((cell, j) => cell === 0 || (i > 0 && cell === board[i - 1][j]) || (j > 0 && cell === row[j - 1]))
    );

  if (!canMove) {
    alert('Game Over');
    startNewGame();
  }
}

function checkWin() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 8192) {
        updateBoard();
        setTimeout(() => {
          alert('Congratulations! You win!');
          startNewGame();
        }, 100);
        return;
      }
    }
  }
}

function startNewGame() {
  initializeBoard();
  generateRandomTile();
  generateRandomTile();
  updateBoard();

  score = 0;
}

document.addEventListener('DOMContentLoaded', () => {
  initializeBoard();
  generateRandomTile();
  generateRandomTile();
  updateBoard();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      move(event.key);
    }
  });
});
