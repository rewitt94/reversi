import { Board } from './board.js'
import { Cell } from './cell.js'
import { SplitScreenController } from './splitScreenController.js'
import { MultiplayerController } from './multiplayerController.js'

let boardElement = document.getElementById('reversi_board')
let board;

window.chooseGameMode = function(gameMode) {
  switch (gameMode) {
    case 'split_screen':
      createBoard(gameMode)
      break;
    case 'multiplayer':
      createBoard(gameMode)
      document.getElementById('lobby_options_div').style.visibility = 'visible';
      break;
  }
  document.getElementById('game_mode_div').style.visibility = 'hidden';
}

function createMatch() {
  document.getElementById('lobby_options_div').style.visibility = 'hidden';
  document.getElementById('post_match_div').style.visibility = 'visible';
}

function createBoard(gameMode) {
  switch (gameMode) {
    case 'split_screen':
      board = new Board(boardElement,Cell,new SplitScreenController)
      break;
    case 'multiplayer':
      board = new Board(boardElement,Cell,new MultiplayerController)
      break;
  }
  board.grid[3][3].setWhite()
  board.grid[4][4].setWhite()
  board.grid[3][4].setBlack()
  board.grid[4][3].setBlack()
}
