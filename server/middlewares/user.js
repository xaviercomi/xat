const User = require('../models/userSchema')

// Join user to chat
function userJoin(id, username, room) {

  User.create({ id: id, username: username, room: room }, (err, user) => {

    if (err) {
        return ('Error user NOT registered');
    } else {
      console.log(user)
      return user;
    }

  });  

};

// Get current user
function getCurrentUser(id) {
  User.find({id: id}, (err, user) => {
    if (user) { 
      console.log(user + "two")
      return user;
    } else {
      return err
    }
  });
} 

// User leaves chat
function userLeave(id) {
  User.findOneAndDelete(id, (err, user) => {
    if (user) {  
      return user;
    } else {
      return err;
    }
  });
};

// Get room users
function getRoomUsers(room) {
  User.find({ room: room }, (err, users) => {
    var usersMap = []

    users.forEach(function (user) {
      usersMap.push(user)
    })
    return usersMap;

  });
};

// add message to database
function addMessage(user, msg) {
  console.log(user + "tres")
  console.log(msg)
  User.findByIdAndUpdate({id: user.id}, { $push: {message: msg} });
}

module.exports = {
  addMessage,
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
