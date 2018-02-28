var express = require('express');
var app = express();

app.use(express.static(__dirname + '/view'));
app.use(express.static(__dirname + '/script'));

app.get('/', function(req,res){
  res.sendFile(__dirname + '/view/index.html')
});

app.listen('4000');
console.log('Othello running on port 4000');
