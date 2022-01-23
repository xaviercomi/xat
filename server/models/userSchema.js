
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    room: String,
    message: [Object]
});

userSchema.pre('save', function preSave(next) {

    const user = this;

    User.find( {username: this.username}, function userExist(err, register) {
        if (register.length) {
            next(new Error("User alredy create!"))   
        }else {
            next();
        }
    })
  
});

var User = mongoose.model('User', userSchema);
module.exports = User;