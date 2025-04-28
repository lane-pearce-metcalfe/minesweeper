let boardSize = 5;
let difficulty = 0.2;
const grid = [];

function createBoard() {
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
}

createBoard();

function addMines() {
  const amountOfMines = (boardSize * boardSize) * difficulty;

  for (let i = 0; i < amountOfMines; i++) {
    const randRow = Math.floor(Math.random() * boardSize)
    let randCell = Math.floor(Math.random() * boardSize)
    grid[randRow][randCell].isMine = true;
    document.getElementById(`${randRow}-${randCell}`).classList.add('mine');
  }
}

addMines();

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
]

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
      mineCount++
    }
  }
  return mineCount;
}

document.querySelectorAll('.cell').forEach((e) => {
  e.addEventListener('click', (event) => {
    const [row, cell] = event.target.id.split('-').map(Number);
    const mineCount = countMines(row, cell);
    if (mineCount === 0) {
      for (let i = 0; i < 8; i++) {
        const newRow = row + directions[i][0];
        const newCell = cell + directions[i][1]; 
        const newMines = countMines(newRow, newCell);
        document.getElementById(`${newRow}-${newCell}`).textContent = newMines;
      }
    }
    event.target.textContent = mineCount;
  });
});
