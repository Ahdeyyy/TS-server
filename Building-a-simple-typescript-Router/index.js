"use strict";
exports.__esModule = true;
var http_1 = require("http");
var port = 5050;
var match_route = function (url, routes) {
    if (routes[url]) {
        return routes[url].handler;
    }
    else {
        return function (request, response) {
            response.statusCode = 404;
            response.write("".concat(response.statusCode, " ").concat(url, " page not found"));
            response.end();
        };
    }
};
var add_handler = function (router, path, handler) {
    router.routes[path] = { path: path, handler: handler };
};
var Router = {
    routes: new Map()
};
// home route and its handler
add_handler(Router, '/', function (request, response) {
    response.write("Hello, World! from ".concat(request.url)), function (error) {
        if (error) {
            console.error(error);
        }
    };
    response.end();
});
add_handler(Router, '/foo', function (request, response) {
    response.write("bar"), function (error) {
        if (error) {
            console.error(error);
        }
    };
    response.end();
});
var server = (0, http_1.createServer)(function (request, response) {
    var url = request.url || '';
    var handle = match_route(url, Router.routes);
    handle(request, response);
});
server.listen(port);
if (server.listening) {
    console.log("server is listening on port:".concat(port, ".\thttp://localhost:").concat(port));
}
