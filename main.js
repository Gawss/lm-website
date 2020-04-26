const express = require('express');

const app = express();

let SERVER_PORT = 1337;

app.use(express.static(__dirname + '/public'));

const server = app.listen(process.env.PORT || SERVER_PORT, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
    console.log('Server On', __dirname)
});


app.use(express.static(__dirname + '/public/resources'));
app.get('/', (req, res) => {    
    console.log('GET /');
    if(process.env.PORT != undefined){
        res.sendFile(__dirname + '/public/inprogress.html');
    }else{
        res.sendFile(__dirname + '/public/main.html');
    }
});

app.use(express.static(__dirname + '/Unity/space_invaders'));
app.get('/space_invaders', (req, res) => {    
    console.log('GET /space_invaders');
    res.sendFile(__dirname + '/Unity/space_invaders/index.html');
});

app.use(express.static(__dirname + '/public/AR'));
app.get('/AR', (req, res) => {    
    console.log('GET /AR');
    res.sendFile(__dirname + '/public/AR/AR.html');
});