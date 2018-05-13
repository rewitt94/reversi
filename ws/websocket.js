var MatchMaker = require('./matchmaker.js')

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port:5000})

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
        MATCHMAKER.removeMadeMatch(message[1]);
        ws.send('other_player_missing');
      }
    }
  });
});

setInterval(() => {
  for(var i=0;i<MATCHMAKER.madeMatches.length;i++) {
    if (MATCHMAKER.madeMatches[i][2].readyState != 1 && MATCHMAKER.madeMatches[i][3].readyState != 1) {
      MATCHMAKER.removeMadeMatch(MATCHMAKER.madeMatches[i][0])
    }
  }
}, 10000);


//remove pending on interval
