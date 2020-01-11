const express = require('express');
const app = express();

let SERVER_PORT = 1337;

app.use(express.static(__dirname + '/'));

const server = app.listen(process.env.PORT || SERVER_PORT, () => {
console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
console.log('Server On', __dirname)
});

app.get('/', (req, res) => {

    console.log('GET /');
    res.sendFile(__dirname + '/main.html');
});