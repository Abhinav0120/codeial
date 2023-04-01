const express = require('express');

const router = express.Router();
const friendshipsController = require('../controllers/friendships_controller');

router.post('./toggle', friendshipsController.toggleFriendship);

module.exports = router;