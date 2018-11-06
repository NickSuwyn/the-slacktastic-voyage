const Message = require('../models/message');
const UserMessage = require('../models/user-message').model;

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

const checkMessageStatus = (authorId, callback) => {
    Message.find({'authorId': authorId})
        .then((messages) => {
            messageStats = [];
            messages.forEach(message => {
                let read = [];
                let unread = [];
                message.userMessages.forEach(um => {
                    um.hasRead ? read.push(um.userId) : unread.push(um.userId);
                });
                messageStats.push(new MessageStatus(message.data, read, unread));
            });
            callback(messageStats);
        })
        .catch(callback);
};

function MessageStatus(message, read, unread) {
    this.message = message;
    this.read = read;
    this.unread = unread;
}

module.exports = {
    markMessageAsRead,
    getAllUnreadMessages,
    checkMessageStatus
};