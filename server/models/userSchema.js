
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    room: String,
    message: [Object]
});

var User = mongoose.model('User', userSchema);
module.exports = User;