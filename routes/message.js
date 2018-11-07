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

router.post('/save', (req, res) => {
  res.json(service.saveMessage(req.body.author_id, req.body.author_name, 
    req.body.msg_text, req.body.user_ids, req.body.channel_id));
});

module.exports = router;