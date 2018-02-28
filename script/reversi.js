document.getElementById('D4').style.background = 'black'
document.getElementById('E5').style.background = 'black'
document.getElementById('E4').style.background = 'white'
document.getElementById('D5').style.background = 'white'

blackTurn = true;
playingColour = 'black'
otherColour = 'white'

function clickHere(id_string) {
  blackTurn ? playingColour = 'black' : playingColour = 'white'
  blackTurn ? otherColour = 'white' : otherColour = 'black'
  blackTurn = !blackTurn
  document.getElementById(id_string).style.background = playingColour
  upTopLine(id_string)
}

function upTopLine(id_string) {
  var index = 1
  var str = id_string
  var upTopFound = false
  var upTopPosition = ''
  while (str.charCodeAt(0) - index >= 65 && str.charCodeAt(1) - index >= 49) {
    if (!upTopFound){
      newStr = String.fromCharCode(str.charCodeAt(0) - index ,str.charCodeAt(1) - index);
      if (document.getElementById(newStr).style.background == playingColour) {
        upTopFound = true;
        upTopPosition = newStr;
      } else if (document.getElementById(newStr).style.background != otherColour) {
        break;
      }
    }
    index++;
  }
  index = 1;
  newStr = str;
  if (upTopFound){
    while (newStr != upTopPosition) {
      newStr = String.fromCharCode(str.charCodeAt(0) - index ,str.charCodeAt(1) - index);
      console.log(newStr)
      document.getElementById(newStr).style.background = playingColour;
      index++;
    }
  }
}
