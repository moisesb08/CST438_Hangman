/*
* Title: server.js
* Abstract: Javascript file for serving hangman files
* Author: Moises Bernal
* Date: 3-5-2018
*/
var http = require('http');
var fs = require('fs');
const PORT=8080; 

var server = http.createServer(function(req, res){

    console.log('request was made: ' + req.url);
    
    // serving request for index.html
    if(req.url === '/')
    {
        fs.readFile(__dirname + '/index.html', 'UTF-8', function(err,html){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        })
    }
    else if (req.url.match("\.css$"))
    {
        // serving request for css files
        var fileStream = fs.createReadStream(__dirname + req.url, "UTF-8");
        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }
    else if (req.url.match("\.png$"))
    {
        // serving request for png files
        var fileStream = fs.createReadStream(__dirname + req.url);
        res.writeHead(200, {'Content-Type': 'text/png'});
        fileStream.pipe(res);
    }
    else if (req.url.match("\.js$"))
    {
        // serving request for js files
        var fileStream = fs.createReadStream(__dirname + req.url);
        res.writeHead(200, {'Content-Type': 'text/js'});
        fileStream.pipe(res);
    }
    else if (req.url.match("\.txt$"))
    {
        // serving request for text files
        var fileStream = fs.createReadStream(__dirname + req.url);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fileStream.pipe(res);
    }
    else{
        fs.readFile(__dirname + '/404.html', 'UTF-8', function(err,html){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    }
});

server.listen(8080, '127.0.0.1');
console.log('Listening to port 8080');