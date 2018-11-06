const mongoose = require('mongoose');
const userMessage = require('./user-message').schema;

const messageSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    userMessages: [userMessage]
});

module.exports = mongoose.model("Message", messageSchema);