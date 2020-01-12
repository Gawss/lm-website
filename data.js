const fs = require('fs');
const serverDataPath = './server-data.json';

var serverData = {
    counter: 0
};

function getServerData(){
    fs.readFileSync(serverDataPath, function(err, data) {
        if(err) throw err;
        serverData = JSON.parse(data);
    });
    return serverData;
}

function setServerData(data){
    serverData = data;
    fs.writeFile(serverDataPath, JSON.stringify(serverData), 'utf8', (err) => {
        if (err) throw err;
        console.log('serverData Updated!');
    });
}

module.exports = {
    getServerData,
    setServerData
}