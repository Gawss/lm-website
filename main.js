const express = require('express');
const socket = require('socket.io');
const app = express();

let SERVER_PORT = 1337;

app.use(express.static(__dirname + '/public'));

const server = app.listen(process.env.PORT || SERVER_PORT, () => {
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
console.log('Server On', __dirname)
});

app.get('/', (req, res) => {    
    console.log('GET /');
    res.sendFile(__dirname + '/public/main.html');
});

let io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log(socket.id);
}