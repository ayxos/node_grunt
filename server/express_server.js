var express = require('express'),
    games = require('../routes/games');

var app = express();

var PORT = 8002;

app.get('/games', games.findAll);
app.get('/games/:id', games.findById);

app.listen(PORT);
console.log('Listening on port ' + PORT + '...');