exports.findAll = function(req, res) {
    res.json([{name:'game1'}, {name:'game2'}, {name:'game3'}]);
};

exports.findById = function(req, res) {
    // res.send({id:req.params.id, name: "The Name", description: "description"});
    res.json({id:req.params.id, name: "name", description: "description"});
};