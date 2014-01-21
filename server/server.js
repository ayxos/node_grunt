// var sys = require("sys");
// var http = require("http");
// var fs = require('fs');
// var index = fs.readFileSync('dest/index.html');

// var PORT = 8003;

// http.createServer(function(request,response){
// 	sys.puts("Creating server...");
// 	response.writeHeader(200, {"Content-Type": "text/html"});
// 	response.write("This server has been created using node.js, also this line has been inserted using write command");
// 	response.end(index);
// }).listen(PORT);
// sys.puts("Server Running on port " + PORT);

var libpath = require('path'),
    http = require("http"),
    fs = require('fs'),
    url = require("url"),
    mime = require('mime');

var path = "dest";
var port = 8001;

http.createServer(function (request, response) {

    var uri = url.parse(request.url).pathname;
    var filename = libpath.join(path, uri);

    libpath.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += 'index.html';
        }

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            var type = mime.lookup(filename);
            response.writeHead(200, {
                "Content-Type": type
            });
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(port);

console.log('node-static running at http://localhost:%d', port);
