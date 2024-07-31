const mongoose = require("mongoose");
const { timeStamp } = require("console");

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    country: {
        type: String,
    }
},
    { timestamps: true })

const users = mongoose.model("user", userSchema);

module.exports = users;