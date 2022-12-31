"use strict";
exports.__esModule = true;
var http_1 = require("http");
var port = 5050;
var server = (0, http_1.createServer)(function (request, response) {
    response.write("Hello, World!", function (error) {
        if (error) {
            console.error(error);
        }
    }); // write to the server
    response.end(); // let the server know no data would be sent again
});
server.listen(port);
if (server.listening) {
    console.log("server is listening on port:".concat(port, ". http://localhost:").concat(port));
}
