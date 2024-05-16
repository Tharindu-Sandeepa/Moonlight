const express = require('express');
const supItemRoute = express.Router();
const supItemController = require('../controllers/supItemController')

supItemRoute.get('/supItem',supItemController.getSupItem);
supItemRoute.post('/createSupItem',supItemController.addSupItem);
supItemRoute.post('/updateSupItem',supItemController.updateSupItem);
supItemRoute.post('/deleteSupItem',supItemController.deleteSupItem);

module.exports = supItemRoute;
