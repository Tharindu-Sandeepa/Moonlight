const express = require('express');
const supplierRoute = express.Router();
const supController = require('../controllers/supController');

supplierRoute.get('/supplier', supController.getSup);
supplierRoute.post('/createSup', supController.addSup);
supplierRoute.post('/updateSup', supController.updateSup);
supplierRoute.post('/deleteSup', supController.deleteSup);

module.exports = supplierRoute;
