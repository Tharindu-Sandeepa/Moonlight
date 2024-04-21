const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderController');

router.get('/orders', controller.getOrders);
router.post('/createorder', controller.addOrder);
router.post('/updateorder', controller.updateOrder);
router.post('/deleteorder', controller.deleteOrder);

module.exports =router;