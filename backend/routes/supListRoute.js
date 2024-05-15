const express = require('express');
const supListRoute = express.Router();
const supListController = require('../controllers/supListController')

supListRoute.get('/supList',supListController.getSupplier);
supListRoute.post('/createsupplier',supListController.addSupplier);
supListRoute.post('/updatesupplier',supListController.updateSupplier);
supListRoute.post('/deletesupplier',supListController.deleteSupplier);
supListRoute.get('/getSupName',supListController.getSupName);


module.exports = supListRoute;
