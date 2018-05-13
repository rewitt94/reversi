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

module.exports = MatchMaker
