
import { createBoard } from "./main.js";

export let boardSize = 10;

export function addBoardSizeClicks() {
  const board = document.getElementById('game-container')
  document.getElementById('small-board').addEventListener('click', () => {
    boardSize = 5;
    board.classList.remove(...board.classList);
    board.classList.add('small-grid');
    createBoard()
  })

  document.getElementById('medium-board').addEventListener('click', () => {
    boardSize = 10;
    board.classList.remove(...board.classList);
    board.classList.add('medium-grid');
    createBoard()
  });

  document.getElementById('large-board').addEventListener('click', () => {
    boardSize = 15;
    board.classList.remove(...board.classList);
    board.classList.add('large-grid');
    createBoard()
  });


  document.getElementById('huge-board').addEventListener('click', () => {
    boardSize = 20;
    board.classList.remove(...board.classList);
    board.classList.add('huge-grid');
    createBoard()
  });

}