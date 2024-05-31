const express = require('express');

const apiroutes = express.Router();


const {create,getAllStudents,Delete,updateUser,getstudent,validateStudent} = require('../controller/user');


apiroutes.post('/create',validateStudent,create);
apiroutes.get('/getAllStudents',getAllStudents)
apiroutes.delete('/Delete/:id',Delete)
apiroutes.put('/updateUser/:id',updateUser);
apiroutes.get('/getstudent/:id',getstudent)

module.exports = apiroutes;