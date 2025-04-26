let boardSize = 5;

function createBoard() {
  let HTML = ``
  for(let i = 0; i < boardSize * boardSize; i++) {
    HTML += `<div id="cell-${i}" class="cell"></div>`
  }
  document.getElementById('game-container').innerHTML = HTML
}

createBoard();