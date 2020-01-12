const address = "https://lm-webpage.herokuapp.com/";
//const address = "http://localhost:1337";
var socket;

function setUpSocket(){
    socket = io(address);
    socket.on('message', receiveMsg);
    socket.on('counter', getCounter);

    function receiveMsg(data){
        console.log(data);
    }

    function getCounter(data){
        let dataParsed = JSON.parse(data);
        console.log(dataParsed);
        counterTxt.setLabel(dataParsed.counter);
    }
}