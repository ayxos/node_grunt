var express = require('express'),
    path = require('path'),
    http = require('http'),
    game = require('../routes/mongo_games');

var app = express();

var PORT = 8001

app.configure(function () {
    app.set('port', process.env.PORT || PORT);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, '../dest')));
});

app.get('/games', game.findAll);
app.get('/games/:id', game.findById);
app.post('/games', game.addGame);
app.put('/games/:id', game.updateGame);
app.delete('/games/:id', game.deleteGame);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});