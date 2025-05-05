const express = require('express');  
const router = express.Router();
const controller = require('../controllers/gemController');


router.get('/gems', controller.getGem);
router.post('/addGem', controller.addGem);
router.post('/updateGem', controller.updateGem);
router.post('/deleteGem', controller.deleteGem);


module.exports = router;