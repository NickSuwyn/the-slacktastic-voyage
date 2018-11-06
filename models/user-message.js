const mongoose = require('mongoose');

const userMessageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    hasRead: {
        type: Boolean,
        required: false
    }
});

module.exports = {
    schema: userMessageSchema,
    model: mongoose.model('UserMessage', userMessageSchema)
};