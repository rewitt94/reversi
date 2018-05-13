// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARD_TEMPLATE = "\n  <div id=\"A\">\n    <div><div id=\"A1\"></div></div>\n    <div><div id=\"A2\"></div></div>\n    <div><div id=\"A3\"></div></div>\n    <div><div id=\"A4\"></div></div>\n    <div><div id=\"A5\"></div></div>\n    <div><div id=\"A6\"></div></div>\n    <div><div id=\"A7\"></div></div>\n    <div><div id=\"A8\"></div></div>\n  </div>\n  <div id=\"B\">\n    <div><div id=\"B1\"></div></div>\n    <div><div id=\"B2\"></div></div>\n    <div><div id=\"B3\"></div></div>\n    <div><div id=\"B4\"></div></div>\n    <div><div id=\"B5\"></div></div>\n    <div><div id=\"B6\"></div></div>\n    <div><div id=\"B7\"></div></div>\n    <div><div id=\"B8\"></div></div>\n  </div>\n  <div id=\"C\">\n    <div><div id=\"C1\"></div></div>\n    <div><div id=\"C2\"></div></div>\n    <div><div id=\"C3\"></div></div>\n    <div><div id=\"C4\"></div></div>\n    <div><div id=\"C5\"></div></div>\n    <div><div id=\"C6\"></div></div>\n    <div><div id=\"C7\"></div></div>\n    <div><div id=\"C8\"></div></div>\n  </div>\n  <div id=\"D\">\n    <div><div id=\"D1\"></div></div>\n    <div><div id=\"D2\"></div></div>\n    <div><div id=\"D3\"></div></div>\n    <div><div id=\"D4\"></div></div>\n    <div><div id=\"D5\"></div></div>\n    <div><div id=\"D6\"></div></div>\n    <div><div id=\"D7\"></div></div>\n    <div><div id=\"D8\"></div></div>\n  </div>\n  <div id=\"E\">\n    <div><div id=\"E1\"></div></div>\n    <div><div id=\"E2\"></div></div>\n    <div><div id=\"E3\"></div></div>\n    <div><div id=\"E4\"></div></div>\n    <div><div id=\"E5\"></div></div>\n    <div><div id=\"E6\"></div></div>\n    <div><div id=\"E7\"></div></div>\n    <div><div id=\"E8\"></div></div>\n  </div>\n  <div id=\"F\">\n    <div><div id=\"F1\"></div></div>\n    <div><div id=\"F2\"></div></div>\n    <div><div id=\"F3\"></div></div>\n    <div><div id=\"F4\"></div></div>\n    <div><div id=\"F5\"></div></div>\n    <div><div id=\"F6\"></div></div>\n    <div><div id=\"F7\"></div></div>\n    <div><div id=\"F8\"></div></div>\n  </div>\n  <div id=\"G\">\n    <div><div id=\"G1\"></div></div>\n    <div><div id=\"G2\"></div></div>\n    <div><div id=\"G3\"></div></div>\n    <div><div id=\"G4\"></div></div>\n    <div><div id=\"G5\"></div></div>\n    <div><div id=\"G6\"></div></div>\n    <div><div id=\"G7\"></div></div>\n    <div><div id=\"G8\"></div></div>\n  </div>\n  <div id=\"H\">\n    <div><div id=\"H1\"></div></div>\n    <div><div id=\"H2\"></div></div>\n    <div><div id=\"H3\"></div></div>\n    <div><div id=\"H4\"></div></div>\n    <div><div id=\"H5\"></div></div>\n    <div><div id=\"H6\"></div></div>\n    <div><div id=\"H7\"></div></div>\n    <div><div id=\"H8\"></div></div>\n  </div>\n";

var SplitScreenController = exports.SplitScreenController = function () {
  function SplitScreenController() {
    _classCallCheck(this, SplitScreenController);
  }

  _createClass(SplitScreenController, [{
    key: "playMove",
    value: function playMove(board, idString) {
      console.log("playMove", board, idString);
    }
  }, {
    key: "showMove",
    value: function showMove(board, idString) {
      console.log("showMove", board, idString);
    }
  }, {
    key: "hideMove",
    value: function hideMove(board, idString) {
      console.log("hideMove", board, idString);
    }
  }]);

  return SplitScreenController;
}();

var Board = exports.Board = function () {
  function Board(element, CellClass) {
    var _this = this;

    var controller = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Controller();

    _classCallCheck(this, Board);

    element.innerHTML = BOARD_TEMPLATE;

    /*
     * Setup phase
     */
    this.grid = [];
    for (var x = 0; x < 8; x++) {
      var column = [];

      var _loop = function _loop(y) {
        var idString = String.fromCharCode(65 + x, 49 + y);
        column.push(new CellClass(idString));

        var cellElement = document.getElementById(idString).parentNode;

        cellElement.addEventListener("mouseover", function () {
          return controller.showMove(_this, idString);
        });

        cellElement.addEventListener("mouseleave", function () {
          return controller.hideMove(_this, idString);
        });

        cellElement.addEventListener("click", function () {
          return controller.playMove(_this, idString);
        });
      };

      for (var y = 0; y < 8; y++) {
        _loop(y);
      }
      this.grid.push(column);
    }
  }

  _createClass(Board, [{
    key: "getCell",
    value: function getCell(idString) {
      var x = idString.charCodeAt(0) - 65;
      var y = idString.charCodeAt(1) - 49;
      return this.grid[x][y];
    }
  }, {
    key: "getCoordinate",
    value: function getCoordinate(idString) {
      var x = idString.charCodeAt(0) - 65;
      var y = idString.charCodeAt(1) - 49;
      return [x, y];
    }
  }, {
    key: "traverse",
    value: function traverse(idString, direction, callback) {
      var coordinates = this.getCoordinate(idString);
      var x = coordinates[0];
      var y = coordinates[1];
      switch (direction) {
        case 'up':
          while (y < 7) {
            y++;
            callback(this.grid[x][y]);
          }
          break;
        case 'upRight':
          while (y < 7 && x < 7) {
            y++;
            x++;
            callback(this.grid[x][y]);
          }
          break;
        case 'right':
          while (x < 7) {
            x++;
            callback(this.grid[x][y]);
          }
          break;
        case 'downRight':
          while (x < 7 && y > 0) {
            x++;
            y--;
            callback(this.grid[x][y]);
          }
          break;
        case 'down':
          while (y > 0) {
            y--;
            callback(this.grid[x][y]);
          }
          break;
        case 'downLeft':
          while (y > 0 && x > 0) {
            x--;
            y--;
            callback(this.grid[x][y]);
          }
          break;
        case 'left':
          while (x > 0) {
            x--;
            callback(this.grid[x][y]);
          }
          break;
        case 'upLeft':
          while (y < 7 && x > 0) {
            x--;
            y++;
            callback(this.grid[x][y]);
          }
          break;
      }
    }
  }]);

  return Board;
}();
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = exports.Cell = function () {
  function Cell(idString) {
    _classCallCheck(this, Cell);

    this.idString = idString;
    this.validation = false;
  }

  _createClass(Cell, [{
    key: 'setBlack',
    value: function setBlack() {
      var cell = document.getElementById(this.idString);
      cell.style['background-color'] = 'black';
    }
  }, {
    key: 'setWhite',
    value: function setWhite() {
      var cell = document.getElementById(this.idString);
      cell.style['background-color'] = 'white';
    }
  }, {
    key: 'setTransparent',
    value: function setTransparent() {
      var cell = document.getElementById(this.idString);
      cell.style.opacity = 0.65;
    }
  }, {
    key: 'setOpaque',
    value: function setOpaque() {
      var cell = document.getElementById(this.idString);
      cell.style.opacity = 1;
    }
  }, {
    key: 'removeColor',
    value: function removeColor() {
      var cell = document.getElementById(this.idString);
      cell.style['background-color'] = '';
    }
  }, {
    key: 'isClear',
    value: function isClear() {
      var cell = document.getElementById(this.idString);
      return cell.style['background-color'] == '' ? true : false;
    }
  }, {
    key: 'getColor',
    value: function getColor() {
      var cell = document.getElementById(this.idString);
      return cell.style['background-color'];
    }
  }, {
    key: 'getOpacity',
    value: function getOpacity() {
      var cell = document.getElementById(this.idString);
      return cell.style.opacity;
    }
  }, {
    key: 'validate',
    value: function validate() {
      this.validation = true;
    }
  }, {
    key: 'invalidate',
    value: function invalidate() {
      this.validation = false;
    }
  }, {
    key: 'flip',
    value: function flip(playingColor) {
      var cell = document.getElementById(this.idString);
      cell.style.width = '60px';
      cell.style.left = '10%';
      console.log('oi');
      this.decreaseWidth(cell, playingColor);
    }
  }, {
    key: 'decreaseWidth',
    value: function decreaseWidth(cell, playingColor) {
      var _this = this;

      if (parseInt(cell.style.width) > 2) {
        cell.style.width = parseInt(cell.style.width) - 2 + 'px';
        cell.style.left = parseInt(cell.style.left) + 1 + 'px';
        setTimeout(function () {
          return _this.decreaseWidth(cell, playingColor);
        }, 1);
      } else {
        cell.style.background = playingColor;
        this.increaseWidth(cell, playingColor);
      }
    }
  }, {
    key: 'increaseWidth',
    value: function increaseWidth(cell, playingColor) {
      var _this2 = this;

      if (parseInt(cell.style.width) < 60) {
        cell.style.width = parseInt(cell.style.width) + 2 + 'px';
        cell.style.left = parseInt(cell.style.left) - 1 + 'px';
        setTimeout(function () {
          return _this2.increaseWidth(cell, playingColor);
        }, 1);
      }
    }
  }]);

  return Cell;
}();
},{}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scoreboard = exports.Scoreboard = function () {
  function Scoreboard() {
    _classCallCheck(this, Scoreboard);

    this.blackTurn = true;
    this.playingColor = 'black';
    this.otherColor = 'white';
    this.blackScore = 2;
    this.whiteScore = 2;
  }

  _createClass(Scoreboard, [{
    key: 'changePlayer',
    value: function changePlayer() {
      this.blackTurn = !this.blackTurn;
      this.blackTurn ? this.playingColor = 'black' : this.playingColor = 'white';
      this.blackTurn ? this.otherColor = 'white' : this.otherColor = 'black';
    }
  }, {
    key: 'transferScore',
    value: function transferScore() {
      this.addScore();
      this.subtractScore();
    }
  }, {
    key: 'addScore',
    value: function addScore() {
      this.blackTurn ? this.blackScore++ : this.whiteScore++;
      this.updateScoresToHTML();
    }
  }, {
    key: 'subtractScore',
    value: function subtractScore() {
      this.blackTurn ? this.whiteScore-- : this.blackScore--;
      this.updateScoresToHTML();
    }
  }, {
    key: 'updateScoresToHTML',
    value: function updateScoresToHTML() {
      document.getElementById('black_score').innerHTML = SCOREBOARD.blackScore;
      document.getElementById('white_score').innerHTML = SCOREBOARD.whiteScore;
    }
  }]);

  return Scoreboard;
}();
},{}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameMode = exports.GameMode = function () {
  function GameMode() {
    _classCallCheck(this, GameMode);

    this.splitScreen = false;
    this.multiplayer = false;
    this.computerOpponent = false;
    this.playingBlack = false;
  }

  _createClass(GameMode, [{
    key: "playSplitScreen",
    value: function playSplitScreen() {
      this.splitScreen = true;
    }
  }, {
    key: "playMultiplayer",
    value: function playMultiplayer() {
      this.multiplayer = true;
    }
  }, {
    key: "playComputerOpponent",
    value: function playComputerOpponent() {
      this.ai = true;
    }
  }, {
    key: "playAsBlack",
    value: function playAsBlack() {
      this.playingBlack = true;
    }
  }, {
    key: "playAsWhite",
    value: function playAsWhite() {
      this.playingBlack = false;
    }
  }]);

  return GameMode;
}();

//this might be irrelavant
},{}],3:[function(require,module,exports) {
'use strict';

var _board = require('./board.js');

var _cell = require('./cell.js');

var _scoreboard = require('./scoreboard.js');

var _gamemode = require('./gamemode.js');

var BOARD = new _board.Board(document.getElementById('reversi_board'), _cell.Cell);
var SCOREBOARD = new _scoreboard.Scoreboard();
var GAMEMODE = new _gamemode.GameMode();

BOARD.grid[3][3].setWhite();
BOARD.grid[4][4].setWhite();
BOARD.grid[3][4].setBlack();
BOARD.grid[4][3].setBlack();

window.chooseGameMode = function (gameMode) {
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
};

window.chooseColor = function (color) {
  switch (color) {
    case 'black':
      GAMEMODE.playAsBlack();
      break;
    case 'white':
      GAMEMODE.playAsWhite();
      break;
  }
  document.getElementById('player_color_div').style.visibility = 'hidden';
};

function checkMove(idString) {
  var directions = ['up', 'upRight', 'right', 'downRight', 'down', 'downLeft', 'left', 'upLeft'];
  var directionsCount = [];
  for (var i = 0; i < 8; i++) {
    var moveFound = false;
    var movePossible = true;
    var count = 0;
    BOARD.traverse(idString, directions[i], function (cell) {
      if (movePossible && !moveFound) {
        if (cell.getColor() == SCOREBOARD.otherColor) {
          count++;
        } else if (cell.getColor() == SCOREBOARD.playingColor && count > 0) {
          moveFound = true;
        } else {
          movePossible = false;
        }
      }
    });
    if (!moveFound) {
      count = 0;
    }
    directionsCount.push(count);
  }
  return directionsCount;
}

function validateMove(idString) {
  var directionsCount = checkMove(idString);
  var cell = BOARD.getCell(idString);
  return directionsCount.some(function (x) {
    return x > 0;
  }) && cell.isClear();
}

window.showMove = function (idString) {
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
};

window.hideMove = function (idString) {
  var cell = BOARD.getCell(idString);
  if (cell.validation) {
    cell.setOpaque();
    cell.removeColor();
    cell.invalidate();
  }
};

window.playMove = function (idString) {
  var cell = BOARD.getCell(idString);
  if (cell.validation) {
    if (GAMEMODE.splitScreen) {
      makeMove(idString);
    } else if (GAMEMODE.multiplayer) {
      if (GAMEMODE.playingBlack && SCOREBOARD.blackTurn || !GAMEMODE.playingBlack && !SCOREBOARD.blackTurn) {
        ws.send('play_move,' + matchId + ',' + idString);
      }
    } else if (GAMEMODE.computerOpponent) {
      if (GAMEMODE.playingBlack && SCOREBOARD.blackTurn || !GAMEMODE.playingBlack && !SCOREBOARD.blackTurn) {
        makeMove(idString);
        runAi();
      }
    }
  }
};

function runAi() {}

function makeMove(idString) {
  var cell = BOARD.getCell(idString.toString());
  cell.setOpaque();
  if (SCOREBOARD.blackTurn) {
    cell.setBlack();
  } else {
    cell.setWhite();
  }
  var directions = ['up', 'upRight', 'right', 'downRight', 'down', 'downLeft', 'left', 'upLeft'];
  var directionsCount = checkMove(idString);
  for (var i = 0; i < 8; i++) {
    var count = 0;
    BOARD.traverse(idString, directions[i], function (cell) {
      if (count < directionsCount[i]) {
        if (SCOREBOARD.blackTurn) {
          cell.flip('black');
        } else {
          cell.flip('white');
        }
        SCOREBOARD.transferScore();
      }
      count++;
    });
  }
  SCOREBOARD.addScore();
  SCOREBOARD.changePlayer();
  updateScoresToHTML();
  cell.invalidate();
}

// NODE_ENV is set by parcel
// console.log("node env is", process.env.NODE_ENV);

// 1 == "1" is true,
// but 1 === "1" is false
//
// generally using === is "safer"

var WEBSOCKET_PATH = 'development' === "production" ? 'ws://ricky.hewitt.tech:80/reversiws' : 'ws://localhost:5000';

var ws = new WebSocket(WEBSOCKET_PATH);

// event emmited when connected
ws.onopen = function () {
  console.log('websocket is connected...');

  // sending a send event to websocket server
};

// This needs serious refactoring

var matchPosted = false;
var matchFound = true;
var matchId = '';

window.createMatch = function () {
  document.getElementById('lobby_options_div').style.visibility = 'hidden';
  document.getElementById('post_match_div').style.visibility = 'visible';
};

window.postMatch = function (matchName) {
  if (!matchPosted) {
    var matchId = Math.random();
    // websockets only support strings currently
    var string = 'post,' + matchId.toString() + ',' + matchName;
    ws.send(string);

    // const message = {
    //   type: 'post',
    //   matchId: matchId,
    //   matchName: matchName
    // };
    // ws.send(JSON.stringify(message))
    //
    // on the server - JSON.parse(message) will get the original object back


    matchPosted = true;
  }
};

window.searchMatches = function () {
  ws.send('search');
  document.getElementById('lobby_options_div').style.visibility = 'hidden';
  document.getElementById('lobby_div').style.visibility = 'visible';
};

// event emitted when recieving message
function handleWebsocketMessage(message) {
  message = message.data.split(',');
  console.log(message);
  if (message[0] == 'lobby') {
    var lobby = document.getElementById('lobby_div');
    if (message[1] == 'no_games') {
      var noGames = document.createElement('H1');
      noGames.innerHTML = 'No games available';
      lobby.appendChild(noGames);
    } else {
      var _loop = function _loop() {
        postedGame = document.createElement('button');

        var id = message[3 * i + 1];
        postedGame.addEventListener('click', function () {
          ws.send('accept,' + id);
        });
        postedGame.innerHTML = message[3 * i + 2];
        lobby.appendChild(postedGame);
      };

      for (var i = 0; i < message.length / 3; i++) {
        var postedGame;

        _loop();
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
    alert('connection failed');
    location.reload();
  }
}

ws.onmessage = function (message) {
  return handleWebsocketMessage(message);
};

// if handleWebsocketMessage is in a class use this, e.g.:
// ws.onmessage = (message) => this.handleWebsocketMessage(message);
},{"./board.js":5,"./cell.js":7,"./scoreboard.js":6,"./gamemode.js":8}],19:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '58817' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[19,3])
//# sourceMappingURL=/dist/373e3893e77d85624afd7cb389ecc5bd.map