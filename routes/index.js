exports.getAll = function (req, res){
  res.render( 'index', {
      header : 'Doc generator',
      footer : '@2014 by M.A.P.S Powered by Node.js y Express '
  });
};

exports.postnew = function (req, res){
  console.log(req.body);
  var fs = require('fs')
      , qs = require('querystring')
      , message
      , md;

  totext = qs.stringify(req.body);


  function replaceAll(find, replace, str){
    while( str.indexOf(find) > -1){
      str = str.replace(find, replace);
    }
    return str;
  }

  totext = replaceAll('%20',' ', totext);

  object = totext.split('&');

  console.log(totext);


  var mytitles = new Array();
  mytitles[0] = object[0].substring((object[0].indexOf('=') + 1), object[0].length);
  mytitles[1] = "## 1. Cards pertaining to this feature";
  mytitles[2] = "## 2. Objectives";
  mytitles[3] = "## 3. Inspiration";
  mytitles[4] = "## 4. Technical information";
  mytitles[5] = "### 4.1 Frontend";
  mytitles[6] = "### 4.2 Backend";

  md = mytitles[0] + '\n=============\n';

  for (var i=1;i<mytitles.length;i++){
    var str = '\n' + mytitles[i] + '\n' + object[i].substring((object[i].indexOf('=') + 1), object[i].length);
    md = md.concat(str);
  }

  // endfile = 'doc.md'
  endfile= ('doc/'+ mytitles[0] + '.md');
  endfile = endfile.trim();

  fs.writeFile(endfile, md, function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved! ");
          res.download(endfile);
      }
  });

};

exports.putById = function (req, res){
  console.log(req.body);
  regModel.findById(req.params.id, function (err, entry) {
    for (key in req.body){
      entry[key] = req.body[key];
    }
    entry.save(function (err) {
      if (!err) {
        console.log("updated");
        //Es imprescindible devolver datos, en este caso las llaves
        res.send(201, {});
      } else {
        console.log(err);
        res.send(500, "updated error");
      }
      // res.send(entry);
    });
  });
};

exports.deleteById = function (req, res){
  // console.log(req);
  console.log('DELETED: ' + req.params.id);
  //hay que fijarse en si es QUERY o UN Param
  regModel.findById(req.params.id, function (err, entry) {
    entry.remove(function (err) {
      if (!err) {
        console.log("removed");
        res.send(201, "Removed: " + req.params.id);
      } else {
        console.log(err);
        res.send(500, "removed error");
      }
    });
  });
};