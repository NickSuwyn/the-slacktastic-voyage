const Message = require('../models/message');
const UserMessage = require('../models/user-message').model;

const db = [
    {
        msgText: 'hello world',
        authorId: '1234',
        authorName: 'nick',
        channelId: 'random',
        userMessages: [
            {userId: '1235'},
            {userId: '1236'},
            {userId: '1237'},
            {userId: '1238'}
        ]
    },
    {
        msgText: 'hello world 2',
        authorId: '1234',
        authorName: 'nick',
        channelId: 'random',
        userMessages: [
            {userId: '1235'},
            {userId: '1236'},
            {userId: '1237'},
            {userId: '1238'}
        ]
    }
];

const markMessagesAsRead = (userId) => {
    db.forEach(message => {
        message.userMessages.forEach(um => {
            if (um.userId == userId) {
                um.hasRead = true;
            }
        })
    });
};

const getAllUnreadMessages = (userId) => {
    const unreadMessages = [];
    db.forEach(message => {
        message.userMessages.forEach(um => {
            if (um.userId == userId && um.hasRead != true) {
                unreadMessages.push(message);
            }
        });
    });
    return unreadMessages;
};

const checkMessageStatus = (authorId) => {
    const messageStats = [];
    db.forEach(message => {
        if (message.authorId == authorId) {
            let read = [];
            let unread = [];
            message.userMessages.forEach(um => {
                um.hasRead ? read.push(um.userId) : unread.push(um.userId);
            });
            messageStats.push(new MessageStatus(message.data, read, unread));
        }
    });
    return messageStats;
};

function MessageStatus(message, read, unread) {
    this.message = message;
    this.read = read;
    this.unread = unread;
}

module.exports = {
    markMessagesAsRead,
    getAllUnreadMessages,
    checkMessageStatus
};