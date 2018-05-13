import { Scorer } from './scorer.js'

const WEBSOCKET_PATH = process.env.NODE_ENV === "production" ?
  'ws://ricky.hewitt.tech:80/reversiws' :
  'ws://localhost:5000';

export class MultiplayerController {

  constructor(scoreBoard = new Scorer) {
    this.scoreBoard = scoreBoard
    this.ws = new WebSocket(WEBSOCKET_PATH);
    this.matchPosted = false;
    this.matchFound = true;
    this.matchId = '';
  }

  playMove(board, idString) {
    console.log("playMove", board, idString);
  }

  showMove(board, idString) {
    console.log("showMove", board, idString)
  }

  hideMove(board, idString) {
    console.log("hideMove", board, idString)
  }

}

var matchPosted = false;
var matchFound = true;
var matchId = '';



window.postMatch = function(matchName) {
  if (!matchPosted) {
    var matchId = Math.random() ;
    // websockets only support strings currently
    var string = 'post,' + matchId.toString() + ',' + matchName;
    ws.send(string);
    matchPosted = true;
  }
}

window.searchMatches = function() {
  ws.send('search');
  document.getElementById('lobby_options_div').style.visibility = 'hidden';
  document.getElementById('lobby_div').style.visibility = 'visible';
}
