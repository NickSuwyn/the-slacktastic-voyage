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
  service.markMessageAsRead(req.body.text /*???*/, req.body.user_id, 
    data => res.json(data));
});

router.post('/unread', (req, res) => {
  service.getAllUnreadMessages(req.body.user_id, data => res.json(data));
});

router.post('/check', (req, res) => {
  service.checkMessageStatus(req.body.user_id, data => res.json(data));
});

module.exports = router;