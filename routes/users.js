const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/sing-up', usersController.signUp);
router.get('/sing-in', usersController.signIn); 

router.use('/post', require('./posts'));
module.exports = router;