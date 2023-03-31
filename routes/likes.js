const express = require('express');
const router = express.Router();
const likesCotroller = require('../controllers/likes_controller');

router.post('/toggle', likesCotroller.toggleLike);

module.exports = router;
