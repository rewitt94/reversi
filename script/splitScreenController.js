import { Scorer } from './scorer.js'

export class SplitScreenController {

  constructor(scorer = new Scorer) {
    this.scorer = scorer
  }

  playMove(board,idString) {
    var cell = board.getCell(idString);
    if (cell.validated) {
      this._makeMove(board,idString)
    }
  }

  showMove(board,idString) {
    if (this._validateMove(board,idString)) {
      var cell = board.getCell(idString);
      cell.showValid(this.scorer.blackTurn);
    }
  }

  hideMove(board,idString) {
    var cell = board.getCell(idString);
    if (cell.validated) {
      cell.hideValid();
    }
  }

  _checkMove(board,idString) {
    var directions = ['up','upRight','right','downRight','down','downLeft','left','upLeft']
    var directionsCount = []
    for (var i=0;i<8;i++) {
      var moveFound = false;
      var movePossible = true;
      var count = 0;
      board.traverse(idString,directions[i],(cell) => {
        if (movePossible && !moveFound) {
          if (cell.getColor() == this.scorer.otherColor) {
            count++;
          } else if (cell.getColor() == this.scorer.playingColor && count > 0) {
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

  _validateMove(board,idString) {
    var directionsCount = this._checkMove(board,idString);
    var cell = board.getCell(idString);
    return (directionsCount.some((x) => x > 0) && cell.isClear())
  }

  _makeMove(board,idString) {
    var cell = board.getCell(idString);
    cell.setOpaque();
    if (this.scorer.blackTurn) {
      cell.setBlack();
    } else {
      cell.setWhite();
    }
    var directions = ['up','upRight','right','downRight','down','downLeft','left','upLeft']
    var directionsCount = this._checkMove(board,idString);
    for (var i=0;i<8;i++) {
      var count = 0;
      board.traverse(idString,directions[i],(cell) => {
        if (count < directionsCount[i]) {
          if (this.scorer.blackTurn) {
            cell.flip('black');
          } else {
            cell.flip('white');
          }
          this.scorer.transferScore()
        }
        count++;
      })
    }
    this.scorer.addScore();
    this.scorer.changePlayer();
    this.scorer.updateScoresToHTML();
    cell.validated = false;
  }

}
