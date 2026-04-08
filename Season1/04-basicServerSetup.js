const http = require('http');

const server = http.createServer(function(req, res){
    if (req.url === "/getSomething") {
        res.end("You are getting something");
    }
    res.end("Namesta Node JS");
});

server.listen(7777);