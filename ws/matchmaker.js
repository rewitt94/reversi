export class MatchMaker {

  constructor() {
    this.pendingMatches = []
    this.madeMatches = []
  }

  createMatch(matchId,matchName,host_websocket) {
    this.pendingMatches.push([matchId,matchName,host_websocket])
  }

  confirmMatch(matchId,accepting_websocket) {
    for(var i=0;i<this.pendingMatches.length;i++){
      if (matchId == this.pendingMatches[i][0]) {
        this.madeMatches.push(this.pendingMatches.splice[i].push(accepting_websocket))
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
