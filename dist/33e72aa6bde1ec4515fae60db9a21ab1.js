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
})({6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BOARD_TEMPLATE = "\n  <div id=\"A\">\n    <div><div id=\"A1\"></div></div>\n    <div><div id=\"A2\"></div></div>\n    <div><div id=\"A3\"></div></div>\n    <div><div id=\"A4\"></div></div>\n    <div><div id=\"A5\"></div></div>\n    <div><div id=\"A6\"></div></div>\n    <div><div id=\"A7\"></div></div>\n    <div><div id=\"A8\"></div></div>\n  </div>\n  <div id=\"B\">\n    <div><div id=\"B1\"></div></div>\n    <div><div id=\"B2\"></div></div>\n    <div><div id=\"B3\"></div></div>\n    <div><div id=\"B4\"></div></div>\n    <div><div id=\"B5\"></div></div>\n    <div><div id=\"B6\"></div></div>\n    <div><div id=\"B7\"></div></div>\n    <div><div id=\"B8\"></div></div>\n  </div>\n  <div id=\"C\">\n    <div><div id=\"C1\"></div></div>\n    <div><div id=\"C2\"></div></div>\n    <div><div id=\"C3\"></div></div>\n    <div><div id=\"C4\"></div></div>\n    <div><div id=\"C5\"></div></div>\n    <div><div id=\"C6\"></div></div>\n    <div><div id=\"C7\"></div></div>\n    <div><div id=\"C8\"></div></div>\n  </div>\n  <div id=\"D\">\n    <div><div id=\"D1\"></div></div>\n    <div><div id=\"D2\"></div></div>\n    <div><div id=\"D3\"></div></div>\n    <div><div id=\"D4\"></div></div>\n    <div><div id=\"D5\"></div></div>\n    <div><div id=\"D6\"></div></div>\n    <div><div id=\"D7\"></div></div>\n    <div><div id=\"D8\"></div></div>\n  </div>\n  <div id=\"E\">\n    <div><div id=\"E1\"></div></div>\n    <div><div id=\"E2\"></div></div>\n    <div><div id=\"E3\"></div></div>\n    <div><div id=\"E4\"></div></div>\n    <div><div id=\"E5\"></div></div>\n    <div><div id=\"E6\"></div></div>\n    <div><div id=\"E7\"></div></div>\n    <div><div id=\"E8\"></div></div>\n  </div>\n  <div id=\"F\">\n    <div><div id=\"F1\"></div></div>\n    <div><div id=\"F2\"></div></div>\n    <div><div id=\"F3\"></div></div>\n    <div><div id=\"F4\"></div></div>\n    <div><div id=\"F5\"></div></div>\n    <div><div id=\"F6\"></div></div>\n    <div><div id=\"F7\"></div></div>\n    <div><div id=\"F8\"></div></div>\n  </div>\n  <div id=\"G\">\n    <div><div id=\"G1\"></div></div>\n    <div><div id=\"G2\"></div></div>\n    <div><div id=\"G3\"></div></div>\n    <div><div id=\"G4\"></div></div>\n    <div><div id=\"G5\"></div></div>\n    <div><div id=\"G6\"></div></div>\n    <div><div id=\"G7\"></div></div>\n    <div><div id=\"G8\"></div></div>\n  </div>\n  <div id=\"H\">\n    <div><div id=\"H1\"></div></div>\n    <div><div id=\"H2\"></div></div>\n    <div><div id=\"H3\"></div></div>\n    <div><div id=\"H4\"></div></div>\n    <div><div id=\"H5\"></div></div>\n    <div><div id=\"H6\"></div></div>\n    <div><div id=\"H7\"></div></div>\n    <div><div id=\"H8\"></div></div>\n  </div>\n";

var Board = exports.Board = function () {
  function Board(element, CellClass, controller) {
    var _this = this;

    _classCallCheck(this, Board);

    element.innerHTML = BOARD_TEMPLATE;
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
},{}],5:[function(require,module,exports) {
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
    this.validated = false;
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
    key: 'showValid',
    value: function showValid(blackTurn) {
      if (blackTurn) {
        this.setBlack();
      } else {
        this.setWhite();
      }
      this._setTransparent();
      this.validated = true;
    }
  }, {
    key: 'hideValid',
    value: function hideValid() {
      this.setOpaque();
      this._removeColor();
      this.validated = false;
    }
  }, {
    key: 'setOpaque',
    value: function setOpaque() {
      var cell = document.getElementById(this.idString);
      cell.style.opacity = 1;
    }
  }, {
    key: '_setTransparent',
    value: function _setTransparent() {
      var cell = document.getElementById(this.idString);
      cell.style.opacity = 0.65;
    }
  }, {
    key: '_removeColor',
    value: function _removeColor() {
      var cell = document.getElementById(this.idString);
      cell.style['background-color'] = '';
    }
  }, {
    key: 'flip',
    value: function flip(playingColor) {
      var cell = document.getElementById(this.idString);
      cell.style.width = '60px';
      cell.style.left = '10%';
      this._decreaseWidth(cell, playingColor);
    }
  }, {
    key: '_decreaseWidth',
    value: function _decreaseWidth(cell, playingColor) {
      var _this = this;

      if (parseInt(cell.style.width) > 2) {
        cell.style.width = parseInt(cell.style.width) - 2 + 'px';
        cell.style.left = parseInt(cell.style.left) + 1 + 'px';
        setTimeout(function () {
          return _this._decreaseWidth(cell, playingColor);
        }, 1);
      } else {
        cell.style.background = playingColor;
        this._increaseWidth(cell, playingColor);
      }
    }
  }, {
    key: '_increaseWidth',
    value: function _increaseWidth(cell, playingColor) {
      var _this2 = this;

      if (parseInt(cell.style.width) < 60) {
        cell.style.width = parseInt(cell.style.width) + 2 + 'px';
        cell.style.left = parseInt(cell.style.left) - 1 + 'px';
        setTimeout(function () {
          return _this2._increaseWidth(cell, playingColor);
        }, 1);
      }
    }
  }]);

  return Cell;
}();
},{}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scorer = exports.Scorer = function () {
  function Scorer() {
    _classCallCheck(this, Scorer);

    this.blackTurn = true;
    this.playingColor = 'black';
    this.otherColor = 'white';
    this.blackScore = 2;
    this.whiteScore = 2;
  }

  _createClass(Scorer, [{
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
    }
  }, {
    key: 'subtractScore',
    value: function subtractScore() {
      this.blackTurn ? this.whiteScore-- : this.blackScore--;
    }
  }, {
    key: 'updateScoresToHTML',
    value: function updateScoresToHTML() {
      document.getElementById('black_score').innerHTML = this.blackScore;
      document.getElementById('white_score').innerHTML = this.whiteScore;
    }
  }]);

  return Scorer;
}();
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitScreenController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scorer = require('./scorer.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SplitScreenController = exports.SplitScreenController = function () {
  function SplitScreenController() {
    var scorer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _scorer.Scorer();

    _classCallCheck(this, SplitScreenController);

    this.scorer = scorer;
  }

  _createClass(SplitScreenController, [{
    key: 'playMove',
    value: function playMove(board, idString) {
      var cell = board.getCell(idString);
      if (cell.validated) {
        this._makeMove(board, idString);
      }
    }
  }, {
    key: 'showMove',
    value: function showMove(board, idString) {
      if (this._validateMove(board, idString)) {
        var cell = board.getCell(idString);
        cell.showValid(this.scorer.blackTurn);
      }
    }
  }, {
    key: 'hideMove',
    value: function hideMove(board, idString) {
      var cell = board.getCell(idString);
      if (cell.validated) {
        cell.hideValid();
      }
    }
  }, {
    key: '_checkMove',
    value: function _checkMove(board, idString) {
      var _this = this;

      var directions = ['up', 'upRight', 'right', 'downRight', 'down', 'downLeft', 'left', 'upLeft'];
      var directionsCount = [];
      for (var i = 0; i < 8; i++) {
        var moveFound = false;
        var movePossible = true;
        var count = 0;
        board.traverse(idString, directions[i], function (cell) {
          if (movePossible && !moveFound) {
            if (cell.getColor() == _this.scorer.otherColor) {
              count++;
            } else if (cell.getColor() == _this.scorer.playingColor && count > 0) {
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
  }, {
    key: '_validateMove',
    value: function _validateMove(board, idString) {
      var directionsCount = this._checkMove(board, idString);
      var cell = board.getCell(idString);
      return directionsCount.some(function (x) {
        return x > 0;
      }) && cell.isClear();
    }
  }, {
    key: '_makeMove',
    value: function _makeMove(board, idString) {
      var _this2 = this;

      var cell = board.getCell(idString);
      cell.setOpaque();
      if (this.scorer.blackTurn) {
        cell.setBlack();
      } else {
        cell.setWhite();
      }
      var directions = ['up', 'upRight', 'right', 'downRight', 'down', 'downLeft', 'left', 'upLeft'];
      var directionsCount = this._checkMove(board, idString);
      for (var i = 0; i < 8; i++) {
        var count = 0;
        board.traverse(idString, directions[i], function (cell) {
          if (count < directionsCount[i]) {
            if (_this2.scorer.blackTurn) {
              cell.flip('black');
            } else {
              cell.flip('white');
            }
            _this2.scorer.transferScore();
          }
          count++;
        });
      }
      this.scorer.addScore();
      this.scorer.changePlayer();
      this.scorer.updateScoresToHTML();
      cell.validated = false;
    }
  }]);

  return SplitScreenController;
}();
},{"./scorer.js":10}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiplayerController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scorer = require('./scorer.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WEBSOCKET_PATH = 'development' === "production" ? 'ws://ricky.hewitt.tech:80/reversiws' : 'ws://localhost:5000';

var MultiplayerController = exports.MultiplayerController = function () {
  function MultiplayerController() {
    var scoreBoard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _scorer.Scorer();

    _classCallCheck(this, MultiplayerController);

    this.scoreBoard = scoreBoard;
    this.ws = new WebSocket(WEBSOCKET_PATH);
    this.matchPosted = false;
    this.matchFound = true;
    this.matchId = '';
  }

  _createClass(MultiplayerController, [{
    key: 'playMove',
    value: function playMove(board, idString) {
      console.log("playMove", board, idString);
    }
  }, {
    key: 'showMove',
    value: function showMove(board, idString) {
      console.log("showMove", board, idString);
    }
  }, {
    key: 'hideMove',
    value: function hideMove(board, idString) {
      console.log("hideMove", board, idString);
    }
  }]);

  return MultiplayerController;
}();

var matchPosted = false;
var matchFound = true;
var matchId = '';

window.postMatch = function (matchName) {
  if (!matchPosted) {
    var matchId = Math.random();
    // websockets only support strings currently
    var string = 'post,' + matchId.toString() + ',' + matchName;
    ws.send(string);
    matchPosted = true;
  }
};

window.searchMatches = function () {
  ws.send('search');
  document.getElementById('lobby_options_div').style.visibility = 'hidden';
  document.getElementById('lobby_div').style.visibility = 'visible';
};
},{"./scorer.js":10}],3:[function(require,module,exports) {
'use strict';

var _board = require('./board.js');

var _cell = require('./cell.js');

var _splitScreenController = require('./splitScreenController.js');

var _multiplayerController = require('./multiplayerController.js');

var boardElement = document.getElementById('reversi_board');
var board = void 0;

window.chooseGameMode = function (gameMode) {
  switch (gameMode) {
    case 'split_screen':
      createBoard(gameMode);
      break;
    case 'multiplayer':
      createBoard(gameMode);
      document.getElementById('lobby_options_div').style.visibility = 'visible';
      break;
  }
  document.getElementById('game_mode_div').style.visibility = 'hidden';
};

function createMatch() {
  document.getElementById('lobby_options_div').style.visibility = 'hidden';
  document.getElementById('post_match_div').style.visibility = 'visible';
}

function createBoard(gameMode) {
  switch (gameMode) {
    case 'split_screen':
      board = new _board.Board(boardElement, _cell.Cell, new _splitScreenController.SplitScreenController());
      break;
    case 'multiplayer':
      board = new _board.Board(boardElement, _cell.Cell, new _multiplayerController.MultiplayerController());
      break;
  }
  board.grid[3][3].setWhite();
  board.grid[4][4].setWhite();
  board.grid[3][4].setBlack();
  board.grid[4][3].setBlack();
}
},{"./board.js":6,"./cell.js":5,"./splitScreenController.js":7,"./multiplayerController.js":8}],17:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49318' + '/');
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
},{}]},{},[17,3])
//# sourceMappingURL=/dist/33e72aa6bde1ec4515fae60db9a21ab1.map