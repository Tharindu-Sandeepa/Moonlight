const express = require('express');  
const router = express.Router();
const inquiries = require('../Controllers/inquiryController');



router.post('/enterInquiry',inquiries.enterInquiry)
router.get('/getInquiry', inquiries.getInquiry)  // get all the data from database and send
router.post('/deleteInquiry',inquiries.deleteInquiry)




module.exports = router;