const express = require('express');
const router = express.Router();
const controller = require('../controllers/materialController');

router.get('/materials' , controller.getmat);
router.post('/addmaterial' , controller.addmat);
router.post('/updatematerial' , controller.updatemat);
router.post('/deletematerial' , controller.deletemat);
router.get('/getMaterialNamesWeight' , controller.getMaterialNamesWeight);

module.exports= router;