
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    room: String,
    message: [Object]
});


    /* User.find( {username: this.username}, function userExist(err, register) {
        if (register.length) {
            next(new Error("User alredy create!"))   
        }else {
            next();
        }
    }) */


var User = mongoose.model('User', userSchema);
module.exports = User;