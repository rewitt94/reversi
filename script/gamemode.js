export class GameMode {

  constructor() {
    this.splitScreen = false;
    this.multiplayer = false;
    this.computerOpponent = false;
    this.playingBlack = false;
  }

  playSplitScreen() {
    this.splitScreen = true;
  }

  playMultiplayer() {
    this.multiplayer = true;
  }

  playComputerOpponent() {
    this.ai = true
  }

  playAsBlack() {
    this.playingBlack = true;
  }

  playAsWhite() {
    this.playingBlack = false;
  }

}
