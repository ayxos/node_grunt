var express = require('express');

var app = express();

var PORT = 8002

app.get('/games', function(req, res) {
    res.send([{name:'game1'}, {name:'game2'}]);
});
app.get('/games/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});

app.listen(PORT);
console.log('Listening on port ' + PORT + '...');