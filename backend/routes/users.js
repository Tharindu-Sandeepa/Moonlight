const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Get user details
router.get('/myaccount', auth, authController.getUserDetails);

module.exports = router;
