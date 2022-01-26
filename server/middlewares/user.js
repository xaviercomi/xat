const User = require('../models/userSchema')

// Join user to chat
async function userJoin(id, username, room) {
  try{
    const userExist= await User.find({id:id})
    if(userExist){
      return userExist
    } else {
      const user = await User.create({ id: id, username: username, room: room })
      return user
    }
  } catch (e) {
    console.log(e)
  }
 /*  User.create({ id: id, username: username, room: room }, (err, user) => {

    if (err) {
        return ('Error user NOT registered');
    } else {
      console.log(user+ "gniadngiadngadgjid")
      return user;
    }

  });   */
};

// Get current user
async function getCurrentUser(id) {
  try{
    const user = await User.find({id:id})
    if(user.length){
      return user
    }
    return null
  } catch(e){
    console.log(e);
  }
} 

// User leaves chat
async function userLeave(id) {
  try{
    const user = await User.findOneAndDelete(id)
    return user
  } catch(e){
    console.log(e)
  }
}

// Get room users
async function getRoomUsers(room) {
  try{
    const users = await User.find({ room: room })
    return users
  } catch (e) {
    console.log(e)
  }
};

// add message to database
async function addMessage(user, msg) {
  try{
    console.log(msg, user +"frommmmmmm add messageee")
    const userUpdated = await User.findByIdAndUpdate({id: user.id}, { $push: {message: msg} });
  } catch(e){
    console.log(e)
  }
  console.log(user + "tres")
}

module.exports = {
  addMessage,
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
