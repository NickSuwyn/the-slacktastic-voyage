const Message = require('../models/message');
const UserMessage = require('../models/user-message').model;

//TODO: implement query for user to get all unread messages
//TODO: implement query for author to get all users who need to read their messages by message

const markMessageAsRead = (messageId, userId, callback) => {
    Message.findById(messageId)
        .then((message) => {
            message.userMessages.forEach(um => {
                if (um.userId == userId) {
                    um.hasRead = true;
                }
            });

            message.save()
                .then(callback)
                .catch(callback);
        });
};

const getAllUnreadMessages = (userId, callback) => {
    Message.find({'userMessages.userId': userId, 'userMessages.hasRead': {$ne: true}})
        .then(callback)
        .catch(callback);
};

module.exports = {
    markMessageAsRead,
    getAllUnreadMessages
};