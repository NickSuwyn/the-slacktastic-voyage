const express = require('express');
const router = express.Router();
const service = require('../services/message-service');


/* GET users listing. */
router.get('/', (req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.json(err));
});

router.post('/read', (req, res) => {
  res.json(service.markMessagesAsRead(req.body.user_id));
});

router.post('/unread', (req, res) => {
  res.json(service.getAllUnreadMessages(req.body.user_id));
});

router.post('/check', (req, res) => {
  res.json(service.checkMessageStatus(req.body.user_id));
});

module.exports = router;