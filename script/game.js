import { Board } from './board.js'
import { Cell } from './cell.js'
import { Scoreboard } from './scoreboard.js'
import { GameMode } from './gamemode.js'

const BOARD = new Board(Cell)
const SCOREBOARD = new Scoreboard
const GAMEMODE = new GameMode

setUp()

function setUp() {
  BOARD.grid[3][3].setWhite()
  BOARD.grid[4][4].setWhite()
  BOARD.grid[3][4].setBlack()
  BOARD.grid[4][3].setBlack()
}

window.chooseGameMode = function(gameMode) {
  switch (gameMode) {
    case 'split_screen':
      GAMEMODE.playSplitScreen();
      break;
    case 'multiplayer':
      GAMEMODE.playMultiplayer();
      document.getElementById('lobby_options_div').style.visibility = 'visible';
      break;
    case 'computer_opponent':
      GAMEMODE.playComputerOpponent();
      document.getElementById('player_color_div').style.visibility = 'visible';
      break;
  }
  document.getElementById('game_mode_div').style.visibility = 'hidden';
}

window.chooseColor = function(color) {
  switch (color) {
    case 'black':
      GAMEMODE.playAsBlack();
      break;
    case 'white':
      GAMEMODE.playAsWhite();
      break;
  }
  document.getElementById('player_color_div').style.visibility = 'hidden';
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
    if (GAMEMODE.splitScreen) {
      makeMove(idString)
    } else if (GAMEMODE.multiplayer) {
      if (GAMEMODE.playingBlack && SCOREBOARD.blackTurn || !GAMEMODE.playingBlack && !SCOREBOARD.blackTurn) {
        ws.send('play_move,' + matchId + ',' + idString)
      }
    } else if (GAMEMODE.computerOpponent) {
      if (GAMEMODE.playingBlack && SCOREBOARD.blackTurn || !GAMEMODE.playingBlack && !SCOREBOARD.blackTurn) {
      makeMove(idString)
      runAi()
      }
    }
  }
}

function runAi() {

}

function makeMove(idString) {
  var cell = BOARD.getCell(idString.toString());
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
  SCOREBOARD.changePlayer();
  updateScoresToHTML();
  cell.invalidate();
}

var ws = new WebSocket('ws://localhost:2018');

// event emmited when connected
ws.onopen = function() {
  console.log('websocket is connected...');

  // sending a send event to websocket server
}

// This needs serious refactoring

var matchPosted = false;
var matchFound = true;
var matchId = '';

window.createMatch = function() {
  document.getElementById('lobby_options_div').style.visibility = 'hidden';
  document.getElementById('post_match_div').style.visibility = 'visible';
}

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

// event emitted when recieving message
ws.onmessage = function (message) {
  message = message.data.split(',');
  console.log(message)
  if (message[0] == 'lobby') {
    var lobby = document.getElementById('lobby_div');
    if (message[1] == 'no_games') {
      var noGames = document.createElement('H1');
      noGames.innerHTML = 'No games available';
      lobby.appendChild(noGames);
    } else {
      for(var i = 0;i < message.length / 3;i++) {
        var postedGame = document.createElement('button');
        const id = message[(3*i) + 1];
        postedGame.addEventListener('click', function() {
          ws.send('accept,' + id)
        });
        postedGame.innerHTML = message[(3*i) + 2];
        lobby.appendChild(postedGame);
      }
    }
  };

  if (message[0] == 'start_game_as_black') {
    GAMEMODE.playAsBlack();
    matchId = message[1];
    matchFound = true;
    matchPosted = false;
    document.getElementById('lobby_div').style.visibility = 'hidden';
    document.getElementById('post_match_div').style.visibility = 'hidden';
    alert('you will play as black');
  }

  if (message[0] == 'start_game_as_white') {
    GAMEMODE.playAsWhite();
    matchId = message[1];
    matchFound = true;
    matchPosted = false;
    document.getElementById('lobby_div').style.visibility = 'hidden';
    document.getElementById('post_match_div').style.visibility = 'hidden';
    alert('you will play as white');
  }

  if (message[0] == 'make_move') {
    makeMove(message[1]);
  }

  if (message[0] == 'other_player_missing') {
    alert('connection failed')
    location.reload();
  }

}
