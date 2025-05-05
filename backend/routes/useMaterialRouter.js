const express = require('express');
const router = express.Router();
const useController = require('../controllers/useMaterialController');

router.get('/usematerials' , useController.getusemat);
router.post('/addusematerial' , useController.addusemat);
router.post('/updateusematerial' , useController.updateusemat);
router.post('/deleteusematerial' , useController.deleteusemat);

module.exports= router;