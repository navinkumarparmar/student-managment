const express = require('express');

const apiroutes = express.Router();


const {create,getallresultdata,Delete,getresultstudent} = require('../controller/result');


apiroutes.post('/create',create);
apiroutes.get('/getallresultdata',getallresultdata)
apiroutes.delete('/Delete/:id',Delete)
apiroutes.get('/getresultstudent/:id',getresultstudent)



module.exports = apiroutes;