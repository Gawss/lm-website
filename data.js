var serverData = {
    counter: 0
};

function getServerData(){
    return serverData;
}

function setServerData(data){
    serverData = data;
}

module.exports = {
    getServerData,
    setServerData
}