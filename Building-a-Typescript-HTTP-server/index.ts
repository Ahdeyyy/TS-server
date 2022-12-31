import { createServer, ServerResponse, IncomingMessage } from 'http'

const port: number = 5050

const server = createServer(
	(request: IncomingMessage, response: ServerResponse) => {
		response.write("Hello, World!", (error) => {
			if (error) {
				console.error(error)
			}
		}) // write to the server
		response.end() // let the server know no data would be sent again
	})

server.listen(port)

if (server.listening) {
	console.log(`server is listening on port:${port}. http://localhost:${port}`)
}
