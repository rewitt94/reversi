export class Scorer {

  constructor() {
    this.blackTurn = true;
    this.playingColor = 'black';
    this.otherColor = 'white';
    this.blackScore = 2;
    this.whiteScore = 2;
  }

  changePlayer() {
    this.blackTurn = !this.blackTurn;
    this.blackTurn ? this.playingColor = 'black' : this.playingColor = 'white';
    this.blackTurn ? this.otherColor = 'white' : this.otherColor = 'black';
  }

  transferScore () {
    this.addScore();
    this.subtractScore();
  }

  addScore() {
    this.blackTurn ? this.blackScore++ : this.whiteScore++;
  }

  subtractScore() {
    this.blackTurn ? this.whiteScore-- : this.blackScore--;
  }

  updateScoresToHTML() {
    document.getElementById('black_score').innerHTML = this.blackScore;
    document.getElementById('white_score').innerHTML = this.whiteScore;
  }

}
