const express = require('express');

const app = express();

let SERVER_PORT = 1337;

app.use(express.static(__dirname + '/public'));

const server = app.listen(process.env.PORT || SERVER_PORT, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env)
    console.log('Server On', __dirname)
});


app.use(express.static(__dirname + '/public/resources'));
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {    
    console.log('GET /');
    if(process.env.PORT != undefined){
        res.sendFile(__dirname + '/public/inprogress.html');
    }else{
        res.sendFile(__dirname + '/public/main.html');
    }
});

app.use(express.static(__dirname + '/public/About'));
app.get('/luis', (req, res) => {    
    console.log('GET /luis');
    res.sendFile(__dirname + '/public/About/about.html');
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

app.use(express.static(__dirname + '/public/site/assets'));
app.use(express.static(__dirname + '/public/site'));
app.get('/lm', (req, res) => {    
    res.sendFile(__dirname + '/public/site/index.html');
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.use(express.static(__dirname + '/Unity/DTOWN_WebGL'));
app.get('/dtown', (req, res) => {    
    res.sendFile(__dirname + '/Unity/DTOWN_WebGL/index.html');
});