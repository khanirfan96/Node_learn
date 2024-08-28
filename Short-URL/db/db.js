const mongoose = require('mongoose');

async function handleconnectDB () {
    return mongoose.connect(process.env.DB_URL)
};

module.exports = {
    handleconnectDB,
}