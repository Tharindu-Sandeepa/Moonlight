// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Protect routes with authentication middleware
router.use(authMiddleware);

router.get('/myaccount', userController.getUserData);
router.put('/myaccount/update', userController.updateUserData);
router.put('/myaccount/changepassword', userController.changePassword);
router.delete('/myaccount/delete', userController.deleteAccount);

module.exports = router;
