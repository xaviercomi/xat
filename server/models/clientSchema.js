
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const clientSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    password: { type: String, required: true }
});

clientSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {

        const document = this;
        
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next()
    }
});

clientSchema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same)
        }
    });
}

var Client = mongoose.model('Client', clientSchema);
module.exports = Client;