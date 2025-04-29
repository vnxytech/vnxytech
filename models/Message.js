const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from: String,
    body: String,
    timestamp: Date,
});

module.exports = mongoose.model('Message', MessageSchema);
