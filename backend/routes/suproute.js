const express = require('express');
const suproute = express.Router();
const supOrdController = require('../controllers/supOrdController')

suproute.get('/supOrders',supOrdController.getOrders);
suproute.post('/createsupOrder',supOrdController.addsupOrder);
suproute.post('/updatesupOrder',supOrdController.updatesupOrder);
suproute.post('/deletesupOrder',supOrdController.deletesupOrder);

module.exports = suproute;
