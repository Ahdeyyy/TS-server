import { Server, createServer, ServerResponse, IncomingMessage, } from 'http'

const port: number = 5050

type Handler = {
	(request: IncomingMessage, response: ServerResponse): void;

}
interface route {
	path: string;
	handler: Handler;
}


interface router {
	routes: Map<string, route>;
	add_handler: (
		path: string,
		handler: Handler) => void;
	match_route: (url: string) => Handler;
}

function CreateRouter(): router {
	return {
		routes: new Map(),
		add_handler(path: string, handler: Handler) {
			this.routes[path] = { path: path, handler: handler }
		},
		match_route(url: string) {

			if (this.routes[url]) {
				return this.routes[url].handler
			} else {
				return (request: IncomingMessage, response: ServerResponse) => {
					response.statusCode = 404
					response.write(`${response.statusCode} ${url} not found`)
					response.end()
				}
			}
		}

	}
}


let Router: router = CreateRouter()
// home route and its handler

Router.add_handler('/', async (request: IncomingMessage, response: ServerResponse) => {
	response.write(`Hello, World! from ${request.url}`), (error: Error) => {
		if (error) {
			console.error(error)
		}
	}
	response.end()
})

Router.add_handler('/foo', async (request: IncomingMessage, response: ServerResponse) => {
	response.write(`bar`), (error: Error) => {
		if (error) {
			console.error(error)
		}
	}
	response.end()
})


const server: Server = createServer(async (request: IncomingMessage, response: ServerResponse) => {
	let url: string = request.url || ''
	const handle = Router.match_route(url)
	handle(request, response)

})

server.listen(port)

if (server.listening) {
	console.log(`server is listening on port:${port}.\nhttp://localhost:${port}`)
}
