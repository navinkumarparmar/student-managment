const express = require('express');

const apiroutes = express.Router();

const {signup,login,forgetPassword,resetPassword,Delete} = require('../controller/auth');
apiroutes.post('/signup',signup);
apiroutes.post('/login',login)
apiroutes.post('/forgetPassword',forgetPassword)
apiroutes.post('/resetPassword',resetPassword)
apiroutes.delete('/Delete/:id',Delete);

module.exports = apiroutes;