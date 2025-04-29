const express = require('express');
const router = express.Router();
const { getMessages, sendBroadcast } = require('../controllers/messageController');

router.get('/messages', getMessages);
router.post('/broadcast', sendBroadcast);

module.exports = router;
