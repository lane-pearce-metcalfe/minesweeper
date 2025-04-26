let boardSize = 5;
let difficulty = 0.2;

function createBoard() {
  let HTML = ``
  for(let i = 0; i < boardSize; i++) {
    for(let j = 0; j < boardSize; j++)
    HTML += `<div id="cell-${i}" class="cell row-${j}"></div>`
  }
  document.getElementById('game-container').innerHTML = HTML
}

createBoard();

function addMines() {
  const max = boardSize * boardSize
  const amountOfMines = max * difficulty;

  for (let i = 0; i < amountOfMines; i++) {
    let id = Math.floor(Math.random() * max)
    document.getElementById(`cell-${id}`).classList.add('mine');
  }
}

addMines();

