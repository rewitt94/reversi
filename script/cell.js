export class Cell {

  constructor(idString) {
    this.idString = idString;
    this.validation = false;
  }

  setBlack() {
    var cell = document.getElementById(this.idString);
    cell.style['background-color'] = 'black';
  }

  setWhite() {
    var cell = document.getElementById(this.idString);
    cell.style['background-color'] = 'white';
  }

  setTransparent() {
    var cell = document.getElementById(this.idString);
    cell.style.opacity = 0.65;
  }

  setOpaque() {
    var cell = document.getElementById(this.idString);
    cell.style.opacity = 1;
  }

  removeColor() {
    var cell = document.getElementById(this.idString);
    cell.style['background-color'] = '';
  }

  isClear() {
    var cell = document.getElementById(this.idString);
    return cell.style['background-color'] == '' ?  true : false;
  }

  getColor() {
    var cell = document.getElementById(this.idString);
    return cell.style['background-color'];
  }

  getOpacity() {
    var cell = document.getElementById(this.idString);
    return cell.style.opacity;
  }

  validate() {
    this.validation = true;
  }

  invalidate() {
    this.validation = false;
  }

  flip(playingColor) {
    var cell = document.getElementById(this.idString);
    cell.style.width = '60px';
    cell.style.left = '10%';
    console.log('oi')
    this.decreaseWidth(cell, playingColor);
  }

  decreaseWidth(cell, playingColor) {
    if (parseInt(cell.style.width) > 2) {
      cell.style.width = parseInt(cell.style.width) - 2 + 'px';
      cell.style.left = parseInt(cell.style.left) + 1 + 'px';
      setTimeout(() => this.decreaseWidth(cell, playingColor), 1);
    } else {
      cell.style.background = playingColor;
      this.increaseWidth(cell, playingColor);
    }
  }

  increaseWidth(cell, playingColor) {
    if (parseInt(cell.style.width) < 60) {
      cell.style.width = parseInt(cell.style.width) + 2 + 'px';
      cell.style.left = parseInt(cell.style.left) - 1 + 'px';
      setTimeout(() => this.increaseWidth(cell, playingColor), 1);
    }
  }
}
