export class Cell {

  constructor(idString) {
    this.idString = idString;
    this.validated = false;
  }

  setBlack() {
    var cell = document.getElementById(this.idString);
    cell.style['background-color'] = 'black';
  }

  setWhite() {
    var cell = document.getElementById(this.idString);
    cell.style['background-color'] = 'white';
  }

  isClear() {
    var cell = document.getElementById(this.idString);
    return cell.style['background-color'] == '' ?  true : false;
  }

  getColor() {
    var cell = document.getElementById(this.idString);
    return cell.style['background-color'];
  }

  showValid(blackTurn) {
    if (blackTurn) {
      this.setBlack();
    } else {
      this.setWhite();
    }
    this._setTransparent();
    this.validated = true;
  }

  hideValid() {
    this.setOpaque();
    this._removeColor();
    this.validated = false;
  }

  setOpaque() {
    var cell = document.getElementById(this.idString);
    cell.style.opacity = 1;
  }

  _setTransparent() {
    var cell = document.getElementById(this.idString);
    cell.style.opacity = 0.65;
  }

  _removeColor() {
    var cell = document.getElementById(this.idString);
    cell.style['background-color'] = '';
  }

  flip(playingColor) {
    var cell = document.getElementById(this.idString);
    cell.style.width = '60px';
    cell.style.left = '10%';
    this._decreaseWidth(cell, playingColor);
  }

  _decreaseWidth(cell, playingColor) {
    if (parseInt(cell.style.width) > 2) {
      cell.style.width = parseInt(cell.style.width) - 2 + 'px';
      cell.style.left = parseInt(cell.style.left) + 1 + 'px';
      setTimeout(() => this._decreaseWidth(cell, playingColor), 1);
    } else {
      cell.style.background = playingColor;
      this._increaseWidth(cell, playingColor);
    }
  }

  _increaseWidth(cell, playingColor) {
    if (parseInt(cell.style.width) < 60) {
      cell.style.width = parseInt(cell.style.width) + 2 + 'px';
      cell.style.left = parseInt(cell.style.left) - 1 + 'px';
      setTimeout(() => this._increaseWidth(cell, playingColor), 1);
    }
  }

}
