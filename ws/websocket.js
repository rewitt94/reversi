class MatchMaker {

  constructor() {
    this.pendingMatches = []
    this.madeMatches = []
  }

  removePendingMatch(matchId) {
    for(var i=0;i<this.pendingMatches.length;i++){
      if (matchId == this.pendingMatches[i][0]) {
        this.pendingMatches.splice(i,1)
      }
    }
  }

  removeMadeMatch(matchId) {
    for(var i=0;i<this.madeMatches.length;i++){
      if (matchId == this.madeMatches[i][0]) {
        this.madeMatches.splice(i,1)
      }
    }
  }

  createMatch(matchId,matchName,host_websocket) {
    this.pendingMatches.push([matchId,matchName,host_websocket])
  }

  confirmMatch(matchId,accepting_websocket) {
    for(var i=0;i<this.pendingMatches.length;i++){
      if (matchId == this.pendingMatches[i][0]) {
        var arr = this.pendingMatches.splice(i,1).pop();
        arr.push(accepting_websocket);
        this.madeMatches.push(arr);
      }
    }
  }

  findWebsockets(matchId) {
    for(var i=0;i<this.madeMatches.length;i++){
      if (matchId == this.madeMatches[i][0]) {
        return [this.madeMatches[i][2],this.madeMatches[i][3]]
      }
    }
  }
}

// import { MatchMaker } from './matchmaker.js';

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:2018})

const MATCHMAKER = new MatchMaker;


wss.on('connection', function(ws) {
  id = Math.random();
  console.log('connection is established : ' + id);


  ws.on('error', function(e){
        console.log(e);
    });

  ws.on('message', function(message) {
    message = message.split(',')

    if (message[0] == 'post') {
      MATCHMAKER.createMatch(message[1],message[2],ws)
    }

    if (message[0] == 'search') {
      for(var i = 0;i < MATCHMAKER.pendingMatches.length;i++) {
        ws.send('lobby,' + MATCHMAKER.pendingMatches[i][0] + ',' + MATCHMAKER.pendingMatches[i][1])
      }
      if (MATCHMAKER.pendingMatches.length == 0) {
        ws.send('lobby,no_games')
      }
    }

    if (message[0] == 'accept') {
      try {
        MATCHMAKER.confirmMatch(message[1],ws);
        var websockets = MATCHMAKER.findWebsockets(message[1]);
        websockets[0].send('start_game_as_black,' + message[1]);
        websockets[1].send('start_game_as_white,' + message[1]);
      } catch(err) {
        MATCHMAKER.removePendingMatch(message[1]);
        ws.send('other_playing_missing');
      }
    }

    if (message[0] == 'play_move') {
      try {
        var websockets = MATCHMAKER.findWebsockets(message[1]);
        websockets[0].send('make_move,' + message[2]);
        websockets[1].send('make_move,' + message[2]);
      } catch(err) {
        console.log('catcher')
        MATCHMAKER.removeMadeMatch(message[1]);
        ws.send('other_playing_missing');
      }
    }
  });

});

// function pingPending(matchId) {
//   for(var i = 0;i < MATCHMAKER.pendingMatches.length;i++) {
//     MATCHMAKER.pendingMatches[i][2].send('__ping__')
//     tm = setTimeout(function () {
//       const id = MATCHMAKER.pendingMatches[i][0];
//       MATCHMAKER.removePendingMatch(id);
//     }, 5000);
//   }
// }
//
// function pingMade(matchId) {
//   for(var i = 0;i < MATCHMAKER.madeMatches.length;i++) {
//     MATCHMAKER.madeMatches[i][2].send('__ping__')
//     tm = setTimeout(function () {
//       const id = MATCHMAKER.madeMatches[i][0];
//       MATCHMAKER.removeMadeMatch(id);
//     }, 5000);
//   }
// }
//
// function pong() {
//     clearTimeout(tm);
// }
//
// websocket_conn.onopen = function () {
//     setInterval(ping, 30000);
// }
//
// websocket_conn.onmessage = function (evt) {
//     var msg = evt.data;
//     if (msg == '__pong__') {
//         pong();
//         return;
//     }
// }
