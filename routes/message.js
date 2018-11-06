const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const UserMessage = require('../models/user-message').model;


/* GET users listing. */
router.get('/', (req, res) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.json(err));
});

//TODO: implement query to update userMessage.hasRead to true
//TODO: implement query for user to get all unread messages
//TODO: implement query for author to get all users who need to read their messages by message

//testing creating a new message document
router.post('/', (req, res) => {
  const message = new Message();
  message.data = 'hello world';
  message.authorId = 'nickid';
  message.authorName = 'nick';
  message.channelId = 'random';
  userMessage1 = new UserMessage();
  userMessage1.userId = 'someoneITagged';
  userMessage2 = new UserMessage();
  userMessage2.userId = 'someoneElseITagged';
  message.userMessages = [];
  message.userMessages.push(userMessage1);
  message.userMessages.push(userMessage2);
  message.save()
    .then((message) => res.json(message))
    .catch((err) => res.json(err));
});

module.exports = router;