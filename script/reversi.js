document.getElementById('D4').style.background = 'black'
document.getElementById('E5').style.background = 'black'
document.getElementById('E4').style.background = 'white'
document.getElementById('D5').style.background = 'white'

blackTurn = true;
playingColour = 'black'
otherColour = 'white'

function clickHere(id_string) {
  if (document.getElementById(id_string).style.background == 0) {
    blackTurn ? playingColour = 'black' : playingColour = 'white';
    blackTurn ? otherColour = 'white' : otherColour = 'black';
    var positions = search(id_string);
    if (positions[8]) {
      changePlayer()
      document.getElementById(id_string).style.background = playingColour;
      addScore()
      reverse(id_string,positions)
    }
  }
}

function search(id_string) {
  var validMove = false;
  var arr = [];
  arr.push(searchUpLine(id_string));
  arr.push(searchUpRightLine(id_string));
  arr.push(searchRightLine(id_string));
  arr.push(searchDownRightLine(id_string));
  arr.push(searchDownLine(id_string));
  arr.push(searchDownLeftLine(id_string));
  arr.push(searchLeftLine(id_string));
  arr.push(searchUpLeftLine(id_string));
  for (index=0;index<8;index++){
    if (arr[index] != undefined) {
      var validMove = true;
    }
  }
  arr.push(validMove)
  return arr
}

function reverse(id_string,positions) {
  reverseUpLine(id_string,positions[0]);
  reverseUpRightLine(id_string,positions[1]);
  reverseRightLine(id_string,positions[2]);
  reverseDownRightLine(id_string,positions[3]);
  reverseDownLine(id_string,positions[4]);
  reverseDownLeftLine(id_string,positions[5]);
  reverseLeftLine(id_string,positions[6]);
  reverseUpLeftLine(id_string,positions[7]);
}

function searchUpLine(id_string) {
  var index = 1
  var str = id_string
  var upFound = false
  var upPosition = undefined
  while (str.charCodeAt(1) - index >= 49) {
    if (!upFound){
      newStr = String.fromCharCode(str.charCodeAt(0),str.charCodeAt(1) - index);
      if (document.getElementById(newStr).style.background == playingColour && index > 1) {
        upFound = true;
        upPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  return upPosition
}

function searchUpRightLine(id_string) {
  var index = 1
  var str = id_string
  var upRightFound = false
  var upRightPosition = undefined
  while (str.charCodeAt(0) + index <= 72 && str.charCodeAt(1) - index >= 49) {
    if (!upRightFound){
      newStr = String.fromCharCode(str.charCodeAt(0) + index,str.charCodeAt(1) - index);
      if (document.getElementById(newStr).style.background == playingColour && index > 1) {
        upRightFound = true;
        upRightPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  return upRightPosition
}

function searchRightLine(id_string) {
  var index = 1
  var str = id_string
  var rightFound = false
  var rightPosition = undefined
  while (str.charCodeAt(0) + index <= 72) {
    if (!rightFound){
      newStr = String.fromCharCode(str.charCodeAt(0) + index,str.charCodeAt(1));
      if (document.getElementById(newStr).style.background == playingColour && index > 1) {
        rightFound = true;
        rightPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  return rightPosition
}

function searchDownRightLine(id_string) {
  var index = 1
  var str = id_string
  var downRightFound = false
  var downRightPosition = undefined
  while (str.charCodeAt(0) + index <= 72 && str.charCodeAt(1) + index <= 56) {
    if (!downRightFound){
      newStr = String.fromCharCode(str.charCodeAt(0) + index,str.charCodeAt(1) + index);
      if (document.getElementById(newStr).style.background == playingColour && index > 1) {
        downRightFound = true;
        downRightPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  return downRightPosition
}

function searchDownLine(id_string) {
  var index = 1
  var str = id_string
  var downFound = false
  var downPosition = undefined
  while (str.charCodeAt(1) + index <= 56) {
    if (!downFound){
      newStr = String.fromCharCode(str.charCodeAt(0),str.charCodeAt(1) + index);
      if (document.getElementById(newStr).style.background == playingColour && index > 1) {
        downFound = true;
        downPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  return downPosition
}

function searchDownLeftLine(id_string) {
  var index = 1
  var str = id_string
  var downLeftFound = false
  var downLeftPosition = undefined
  while (str.charCodeAt(0) - index >= 65 && str.charCodeAt(1) + index <= 56) {
    if (!downLeftFound){
      newStr = String.fromCharCode(str.charCodeAt(0) - index,str.charCodeAt(1) + index);
      if (document.getElementById(newStr).style.background == playingColour && index > 1) {
        downLeftFound = true;
        downLeftPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  return downLeftPosition
}

function searchLeftLine(id_string) {
  var index = 1
  var str = id_string
  var leftFound = false
  var leftPosition = undefined
  while (str.charCodeAt(0) - index >= 65) {
    if (!leftFound){
      newStr = String.fromCharCode(str.charCodeAt(0) - index,str.charCodeAt(1));
      if (document.getElementById(newStr).style.background == playingColour && index > 1) {
        leftFound = true;
        leftPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  return leftPosition
}

function searchUpLeftLine(id_string) {
  var index = 1
  var str = id_string
  var upLeftFound = false
  var upLeftPosition = undefined
  while (str.charCodeAt(0) - index >= 65 && str.charCodeAt(1) - index >= 49) {
    if (!upLeftFound){
      newStr = String.fromCharCode(str.charCodeAt(0) - index ,str.charCodeAt(1) - index);
      if (document.getElementById(newStr).style.background == playingColour && index > 1) {
        upLeftFound = true;
        upLeftPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  return upLeftPosition
}

function reverseUpLine(id_string,position) {
  index = 1;
  newStr = String.fromCharCode(id_string.charCodeAt(0),id_string.charCodeAt(1) - index);
  if (position != undefined) {
    while (newStr != position) {
      flip(newStr)
      index++;
      newStr = String.fromCharCode(id_string.charCodeAt(0),id_string.charCodeAt(1) - index);
    }
  }
}

function reverseUpRightLine(id_string,position) {
  index = 1;
  newStr = String.fromCharCode(id_string.charCodeAt(0) + index,id_string.charCodeAt(1) - index);
  if (position != undefined) {
    while (newStr != position) {
      flip(newStr)
      index++;
      newStr = String.fromCharCode(id_string.charCodeAt(0) + index,id_string.charCodeAt(1) - index);
    }
  }
}

function reverseRightLine(id_string,position) {
  index = 1;
  newStr = String.fromCharCode(id_string.charCodeAt(0) + index,id_string.charCodeAt(1));
  if (position != undefined) {
    while (newStr != position) {
      flip(newStr)
      index++;
      newStr = String.fromCharCode(id_string.charCodeAt(0) + index,id_string.charCodeAt(1));
    }
  }
}

function reverseDownRightLine(id_string,position) {
  index = 1;
  newStr = String.fromCharCode(id_string.charCodeAt(0) + index,id_string.charCodeAt(1) + index);
  if (position != undefined) {
    while (newStr != position) {
      flip(newStr)
      index++;
      newStr = String.fromCharCode(id_string.charCodeAt(0) + index,id_string.charCodeAt(1) + index);
    }
  }
}

function reverseDownLine(id_string,position) {
  index = 1;
  newStr = String.fromCharCode(id_string.charCodeAt(0),id_string.charCodeAt(1) + index);
  if (position != undefined) {
    while (newStr != position) {
      flip(newStr)
      index++;
      newStr = String.fromCharCode(id_string.charCodeAt(0),id_string.charCodeAt(1) + index);
    }
  }
}

function reverseDownLeftLine(id_string,position) {
  index = 1;
  newStr = String.fromCharCode(id_string.charCodeAt(0) - index,id_string.charCodeAt(1) + index);
  if (position != undefined) {
    while (newStr != position) {
      flip(newStr)
      index++;
      newStr = String.fromCharCode(id_string.charCodeAt(0) - index,id_string.charCodeAt(1) + index);
    }
  }
}

function reverseLeftLine(id_string,position) {
  index = 1;
  newStr = String.fromCharCode(id_string.charCodeAt(0) - index,id_string.charCodeAt(1));
  if (position != undefined) {
    while (newStr != position) {
      flip(newStr)
      index++;
      newStr = String.fromCharCode(id_string.charCodeAt(0) - index,id_string.charCodeAt(1));
    }
  }
}

function reverseUpLeftLine(id_string,position) {
  index = 1;
  newStr = String.fromCharCode(id_string.charCodeAt(0) - index,id_string.charCodeAt(1) - index);
  if (position != undefined) {
    while (newStr != position) {
      flip(newStr)
      index++;
      newStr = String.fromCharCode(id_string.charCodeAt(0) - index,id_string.charCodeAt(1) - index);
    }
  }
}

function flip(id_string) {
  transferScore()
  var piece = document.getElementById(id_string);
  piece.style.width = '60px';
  piece.style.left = '10%';
  decreaseWidth(piece);
}

function decreaseWidth(piece) {
  if (parseInt(piece.style.width) > 2) {
    piece.style.width = parseInt(piece.style.width) - 2 + 'px'
    piece.style.left = parseInt(piece.style.left) + 1 + 'px'
    setTimeout(() => decreaseWidth(piece), 1)
  } else {
    piece.style.background = playingColour
    increaseWidth(piece)
  }
}

function increaseWidth(piece) {
  if (parseInt(piece.style.width) < 60) {
    piece.style.width = parseInt(piece.style.width) + 2 + 'px'
    piece.style.left = parseInt(piece.style.left) - 1 + 'px'
    setTimeout(() => increaseWidth(piece), 1)
  }
}

function transferScore () {
  addScore()
  subtractScore()
}


function addScore() {
  var playerScoreId = playingColour + '_score'
  var playingScore = document.getElementById(playerScoreId)
  playingScore.innerHTML = parseInt(playingScore.innerHTML) + 1
}

function subtractScore() {
  var otherScoreId = otherColour + '_score'
  var otherScore = document.getElementById(otherScoreId)
  otherScore.innerHTML = parseInt(otherScore.innerHTML) - 1
}

function changePlayer() {
  var currentPlayer = document.getElementById('current_player');
  blackTurn = !blackTurn;
  blackTurn ? currentPlayer.innerHTML = 'black' : currentPlayer.innerHTML = 'white'
}
