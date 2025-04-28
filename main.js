
import { boardSize, addBoardSizeClicks } from "./boardSizeBtns.js";

addBoardSizeClicks();

let difficulty = 0.2;
const grid = [];

export function createBoard() {
  let HTML = ``
  for(let row = 0; row < boardSize; row++) {
    grid[row] = [];
    for (let cell = 0; cell < boardSize; cell++) {
      const id = `${row}-${cell}`
      grid[row][cell] = { isMine: false, row, cell }
      HTML += `<div id="${id}" class="cell"></div>`
    }
  }
  document.getElementById('game-container').innerHTML = HTML
  addMines();
  addCellClicks();
}

let minesPlaced;

function addMines() {
  const amountOfMines = (boardSize * boardSize) * difficulty;

  minesPlaced = 0;

  for (let i = 0; i < amountOfMines; i++) {
    const randRow = Math.floor(Math.random() * boardSize)
    let randCell = Math.floor(Math.random() * boardSize)
    if (!grid[randRow][randCell.isMine]) {
      minesPlaced++;
    }
    grid[randRow][randCell].isMine = true;
  }
}

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
]

let firstClick = true;

const colors = ['blue', 'green', 'orange', 'darkblue', 'darkred', 'cyan', 'purple', 'white']

function countMines(row, cell) {
  let mineCount = 0;

  for (let i = 0; i < 8; i++) {
    const newRow = row + directions[i][0];
    const newCell = cell + directions[i][1];
    
    if (newRow >= 0 &&
      newRow < boardSize &&
      newCell >= 0 &&
      newCell < boardSize &&
      grid[newRow][newCell].isMine
    ) {
      if (firstClick === true) {
        grid[newRow][newCell].isMine = false
      } else {
        mineCount++
      }
    }
  }

  const selectCell = document.getElementById(`${row}-${cell}`)
  if (mineCount > 0 && selectCell) {
    selectCell.style.color = colors[mineCount - 1]
  }
  
  return mineCount;
}

function addCellClicks() {
  document.querySelectorAll('.cell').forEach((e) => {
    e.addEventListener('click', (event) => {
      if (!e.classList.contains('flagged')) {
        const [row, cell] = event.target.id.split('-').map(Number);
        if (!grid[row][cell].isMine || grid[row][cell].isMine && firstClick) {
        const mineCount = countMines(row, cell);
        if (firstClick === true) {
          firstClick = false;
          grid[row][cell].isMine = false;
        }
        revealCell(mineCount, row, cell);
        if (mineCount > 0) {
          event.target.textContent = mineCount;
        }
        event.target.classList.add('selected');
        } else {
          document.getElementById(`${row}-${cell}`).classList.add('mine');
        }
      }
    });


    e.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      if (e.classList.contains('flagged') || e.classList.contains('selected')) {
        e.classList.remove('flagged')
      } else {
        e.classList.add('flagged')
      }
    })
  });
}


function revealCell(mineCount, row, cell, visited = new Set()) {
  const id = `${row}-${cell}`;
  if (visited.has(id)) return;
  visited.add(id);

  const element = document.getElementById(id);

  if (
    row < 0 || row >= boardSize ||
    cell < 0 || cell >= boardSize ||
    element.textContent !== ''
  ) return;

  element.classList.add('selected')
  element.textContent = mineCount;

  if (mineCount === 0) {
    element.textContent = ``;
    for (let [dx, dy] of directions) {
      const newRow = row + dx;
      const newCell = cell + dy;

      revealCell(countMines(newRow, newCell), newRow, newCell, visited);
    }
  }
}

createBoard();