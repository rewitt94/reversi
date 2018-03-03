import { Board } from './board.js'
import { Cell } from './cell.js'
import { Scoreboard } from './scoreboard.js'

const BOARD = new Board(Cell)
const SCOREBOARD = new Scoreboard

setUp()

function setUp() {
  BOARD.grid[3][3].setWhite()
  BOARD.grid[4][4].setWhite()
  BOARD.grid[3][4].setBlack()
  BOARD.grid[4][3].setBlack()
}

function updateScoresToHTML() {
  document.getElementById('black_score').innerHTML = SCOREBOARD.blackScore;
  document.getElementById('white_score').innerHTML = SCOREBOARD.whiteScore;
}

function checkMove(idString) {
  var directions = ['up','upRight','right','downRight','down','downLeft','left','upLeft']
  var directionsCount = []
  for (var i=0;i<8;i++) {
    var moveFound = false;
    var movePossible = true;
    var count = 0;
    BOARD.traverse(idString,directions[i],(cell) => {
      if (movePossible && !moveFound) {
        if (cell.getColor() == SCOREBOARD.otherColor) {
          count++;
        } else if (cell.getColor() == SCOREBOARD.playingColor && count > 0) {
          moveFound = true;
        } else {
          movePossible = false
        }
      }
    })
    if (!moveFound) { count = 0 }
    directionsCount.push(count)
  }
  return directionsCount
}

function validateMove(idString) {
  var directionsCount = checkMove(idString);
  var cell = BOARD.getCell(idString);
  return (directionsCount.some((x) => x > 0) && cell.isClear())
}

window.showMove = function(idString) {
  if (validateMove(idString)) {
    var cell = BOARD.getCell(idString);
    if (SCOREBOARD.blackTurn) {
      cell.setBlack();
    } else {
      cell.setWhite();
    }
    cell.setTransparent();
    cell.validate();
  }
}

window.hideMove = function(idString) {
  var cell = BOARD.getCell(idString);
  if (cell.validation) {
    cell.setOpaque();
    cell.removeColor();
    cell.invalidate();
  }
}

window.playMove = function(idString) {
  var cell = BOARD.getCell(idString);
  if (cell.validation) {
    cell.setOpaque();
    if (SCOREBOARD.blackTurn) {
      cell.setBlack();
    } else {
      cell.setWhite();
    }
    var directions = ['up','upRight','right','downRight','down','downLeft','left','upLeft']
    var directionsCount = checkMove(idString);
    for (var i=0;i<8;i++) {
      var count = 0;
      console.log(directionsCount[i])
      BOARD.traverse(idString,directions[i],(cell) => {
        if (count < directionsCount[i]) {
          if (SCOREBOARD.blackTurn) {
            cell.flip('black');
          } else {
            cell.flip('white');
          }
          SCOREBOARD.transferScore()
        }
        count++;
      })
    }
    SCOREBOARD.addScore();
    console.log('oi')
    SCOREBOARD.changePlayer();
    updateScoresToHTML();
    cell.invalidate();
  }
}
