const express = require('express');

const apiroutes = express.Router();

const user = require('./user');
const auth = require('./auth');
const result = require('./result');

apiroutes.use('/user',user);
apiroutes.use('/auth',auth);
apiroutes.use('/result',result)
module.exports = apiroutes;