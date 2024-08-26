const sessionIdtoUSemap = new Map();

function setUSer(id, user){
    sessionIdtoUSemap.set(id, user);
}

function getUSer(id){
return sessionIdtoUSemap.get(id);
}

module.exports = {setUSer, getUSer};