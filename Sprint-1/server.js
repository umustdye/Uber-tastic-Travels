const net = require('net')

const server = net.createServer()
const port = 8080

server.listen(port, function(error) {
    if(error) {
        console.log("Something went wrong", error)
    } else {
        console.log("Server is listening on port " + port)
    } 
})

server.on('connection', (client) => {
    console.log('Client connected')
    client.write('Welcome client')
})


server.on('data', (data) => {
    console.log('Message from client: ' + data)
})