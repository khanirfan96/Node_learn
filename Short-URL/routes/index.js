const urlRoute = require("./api/url");
const staticRoute = require('./static/user'); 
const userRoute = require('./api/user');
const {checkAuth}= require('../middleware/auth')
const express = require('express')
const route = express.Router()


route.use('/url', urlRoute);
route.use('/user', userRoute);
route.use('/', checkAuth,staticRoute);
module.exports = route