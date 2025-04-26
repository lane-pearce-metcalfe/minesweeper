let boardSize = 5;
let difficulty = 0.2;

function createBoard() {
  let HTML = ``
  for(let i = 0; i < boardSize * boardSize; i++) {
    HTML += `<div id="cell-${i}" class="cell"></div>`
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