const express = require('express');
const router = express.Router();
const controller = require('../controllers/UsersController');

router.get('/users', controller.getUsers);
router.post('/createuser', controller.addUser);
router.post('/updateuser', controller.updateUser);
router.post('/deleteuser', controller.deleteUser);

router.post('/update-password', controller.changepassword);

module.exports =router;