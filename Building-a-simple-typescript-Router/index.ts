import { Server, createServer, ServerResponse, IncomingMessage, } from 'http'

const port: number = 5050

interface route {
	path: string;
	handler: (request: IncomingMessage, response: ServerResponse) => void;
}

interface router {
	routes: Map<string, route>
}



const match_route = (url: string, routes: Map<string, route>) => {

	if (routes[url]) {
		return routes[url].handler
	} else {
		return (request: IncomingMessage, response: ServerResponse) => {
			response.statusCode = 404
			response.write(`${response.statusCode} ${url} page not found`)
			response.end()
		}
	}
}

const add_handler =
	(router: router, path: string, handler: (request: IncomingMessage, response: ServerResponse) => void) => {
		router.routes[path] = { path: path, handler: handler }
	}


let Router: router = {
	routes: new Map(),
}
// home route and its handler

add_handler(Router, '/', (request: IncomingMessage, response: ServerResponse) => {
	response.write(`Hello, World! from ${request.url}`), (error: Error) => {
		if (error) {
			console.error(error)
		}
	}
	response.end()
})

add_handler(Router, '/foo', (request: IncomingMessage, response: ServerResponse) => {
	response.write(`bar`), (error: Error) => {
		if (error) {
			console.error(error)
		}
	}
	response.end()
})


const server: Server = createServer((request: IncomingMessage, response: ServerResponse) => {
	let url: string = request.url || ''
	const handle = match_route(url, Router.routes)
	handle(request, response)

})

server.listen(port)

if (server.listening) {
	console.log(`server is listening on port:${port}.\thttp://localhost:${port}`)
}
