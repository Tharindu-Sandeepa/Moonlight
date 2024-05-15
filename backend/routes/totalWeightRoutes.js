const express = require('express');
const router = express.Router();
const controller = require('../controllers/totalWeightController');


router.get('/getTotalWeight' , controller.getTotalWeight);
router.post('/addtotalWeight' , controller.addtotalWeight);


module.exports= router;