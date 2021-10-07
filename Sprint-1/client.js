const net = require('net')
const port = 8080
const client = net.createConnection(port)

client.on('connection', (server) => {
    console.log('Server connected')
    server.write('Welcome server')
})

client.on('data', (data) => {
    console.log('Message from server: ' + data)
})

client.on('close', (server) => {
    console.log('Server disconnected...')
    server.write('Goodbye client')
})