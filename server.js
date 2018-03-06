var http = require('http');
var fs = require('fs');

const PORT=8080; 

var server = http.createServer(function(req, res){

    console.log('request was made: ' + req.url);
    
    if(req.url === '/')
    {
        fs.readFile(__dirname + '/index.html', 'UTF-8', function(err,html){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        })
        
        //var readStream = fs.createReadStream(__dirname + '/index2.html', 'utf8');
        //readStream.pipe(res);
    }
    else if (req.url.match("\.css$"))
    {
        var fileStream = fs.createReadStream(__dirname + req.url, "UTF-8");
        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }
    else if (req.url.match("\.png$"))
    {
        var fileStream = fs.createReadStream(__dirname + req.url);
        res.writeHead(200, {'Content-Type': 'text/png'});
        fileStream.pipe(res);
    }
    else if (req.url.match("\.js$"))
    {
        var fileStream = fs.createReadStream(__dirname + req.url);
        res.writeHead(200, {'Content-Type': 'text/js'});
        fileStream.pipe(res);
    }
    else if (req.url.match("\.txt$"))
    {
        var fileStream = fs.createReadStream(__dirname + req.url);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fileStream.pipe(res);
    }
    else{
        res.writeHead(404, {"Content-Type": 'text/html'});
        res.end("Page not found");
    }
});

server.listen(8080, '127.0.0.1');
console.log('Listening to port 8080');