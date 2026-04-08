const http = require("http");

const server = http.createServer(function(req, res){
    if (req.url === "/getSomething") {
        res.end("You are getting something");
    } else {
        res.end("Namesta Node JS");
    }
});

console.log("Server is running on port 7777");
server.listen(7777);
