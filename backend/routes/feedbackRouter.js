const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedbackController');

router.get('/feedbacks',controller.getFeedback);
router.post('/createfeedback',controller.addFeedback);
router.post('/updatefeedback',controller.updateFeedback);
router.post('/deletefeedback',controller.deleteFeedback);

module.exports = router;