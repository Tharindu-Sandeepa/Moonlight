const express = require('express');
const router = express.Router();
const controller = require('../controllers/newMaterialController');

router.get('/newmaterials' , controller.getnewMaterial);
router.post('/addnewmaterial' , controller.addnewMaterial);
router.post('/updatenewmaterial' , controller.updatenewMaterial);
router.post('/deletenewmaterial' , controller.deletenewMaterial);
router.get('/getMaterialNames',controller.getMaterialNames);




module.exports= router;