const mongoose = require('mongoose');

async function handleconnectDB (url) {
    return mongoose.connect(url)
};

module.exports = {
    handleconnectDB,
}